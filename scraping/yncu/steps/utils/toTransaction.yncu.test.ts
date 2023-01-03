import { TransactionFromCSV } from "../../../types";
import { toTransaction } from "./toTransaction"

describe("toTransaction", () => {
  const billPayment1 = `000008007700-001-FMC  -00100,01-Jan-2023,"Bill Payment to Mastercard - PC Financial                                              Confirmation #666283",,3759.36,,3534.49`

  it(`should handle: ${billPayment1}`, async () => {
    const data = toTransaction(billPayment1);
    const expectedData: TransactionFromCSV = {
      amount: -3759.36,
      date: new Date("01-Jan-2023"),
      merchant: "Bill Payment to Mastercard - PC Financial",
    }

    expect(data).toEqual(expectedData);
  })

  const billPayment2 = `000008007700-001-FMC  -00100,25-Mar-2022,"eTransfer Withdrawal Payee:  Kristina-O'Kelly                                         ",,235.00,,1954.40`

  it(`should handle: ${billPayment2}`, async () => {
    const data = toTransaction(billPayment2);
    const expectedData: TransactionFromCSV = {
      amount: -235.00,
      date: new Date("25-Mar-2022"),
      merchant: "eTransfer Withdrawal Payee: Kristina-O'Kelly",
    }

    expect(data).toEqual(expectedData);
  })

  const billPayment3 = `000008007700-001-FMC  -00100,16-Mar-2022,"Electronic Withdrawal        Insurance CUMIS / CLIC       99837625                    ",,53.22,,7568.64`

  it(`should handle: ${billPayment3}`, async () => {
    const data = toTransaction(billPayment3);
    const expectedData: TransactionFromCSV = {
      amount: -53.22,
      date: new Date("16-Mar-2022"),
      merchant: "Electronic Withdrawal Insurance CUMIS / CLIC",
    }

    expect(data).toEqual(expectedData);
  })


  const income1 = `000008007700-001-FMC  -00100,16-Mar-2022,"Electronic Deposit           Miscellaneous Payments       TRANSFERWISE                ",,,6494.27,7621.86`

  it(`should handle: ${income1}`, async () => {
    const data = toTransaction(income1);
    const expectedData: TransactionFromCSV = {
      amount: 6494.27,
      date: new Date("16-Mar-2022"),
      merchant: "Electronic Deposit Miscellaneous Payments TRANSFERWISE",
    }

    expect(data).toEqual(expectedData);
  })

  const income2 = `000008007700-001-FMC  -00100,14-Jan-2022,"Electronic Deposit           Miscellaneous Payments       PAYPAL 1017934184767        ",,,6286.38,7120.88`

  it(`should handle: ${income2}`, async () => {
    const data = toTransaction(income2);
    const expectedData: TransactionFromCSV = {
      amount: 6286.38,
      date: new Date("14-Jan-2022"),
      merchant: "Electronic Deposit Miscellaneous Payments PAYPAL",
    }

    expect(data).toEqual(expectedData);
  })
})