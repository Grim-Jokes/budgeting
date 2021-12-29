import { Client } from "pg";
import { LoginCreds } from "./yncu/steps/login";
import { decryptFactory } from "./utils/decrypt";

export async function getLoginCred(db: Client): Promise<LoginCreds> {
  const data = await db.query("SELECT * FROM cred;");

  return data.rows.slice(-1).map((d) => {
    const secret = Buffer.from(d.key, "hex");
    const iv = Buffer.from(d.iv, "hex");
    const [username, pw] = d.cipher.split(':');
    const decrypt = decryptFactory("aes-256-gcm", secret, iv);
    const result = {
      username: decrypt(username),
      pw: decrypt(pw)
    }

    return result;
  }).shift() || { username: '', pw: '' }
}

export async function getSecuirityQuestions(db: Client) {
  const data = await db.query("SELECT * FROM cred;");

  const questions = {};

  const result = data.rows.reduce((p, c) => {
    let [q, a] = c.cipher.split(':');
    const secret = Buffer.from(c.key, "hex");
    const iv = Buffer.from(c.iv, "hex");

    const decrypt = decryptFactory("aes-256-gcm", secret, iv);
    q = decrypt(q);
    a = decrypt(a);

    return {
      ...p,
      [q]: a
    }
  }, questions);

  return result;
}
