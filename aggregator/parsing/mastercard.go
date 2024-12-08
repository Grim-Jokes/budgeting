package parsing

import (
	"aggregator/mastercard"
	"aggregator/merchants"
	"aggregator/money"
)

func ParseMastercardRecord(record []string) *RecordResult {

	merchant, t, amount := merchants.Merchant(record[0]), record[1], money.ToMoney(record[5])

	if t == "PAYMENT" {
		return nil
	}

	return &RecordResult{
		Merchant:         merchants.SanitizeMerchanName(merchant, mastercard.SanitizerFns),
		DepositAmount:    0.0,
		WithdrawalAmount: amount * -1,
	}
}
