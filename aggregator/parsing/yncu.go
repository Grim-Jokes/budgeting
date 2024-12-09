package parsing

import (
	"aggregator/merchants"
	"aggregator/money"
	"aggregator/yncu"
	"time"
)

func ParseYncuRecord(record []string) *RecordResult {
	merchant, dateStr, withdrawalAmount, depositAmount := merchants.Merchant(record[2]), record[1], money.ToMoney(record[4]), money.ToMoney(record[5])

	merchant = merchants.SanitizeMerchanName(merchant, yncu.Sanitizers)

	date, _ := time.Parse("02-Jan-2006", dateStr)

	// Skip mastercard becasuse we want the actual transactions
	if merchant == "Mastercard" {
		return nil
	}

	return &RecordResult{
		Merchant:         merchant,
		DepositAmount:    depositAmount,
		WithdrawalAmount: withdrawalAmount,
		Date:             date,
	}
}
