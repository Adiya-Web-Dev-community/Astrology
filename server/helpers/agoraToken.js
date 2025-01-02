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

// Your Agora App credentials
const appId = process.env.AGORAAPPID;
const appCertificate = process.env.AGORAAPPcertificate;

const generateAgoraToken = (channelName, uid) => {
  try {
    // Ensure required environment variables are present
    if (!appId || !appCertificate) {
      throw new Error("Agora App ID or Certificate is missing in environment variables.");
    }

    const role = RtcRole.PUBLISHER; 
    const expirationTimeInSeconds = 3600; //
    const currentTimestamp = Math.floor(Date.now() / 1000); 
    const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

    // Generate token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpireTime
    );

    return token;
  } catch (error) {
    console.error("Error generating Agora token:", error.message);
    throw new Error("Failed to generate Agora token. Please check your configurations.");
  }
};

module.exports = generateAgoraToken;
