const crypto = require('crypto');

function decrypt(cipher, value) {
  return cipher.update(value, 'hex', 'utf8');
}

module.exports = {
  decryptFactory: (algorithm, secret, initVector) => {
    const cipher = crypto.createDecipheriv(algorithm, secret, initVector);
    return (value) => decrypt(cipher, value)
  }
}