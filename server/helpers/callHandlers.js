// const admin = require('firebase-admin');
// const Session = require('../models/sessionModel');
// const User = require('../models/userModel');
// const Notification = require('../models/notificationModel');

// // Generate unique call credentials
// const generateCallCredentials = () => {
//   return {
//     channelName: `channel_${Date.now()}`,
//     uid: `uid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//   };
// };

// // Initiate a call
// const initiateCall = async (req, res) => {
//   try {
//     const { astrologerId, clientId, callType } = req.body;

//     if (!['video', 'voice'].includes(callType)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid call type. Must be either video or voice'
//       });
//     }

//     // Generate call credentials
//     const credentials = generateCallCredentials();

//     // Create session record
//     const session = await Session.create({
//       sessionType: callType === 'video' ? 'videoCall' : 'audioCall',
//       astrologerId,
//       clientId,
//       startTime: new Date(),
//       status: 'ongoing'
//     });

//     // Get receiver's FCM token
//     const receiver = await User.findById(astrologerId);
//     if (!receiver?.fcm) {
//       throw new Error('Receiver FCM token not found');
//     }

//     // Prepare and send FCM notification
//     const notificationPayload = {
//       notification: {
//         title: `Incoming ${callType} Call`,
//         body: 'calling...'
//       },
//       data: {
//         channelName: credentials.channelName,
//         uid: credentials.uid,
//         callType,
//         sessionId: session._id.toString(),
//         type: 'call_invitation'
//       }
//     };

//     await admin.messaging().sendToDevice(receiver.fcm, notificationPayload);

//     // Create notification record
//     await Notification.create({
//       userId: astrologerId,
//       title: `Incoming ${callType} Call`,
//       message: 'Someone is calling you',
//       metadata: {
//         sessionId: session._id
//       }
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         ...credentials,
//         callType,
//         sessionId: session._id
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // End a call
// const endCall = async (req, res) => {
//   try {
//     const { sessionId, duration } = req.body;

//     const session = await Session.findById(sessionId);
//     if (!session) {
//       throw new Error('Session not found');
//     }

//     // Update session
//     await Session.findByIdAndUpdate(sessionId, {
//       status: 'completed',
//       endTime: new Date(),
//       duration
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Call ended successfully'
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // Handle missed call
// const handleMissedCall = async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     await Session.findByIdAndUpdate(sessionId, {
//       status: 'missed'
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Missed call handled successfully'
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   initiateCall,
//   endCall,
//   handleMissedCall
// };

//================================================================

// // Validation helpers
// const validateCallRequest = ({ astrologerId, clientId, callType }) => {
//   const errors = [];
//   if (!astrologerId) errors.push('Astrologer ID is required');
//   if (!clientId) errors.push('Client ID is required');
//   if (!['video', 'voice'].includes(callType)) errors.push('Call type must be either video or voice');
//   return errors;
// };

// // Generate unique call credentials
// const generateCallCredentials = () => {
//   const timestamp = Date.now();
//   const randomString = Math.random().toString(36).substring(2, 15);
  
//   return {
//     channelName: `channel_${timestamp}`,
//     uid: `uid_${timestamp}_${randomString}`,
//     timestamp
//   };
// };

// // Check astrologer availability
// const checkAstrologerAvailability = async (astrologerId) => {
//   const astrologer = await User.findOne({ 
//     _id: astrologerId,
//     role: 'astrologer',
//     online: true
//   });

//   if (!astrologer) {
//     throw new Error('Astrologer is currently unavailable');
//   }

//   // Check if astrologer is already in a call
//   const activeSession = await Session.findOne({
//     astrologerId,
//     status: 'ongoing',
//     endTime: null
//   });

//   if (activeSession) {
//     throw new Error('Astrologer is currently in another call');
//   }

//   return astrologer;
// };


//================================================================
const admin = require('firebase-admin');
const notificationService = require('../helpers/notificationService');
const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');
const CallHistory = require('../models/CallHistory');
const Astrologer = require('../models/astrologerModel');



// Send FCM notification with retry
const sendFCMNotification = async (fcmToken, payload, retryCount = 3) => {
  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await admin.messaging().sendToDevice(fcmToken, payload);
      return response;
    } catch (error) {
      if (i === retryCount - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
};

// Initiate a call
const initiateCall = async (req, res) => {
  try {
    const { receiverId, callType } = req.body;
    
    // Get caller's info from token
    const callerId = req.user._id;
    const callerRole = req.user.role;

    // Validate call type
    if (!['video', 'voice'].includes(callType)) {
      return res.status(400).json({
        success: false,
        message: 'Call type must be either video or voice'
      });
    }

    // Determine astrologer and client based on caller's role
    let astrologerId, clientId;
    let astrologer;
    
    if (callerRole === 'customer') {
      clientId = callerId;
      astrologerId = receiverId;
      
      // Verify receiver is an astrologer and check availability
      astrologer = await Astrologer.findOne({ 
        _id: receiverId,
        isAvailable: true
      });
      
      if (!astrologer) {
        return res.status(404).json({
          success: false,
          message: 'Astrologer not found or is currently unavailable'
        });
      }

      // Check if call type is enabled for astrologer
      if (callType === 'video' && !astrologer.isCallEnabled) {
        return res.status(400).json({
          success: false,
          message: 'Video calls are not enabled for this astrologer'
        });
      }

      if (callType === 'voice' && !astrologer.isChatEnabled) {
        return res.status(400).json({
          success: false,
          message: 'Voice calls are not enabled for this astrologer'
        });
      }

    } else if (callerRole === 'astrologer') {
      astrologerId = callerId;
      clientId = receiverId;
      
      // Verify receiver is a customer
      const customer = await User.findOne({ 
        _id: receiverId, 
        role: 'customer' 
      });
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }

      // Get astrologer details
      astrologer = await Astrologer.findOne({ _id: callerId });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Only customers and astrologers can initiate calls'
      });
    }

    // Check if caller has active call
    const activeCallerSession = await Session.findOne({
      $or: [
        { clientId: callerId },
        { astrologerId: callerId }
      ],
      status: 'ongoing',
      endTime: null
    });

    if (activeCallerSession) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active call'
      });
    }

    // Check if receiver has active call
    const activeReceiverSession = await Session.findOne({
      $or: [
        { clientId: receiverId },
        { astrologerId: receiverId }
      ],
      status: 'ongoing',
      endTime: null
    });

    if (activeReceiverSession) {
      return res.status(400).json({
        success: false,
        message: 'Receiver is currently in another call'
      });
    }

    // Generate call credentials
    const credentials = {
      channelName: `channel_${Date.now()}`,
      uid: `uid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Create session record
    const session = await Session.create({
      sessionType: callType === 'video' ? 'videoCall' : 'audioCall',
      astrologerId,
      clientId,
      startTime: new Date(),
      status: 'ongoing',
      // chargePerMinute: callType === 'video' ? 
      //   astrologer.callChargePerMinute : 
      //   astrologer.chatChargePerMinute
    });

    // Get receiver's FCM token
    const receiver = await User.findById(receiverId);
    if (!receiver?.fcm) {
      return res.status(400).json({
        success: false,
        message: 'Receiver is not available for calls'
      });
    }

    // Send FCM notification
    const notificationPayload = {
      notification: {
        title: `Incoming ${callType} Call`,
        body: `${req.user.firstName || 'Someone'} is calling you`
      },
      data: {
        channelName: credentials.channelName,
        uid: credentials.uid,
        callType,
        sessionId: session._id.toString(),
        type: 'call_invitation',
        callerName: req.user.firstName || '',
        callerRole: callerRole,
        // chargePerMinute: callType === 'video' ? 
        //   astrologer?.callChargePerMinute.toString() : 
        //   astrologer?.chatChargePerMinute.toString()
      }
    };

     // Send FCM notification
     const title = `Incoming ${callType} Call`;
     const message = `${req.user.firstName || 'Someone'} is calling you`;

    await notificationService.sendMessage(title, message, receiver.fcm, {
      channelName: credentials.channelName,
      uid: credentials.uid,
      callType,
      sessionId: session._id.toString(),
      type: 'call_invitation',
      callerName: req.user.firstName || '',
      callerRole: callerRole
    });

    // Create notification record
    await Notification.create({
      userId: receiverId,
      title,
      message,
      metadata: {
        sessionId: session._id
      }
    });

    res.status(200).json({
      success: true,
      data: {
        ...credentials,
        callType,
        sessionId: session._id,
        receiver: {
          name: receiver.firstName,
          role: receiver.role
        },
        // chargePerMinute: callType === 'video' ? 
        //   astrologer.callChargePerMinute : 
        //   astrologer.chatChargePerMinute
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to initiate call'
    });
  }
};

// End a call
const endCall = async (req, res) => {
  try {
    const { sessionId, duration, rating, feedback } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    if (session.status !== 'ongoing') {
      return res.status(400).json({
        success: false,
        message: 'Call is not ongoing'
      });
    }

    // Calculate call charges
    const callDuration = duration || Math.ceil((Date.now() - session.startTime) / 60000); // in minutes
    const totalCharge = callDuration * session.chargePerMinute;

    // Update session
    session.status = 'completed';
    session.endTime = new Date();
    session.duration = callDuration;
    session.totalCharge = totalCharge;
    if (rating) session.rating = rating;
    if (feedback) session.feedback = feedback;
    await session.save();

    // Create call history record
    await CallHistory.create({
      astrologerId: session.astrologerId,
      clientId: session.clientId,
      callStartTime: session.startTime,
      callEndTime: session.endTime,
      callDuration,
      callStatus: 'completed',
      rating,
      comments: feedback
    });

     // Notify users about call completion
     const users = await User.find({
      _id: { $in: [session.astrologerId, session.clientId] }
    });

    for (const user of users) {
      if (user.fcm) {
        const title = 'Call Ended';
        const message = `Call duration: ${callDuration} minutes`;
        
        await notificationService.sendMessage(title, message, user.fcm, {
          type: 'call_ended',
          sessionId: sessionId.toString(),
          duration: callDuration.toString(),
          totalCharge: totalCharge.toString()
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        duration: callDuration,
        totalCharge,
        sessionId: session._id
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to end call'
    });
  }
};
// Handle missed call
const handleMissedCall = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    if (session.status !== 'ongoing') {
      return res.status(400).json({
        success: false,
        message: 'Call is not ongoing'
      });
    }

    // Update session
    session.status = 'missed';
    session.endTime = new Date();
    await session.save();

    // Create call history record
    await CallHistory.create({
      astrologerId: session.astrologerId,
      clientId: session.clientId,
      callStartTime: session.startTime,
      callEndTime: session.endTime,
      callStatus: 'missed'
    });

     // Notify client about missed call
     const client = await User.findById(session.clientId);
     if (client?.fcm) {
       const title = 'Missed Call';
       const message = 'The astrologer was unavailable';
       
       await notificationService.sendMessage(title, message, client.fcm, {
         type: 'missed_call',
         sessionId: sessionId.toString()
       });
     }
 
     res.status(200).json({
       success: true,
       message: 'Missed call handled successfully'
     });
 
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message || 'Failed to handle missed call'
     });
   }
 };

module.exports = {
  initiateCall,
  endCall,
  handleMissedCall
};