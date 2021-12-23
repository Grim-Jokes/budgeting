/* eslint-disable @typescript-eslint/camelcase */
import { existsSync, readFileSync } from 'fs';
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import { resolve } from 'path';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  if (!existsSync("../encryption/secrets.bin")) {
    throw new Error(resolve("../encryption/secrets.bin are not set"));
  }

  if (!existsSync("../encryption/creds.bin")) {
    throw new Error("Credentials files are not set")
  }

  const [secret, iv] = readFileSync("../encryption/secrets.bin").toString().split('\n');

  const creds = readFileSync("../encryption/creds.bin").toString().trim().split('\n')
  console.log(creds);

  let i = 1;
  const positions = creds.map((_c) => {
    let result = `($${i}::varchar, $${i + 1}::varchar, $${i + 2})`
    i += 3;
    return result;
  }).join(', ');
  const values: string[] = [];
  
  creds.forEach(c => {
    values.push(iv);
    values.push(secret);
    values.push(c);
  });

  console.log(`INSERT INTO cred (iv, key, cipher) VALUES ${positions}`);
  await pgm.db.query(`INSERT INTO cred (iv, key, cipher) VALUES ${positions};`, values)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.db.query("DELETE FROM cred;")
}
