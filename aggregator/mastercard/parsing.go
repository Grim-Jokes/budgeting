package mastercard

import (
	"aggregator/merchants"
	"aggregator/money"
	"aggregator/parsing"
)

func ParseRecord(record []string) *parsing.RecordResult {

	merchant, t, amount := merchants.Merchant(record[0]), record[1], money.ToMoney(record[5])

	if t == "PAYMENT" {
		return nil
	}

	return &parsing.RecordResult{
		Merchant:         merchants.SanitizeMerchanName(merchant),
		DepositAmount:    0.0,
		WithdrawalAmount: amount * -1,
	}
}
