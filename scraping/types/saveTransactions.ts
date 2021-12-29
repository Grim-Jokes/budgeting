import { Client } from "pg";
import { Amount, MerchantId, MerchantName, Transaction, TransactionDate, TransactionsFromCSV } from ".";

async function getMerchantId(db: Client, merchantName: MerchantName): Promise<MerchantId> {
  console.log("Validating merchant: ", merchantName);

  const query = `SELECT id FROM merchant WHERE name = $1`;

  try {
    let result = await db.query(query, [merchantName]);

    if (result.rowCount == 0) {
      result = await db.query(`
      INSERT INTO merchant (name)  VALUES ($1)
      ON CONFLICT(name) 
      DO UPDATE SET name=EXCLUDED.name
      RETURNING id`, [merchantName]);
    }
    return result.rows[0].id;
  } catch (err) {
    console.error(err);
    throw err;
  }

}

async function withTransaction(db: Client, executor: () => Promise<void>) {
  try {
    await db.query("BEGIN");
    await executor();
    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK")
  }
}

export default function createSaveTransactionsFn(db: Client) {
  return async (transactionsFromCsv: TransactionsFromCSV) => {

    await withTransaction(db, async () => {
      const trans = transactionsFromCsv.map(async (t): Promise<Transaction> => {
        const merchant = await getMerchantId(db, t.merchant);

        return {
          amount: t.amount,
          date: t.date,
          merchant
        }
      });
      const transactionsToInsert = await Promise.all(trans);
      let index = 1;
      let pos = transactionsToInsert.map(() => `($${index++}, $${index++}, $${index++})`);
      const values: [MerchantId, Amount, TransactionDate][] = transactionsToInsert.map(
        (t) => [t.merchant, t.amount, t.date]
      );

      const vs = values.reduce((p: (number | Date)[], c) => {
        return [
          ...p,
          ...c
        ]
      }, [])

      let query = `INSERT INTO transaction ("merchantId", amount, date) VALUES ${pos}`;

      await db.query(query, vs)
    });
  }
}

