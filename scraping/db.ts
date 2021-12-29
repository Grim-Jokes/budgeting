import { Client } from "pg"

type CloseFn = () => Promise<void>;

export default async function getDb(): Promise<[Client, CloseFn]> {
  const c = new Client();

  await c.connect()

  return [c, () => c.end()];
}