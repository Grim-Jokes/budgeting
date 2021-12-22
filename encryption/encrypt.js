const crypto = require('crypto');

function encrypt(cipher, value) {
  return cipher.update(value, 'utf8', 'hex');
}

module.exports = {
  encryptFactory: (algorithm, secret, initVector) => {
    const cipher = crypto.createCipheriv(algorithm, secret, initVector);
    return (value) => {
      return encrypt(cipher, value)
    }
  }
}