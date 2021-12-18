export interface ParsedTransaction {
  amount: number;
  merchant: string;
  date: string;
}

export class TransactionParser {
  /// Swap columns around to match a consistent format
  merchantIndex = -1;
  dateIndex = -1;
  incomeIndex = -1;
  expenseIndex = -1;

  expectedColCount = -1;

  validateIndices() {
    if (this.merchantIndex === -1) this.throw('merchantIndex');
    if (this.dateIndex === -1) this.throw('dateIndex');
    if (this.incomeIndex === -1) this.throw('incomeIndex');
    if (this.expenseIndex === -1) this.throw('expenseIndex');
    if (this.expectedColCount === -1) this.throw('expectedColCount');
  }

  throw(indexName: string) {
    throw new Error(`${indexName} was not set by ${this.constructor.name}`)
  }

  public parse(data: string, count?: number) {
    this.validateIndices();
    if (!data) {
      return []
    }

    let rows = data.trim().split('\n');

    if (count != null) {
      rows = rows.splice(0, count);
    }

    let transformedRows = rows.map((row) => row.split(','));

    return this.handleData(transformedRows);
  }

  protected getMerchant(row: string[]) {
    return row[this.merchantIndex];
  }

  private handleData(data: string[][]): ParsedTransaction[] {
    const handled = [];

    for (const row of data) {
      if (row.length !== this.expectedColCount) {
        continue;
      }
      const merchant = this.getMerchant(row)
      const date = row[1];

      let num = Number.parseFloat(row[4]);
      if (Number.isNaN(num)) {
        num = Number.parseFloat(row[5]);
      } else {
        if (num > 0) {
          num *= -1
        }
      }
      handled.push({
        amount: num,
        merchant: merchant.replace(/ {2,}/g, ' '),
        date,
      })
    }

    return handled;
  }
}