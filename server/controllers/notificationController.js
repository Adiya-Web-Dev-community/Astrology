// const Notification  = require('../models/notificationModel');
// const notificationService = require('../helpers/notificationService');
// const { initializeFirebaseAdmin } = require('../firebase/firebaseAdmin');

// // // Create and Send Notification
// exports.sendNotification = async (req, res) => {
//   const {title, message, fcmToken, priority, metadata } = req.body;
//   try {
//     const notification = await Notification.create({
//       userId:req.user._id,
//       title,
//       message,
//       priority,
//       metadata,
//     });

//     if (notification) {
//       // Send FCM Notification
//       await notificationService.sendMessage(title, message, fcmToken);
//       res.status(201).json({ success: true, data: notification });
//     } else {
//       res.status(400).json({ success: false, message: 'Failed to create notification' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.sendNotification = async (req, res) => {
//   const { title, message, priority, metadata } = req.body;

//   try {
//     // Example: Assuming the role is available in the request user object
//     const role = req.user.role; 
//     const fcmToken = req.user.fcm;
//     console.log("FCM_TOKEN",fcmToken);
//     console.log("ROLE",role);
    
//     // const firebaseAdmin = initializeFirebaseAdmin(role);

//     const notification = await Notification.create({
//       userId: req.user._id,
//       title,
//       message,
//       priority,
//       metadata,
//     });

//     if (notification) {
//       // Use Firebase Admin for sending notifications
//       await notificationService.sendMessage(title, message, fcmToken, initializeFirebaseAdmin(role));
//       res.status(201).json({ success: true, data: notification });
//     } else {
//       res.status(400).json({ success: false, message: "Failed to create notification" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getUserNotifications = async (req, res) => {
//     try {
//         // Fetch notifications for the user sorted by creation date (most recent first)
//         const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });

//         // Respond with the fetched notifications
//         res.status(200).json({
//             success: true,
//             data: notifications,
//         });
//     } catch (error) {
//         // Log the error and respond with a generic error message
//         console.error("Error fetching notifications:", error);

//         // Send a 500 error response to the client
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch notifications. Please try again later.",
//         });
//     }
// };

//=========================================================
// controllers/notificationController.js
const Notification = require('../models/notificationModel');
const { sendMessage, sendMulticast } = require('../helpers/notificationService');

const createNotificationRecord = async (userId, notificationData) => {
  try {
    return await Notification.create({
      userId,
      ...notificationData
    });
  } catch (error) {
    console.error('Error creating notification record:', error);
    throw error;
  }
};

const updateNotificationStatus = async (notificationId, updates) => {
  try {
    return await Notification.findByIdAndUpdate(
      notificationId,
      updates,
      { new: true }
    );
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

const sendNotification = async (req, res) => {
  const { title, message, fcmToken, priority, metadata } = req.body;
  const { id, role } = req.user;

  try {
    // Create notification record
    const notification = await createNotificationRecord(id, {
      title,
      message,
      priority,
      metadata
    });

    // Send FCM notification
    await sendMessage(
      role,
      title,
      message,
      fcmToken,
      {
        notificationId: notification._id.toString(),
        ...metadata
      }
    );

    // Update notification status
    const updatedNotification = await updateNotificationStatus(notification._id, {
      isSent: true
    });

    res.status(201).json({
      success: true,
      data: updatedNotification
    });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const sendBulkNotifications = async (req, res) => {
  const { title, message, fcmTokens, priority, metadata } = req.body;
  const { _id: userId, role } = req.user;

  try {
    // Create notification records
    const createNotifications = async () => {
      return Promise.all(
        fcmTokens.map(() => 
          createNotificationRecord(userId, {
            title,
            message,
            priority,
            metadata
          })
        )
      );
    };

    const notifications = await createNotifications();

    // Send bulk FCM notifications
    const fcmResponse = await sendMulticast(
      role,
      title,
      message,
      fcmTokens,
      {
        notificationIds: notifications.map(n => n._id.toString()),
        ...metadata
      }
    );

    // Update notification statuses
    const updateNotifications = async () => {
      return Promise.all(
        notifications.map(notification =>
          updateNotificationStatus(notification._id, { isSent: true })
        )
      );
    };

    const updatedNotifications = await updateNotifications();

    res.status(201).json({
      success: true,
      data: {
        notifications: updatedNotifications,
        fcmResponse
      }
    });
  } catch (error) {
    console.error('Bulk notification error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Utility functions for notification management
const getNotificationsByUser = async (userId, limit = 50) => {
  try {
    return await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    return await updateNotificationStatus(notificationId, { isRead: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Controller endpoints using utility functions
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await getNotificationsByUser(
      req.user._id,
      req.query.limit
    );
    
    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await markNotificationAsRead(req.params.id);
    
    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  sendNotification,
  sendBulkNotifications,
  getUserNotifications,
  markAsRead
};