const crypto = require('crypto');
const { writeFile, writeFileSync, appendFileSync, existsSync, readFileSync } = require('fs');

const [, , algorithm, ...questions] = process.argv;


const QA = questions.reduce((p, c, i) => {
  if (i % 2 === 0) {
    p.push(
      [c]
    )
  } else {
    let last = p[p.length - 1];
    last.push(c);
  }

  return p;
}, []);

let secret;
let initVector;

if (existsSync("secrets.bin")) {
  const secrets = readFileSync("secrets.bin").toString().split('\n');

  secret = Buffer.from(secrets[0], 'hex');
  initVector = Buffer.from(secrets[1], 'hex');
} else {
  secret = crypto.randomBytes(32);
  initVector = crypto.randomBytes(16);

  const data = [
    secret.toString('hex'),
    initVector.toString('hex')
  ].join('\n');

  writeFile("secrets.bin", data, () => { });
}

console.log("secret", secret);
console.log("iv", initVector);

const { encryptFactory } = require('./encrypt');


writeFileSync('creds.bin', '');

QA.forEach(([q, a]) => {
  const encrypt = encryptFactory(algorithm, secret, initVector);
  let c = encrypt(q);
  let b = encrypt(a);

  appendFileSync("creds.bin", `${c}:${b}\n`, () => { });
});