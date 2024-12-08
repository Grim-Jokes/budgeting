package yncu

import (
	"aggregator/merchants"
	"aggregator/money"
	"aggregator/parsing"
)

func ParseRecord(record []string) *parsing.RecordResult {
	merchant, withdrawalAmount, depositAmount := merchants.Merchant(record[2]), money.ToMoney(record[4]), money.ToMoney(record[5])

	merchant = merchants.SanitizeMerchanName(merchant, sanitizers)

	// Skip mastercard becasuse we want the actual transactions
	if merchant == "Mastercard" {
		return nil
	}

	return &parsing.RecordResult{
		Merchant:         merchant,
		DepositAmount:    depositAmount,
		WithdrawalAmount: withdrawalAmount,
	}
}
