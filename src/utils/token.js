const crypto = require('crypto');

const base64url = (value) => Buffer.from(value).toString('base64url');

const sign = (payload, secret) => {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
};

const createToken = (payload, secret, expiresInSeconds = 60 * 60 * 24) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const tokenPayload = { ...payload, exp };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(tokenPayload));
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const signature = sign(unsigned, secret);

  return `${unsigned}.${signature}`;
};

const verifyToken = (token, secret) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [encodedHeader, encodedPayload, tokenSignature] = parts;
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = sign(unsigned, secret);

  if (tokenSignature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  const payloadText = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  const payload = JSON.parse(payloadText);

  if (!payload.exp || Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error('Token expired');
  }

  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};
