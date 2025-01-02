const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

// Your Agora App credentials
const appId = process.env.AGORAAPPID;
const appCertificate = process.env.AGORAAPPcertificate;

const generateAgoraToken = (channelName, uid) => {
  const role = RtcRole.PUBLISHER; 
  const expirationTimeInSeconds = 3600; 
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  return token;
};

module.exports = generateAgoraToken;