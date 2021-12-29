import crypto from 'crypto';

function decrypt(cipher: crypto.Cipher, value: string) {
  return cipher.update(value, 'hex', 'utf8');
}

export function decryptFactory(algorithm: string, secret: Buffer, initVector: Buffer) {
  const cipher = crypto.createDecipheriv(algorithm, secret, initVector);
  return (value: string) => decrypt(cipher, value)
}