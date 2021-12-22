const crypto = require('crypto');
const { writeFile, writeFileSync, appendFileSync, existsSync, readFileSync } = require('fs');

const [, , algorithm, ...questions] = process.argv;

let secret;
let initVector;

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

console.log("IV", initVector);

const { encryptFactory } = require('./encrypt');

const encrypt = encryptFactory(algorithm, secret, initVector);

writeFileSync('creds.bin', '');

QA.forEach(([q, a]) => {
  let c = encrypt(q, 'utf8', 'hex');
  let b = encrypt(a, 'utf8', 'hex');
  appendFileSync("creds.bin", `${c}:${b}\n`, () => { });
})