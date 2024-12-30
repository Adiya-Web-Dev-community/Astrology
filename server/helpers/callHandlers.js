const admin = require('firebase-admin');
const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');

// Generate unique call credentials
const generateCallCredentials = () => {
  return {
    channelName: `channel_${Date.now()}`,
    uid: `uid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
};

// Initiate a call
const initiateCall = async (req, res) => {
  try {
    const { astrologerId, clientId, callType } = req.body;

    if (!['video', 'voice'].includes(callType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid call type. Must be either video or voice'
      });
    }

    // Generate call credentials
    const credentials = generateCallCredentials();

    // Create session record
    const session = await Session.create({
      sessionType: callType === 'video' ? 'videoCall' : 'audioCall',
      astrologerId,
      clientId,
      startTime: new Date(),
      status: 'ongoing'
    });

    // Get receiver's FCM token
    const receiver = await User.findById(astrologerId);
    if (!receiver?.fcm) {
      throw new Error('Receiver FCM token not found');
    }

    // Prepare and send FCM notification
    const notificationPayload = {
      notification: {
        title: `Incoming ${callType} Call`,
        body: 'calling...'
      },
      data: {
        channelName: credentials.channelName,
        uid: credentials.uid,
        callType,
        sessionId: session._id.toString(),
        type: 'call_invitation'
      }
    };

    await admin.messaging().sendToDevice(receiver.fcm, notificationPayload);

    // Create notification record
    await Notification.create({
      userId: astrologerId,
      title: `Incoming ${callType} Call`,
      message: 'Someone is calling you',
      metadata: {
        sessionId: session._id
      }
    });

    res.status(200).json({
      success: true,
      data: {
        ...credentials,
        callType,
        sessionId: session._id
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// End a call
const endCall = async (req, res) => {
  try {
    const { sessionId, duration } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Update session
    await Session.findByIdAndUpdate(sessionId, {
      status: 'completed',
      endTime: new Date(),
      duration
    });

    res.status(200).json({
      success: true,
      message: 'Call ended successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Handle missed call
const handleMissedCall = async (req, res) => {
  try {
    const { sessionId } = req.body;

    await Session.findByIdAndUpdate(sessionId, {
      status: 'missed'
    });

    res.status(200).json({
      success: true,
      message: 'Missed call handled successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  initiateCall,
  endCall,
  handleMissedCall
};