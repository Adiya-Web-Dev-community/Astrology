// const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

// // Your Agora App credentials
// const appId = process.env.AGORAAPPID;
// const appCertificate = process.env.AGORAAPPcertificate;

// const generateAgoraToken = (channelName, uid) => {
//   const role = RtcRole.PUBLISHER; 
//   const expirationTimeInSeconds = 3600; 
//   const currentTimestamp = Math.floor(Date.now() / 1000);
//   const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

//   const token = RtcTokenBuilder.buildTokenWithUid(
//     appId,
//     appCertificate,
//     channelName,
//     uid,
//     role,
//     privilegeExpireTime
//   );

//   return token;
// };

// module.exports = generateAgoraToken;

//================================================
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");


const generateAgoraToken = (channelName, uid) => {
  try {

    // Your Agora App credentials
const appId = process.env.AGORAAPPID;
const appCertificate = process.env.AGORAAPPCERTIFICATE;
console.log("appId",appId);
console.log("appCertificate",appCertificate);

    // Ensure required environment variables are present
    if (!appId || !appCertificate) {
      throw new Error("Agora App ID or Certificate is missing in environment variables.");
    }

     // Convert string uid to number if needed
     const numericUid = typeof uid === 'string' ? parseInt(uid.replace(/\D/g, '')) : uid;
     if (isNaN(numericUid)) {
       throw new Error("Invalid UID format. Must be convertible to a number.");
     }

    const role = RtcRole.PUBLISHER; 
    const expirationTimeInSeconds = 600; //
    const currentTimestamp = Math.floor(Date.now() / 1000); 
    const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;
console.log("Role",role);
console.log("expirationTimeInSeconds",expirationTimeInSeconds);
console.log("currentTimestamp",currentTimestamp);
console.log("privilegeExpireTime",privilegeExpireTime);

    // Generate token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      numericUid,
      role,
      privilegeExpireTime
    );
console.log("Token",token);
    return token;
  } catch (error) {
    console.error("Error generating Agora token:", error.message);
    throw new Error("Failed to generate Agora token. Please check your configurations.");
  }
};

module.exports = generateAgoraToken;
