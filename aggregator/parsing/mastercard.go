package parsing

import (
	"aggregator/mastercard"
	"aggregator/merchants"
	"aggregator/money"
	"time"
)

func ParseMastercardRecord(record []string) *RecordResult {

	merchant, t, date, amount := merchants.Merchant(record[0]), record[1], record[3], money.ToMoney(record[5])

	if t == "PAYMENT" {
		return nil
	}

	parsedTime, _ := time.Parse("01/02/2006", date)

	return &RecordResult{
		Merchant:         merchants.SanitizeMerchanName(merchant, mastercard.SanitizerFns),
		DepositAmount:    0.0,
		WithdrawalAmount: amount * -1,
		Date:             parsedTime,
	}
}
