const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const KEY_32 = 'top@secret@for@crypto@encryptor@';
const IV_16 = 'top@secretCrypto';
const CRYPTO_ALGO = 'aes-256-cbc'

const JWT_SECRET = 'top@secret';
const JWT_EXPITY_TIME = '1h'

export const getNewToken = async (username: string, expiryTime = JWT_EXPITY_TIME) => {
  const token = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: expiryTime,
    algorithm: 'HS512'
  });

  const cipher = crypto.createCipheriv(CRYPTO_ALGO, KEY_32, IV_16);
  let encryptedToken = cipher.update(token, 'utf8', 'hex');
  encryptedToken += cipher.final('hex');

  return encryptedToken;

}

const _decryptToken = (token) => {
  const decipher = crypto.createDecipheriv(CRYPTO_ALGO, KEY_32, IV_16);
  let decryptedToken = decipher.update(token, 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');

  return decryptedToken;
}

export const verifyToken = (encryptedToken) => {
  try {
    const decryptedToken = _decryptToken(encryptedToken);
    const decodedToken = jwt.verify(decryptedToken, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    console.log(err);
    console.log('Above error occurred while verifying token (token-manager.js)');
    throw err;
  }
}

