package parsing

import (
	"aggregator/merchants"
	"aggregator/money"
	"aggregator/yncu"
)

func ParseYncuRecord(record []string) *RecordResult {
	merchant, withdrawalAmount, depositAmount := merchants.Merchant(record[2]), money.ToMoney(record[4]), money.ToMoney(record[5])

	merchant = merchants.SanitizeMerchanName(merchant, yncu.Sanitizers)

	// Skip mastercard becasuse we want the actual transactions
	if merchant == "Mastercard" {
		return nil
	}

	return &RecordResult{
		Merchant:         merchant,
		DepositAmount:    depositAmount,
		WithdrawalAmount: withdrawalAmount,
	}
}
