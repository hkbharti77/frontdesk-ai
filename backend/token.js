const { AccessToken } = require('livekit-server-sdk');

function createToken(identity, room) {
  const at = new AccessToken(process.env.LK_API_KEY, process.env.LK_API_SECRET, {
    identity,
  });

  at.addGrant({ roomJoin: true, room });

  return at.toJwt();
}

module.exports = createToken;
