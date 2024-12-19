// const admin = require('../firebase/firebaseAdmin');
// const Notification  = require('../models/notificationModel');

// // Send FCM Message
// exports.sendMessage = async (title, message, fcmToken) => {
//   const messageData = {
//     notification: {
//       title: title,
//       body: message,
//     },
//     token: fcmToken,
//   };

//   try {
//     const response = await admin.messaging().send(messageData);
//     console.log("Notification sent successfully: ", response);
//   } catch (error) {
//     console.error("Error sending notification: ", error);
//     throw new Error('FCM Notification failed');
//   }
// };

// exports.sendMessage = async (title, message, fcmToken, firebaseAdmin) => {
//   console.log("TOKEN_FROM sendMessage",fcmToken);
//   console.log("ROLE FROM sendMessage",firebaseAdmin);
  
//   const messagePayload = {
//     notification: {
//       title,
//       body: message,
//     },
//     token: fcmToken,
//   };

//   try {
//     const response = await firebaseAdmin.messaging().send(messagePayload);
//     console.log("Notification sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending notification:", error);
//     throw error;
//   }
// };


// Mark Notification as Read
// exports.markAsRead = async (notificationId) => {
//   try {
//     await Notification.findByIdAndUpdate(notificationId, { isRead: true });
//   } catch (error) {
//     console.error("Error marking notification as read: ", error);
//     throw new Error('Failed to update notification status');
//   }
// };
//================================================================
const { getFirebaseAdmin } = require('../firebase/firebaseAdmin');

const createMessageData = (title, message, metadata = {}) => ({
  notification: {
    title,
    body: message,
  },
  data: {
    ...metadata,
    click_action: 'FLUTTER_NOTIFICATION_CLICK',
  }
});

const sendMessage = async (role, title, message, fcmToken, metadata = {}) => {
  const admin = getFirebaseAdmin(role);
  const messageData = {
    ...createMessageData(title, message, metadata),
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(messageData);
    console.log("Notification sent successfully:", response);
    return { success: true, messageId: response };
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error('FCM Notification failed');
  }
};

const sendMulticast = async (role, title, message, fcmTokens, metadata = {}) => {
  const admin = getFirebaseAdmin(role);
  const messageData = {
    ...createMessageData(title, message, metadata),
    tokens: Array.isArray(fcmTokens) ? fcmTokens : [fcmTokens]
  };

  try {
    const response = await admin.messaging().sendMulticast(messageData);
    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses
    };
  } catch (error) {
    console.error("Error sending multicast notification:", error);
    throw new Error('FCM Multicast Notification failed');
  }
};

module.exports = {
  sendMessage,
  sendMulticast,
  createMessageData
};