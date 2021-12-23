/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  await pgm.createTable("cred", {
    id: 'id',
    iv: { type: PgType.VARCHAR, notNull: true },
    key: { type: PgType.VARCHAR, notNull: true },
    cipher: { type: PgType.VARCHAR, notNull: true }
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("cred");
}
