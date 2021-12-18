import { Transaction } from "@src/models/entities";
import { ListTransactionsResponse } from "httptypes";

export function serializeResponse(transaction: Transaction): ListTransactionsResponse {

    if (!transaction.id) {
      throw new Error("Attempting to serilize an invalid or unsaved transaction");
    }
  
    return {
      id: transaction.id,
      merchant: transaction.merchant.name.value,
      amount: transaction.amount.value,
      date: transaction.date.date.toDateString()
    }
  }
  