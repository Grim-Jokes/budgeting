package parsing

import (
	"aggregator/categories"
	"aggregator/merchants"
	"aggregator/money"
	"encoding/csv"
	"log"
	"os"
)

type ParseResult struct {
	Records           []*RecordResult
	Total             money.Money
	TotalDeposits     money.Money
	TotalWithdrawals  money.Money
	TotalsPerMerchant TotalsPerMerchant
	TotalsPerCategory totalsPerCategory
}

type TotalsPerMerchant map[merchants.Merchant]money.Money

type ParseParams struct {
	FileName    string
	Parser      ParserFn
	SkipLineNum *int
}

type totalsPerCategory = map[categories.Category]money.Money

func ParseFile(params []ParseParams) ParseResult {
	total := money.Money(0.0)
	totalDeposits := money.Money(0.0)
	totalWithdrawals := money.Money(0.0)
	totalsPerMerchant := make(TotalsPerMerchant)
	totalsPerCategory := make(totalsPerCategory)
	records := []*RecordResult{}

	for _, param := range params {

		file, err := os.Open(param.FileName)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		reader := csv.NewReader(file)

		i := 0

		for {

			record, err := reader.Read()
			if err != nil {
				if err.Error() != "EOF" {
					log.Fatal(err)
				}
				break
			}

			if param.SkipLineNum != nil && *param.SkipLineNum == i {
				i++
				continue
			}
			i++

			result := param.Parser(record)

			if result == nil {
				continue
			}

			records = append(records, result)

			total += result.DepositAmount
			total -= result.WithdrawalAmount

			totalDeposits += result.DepositAmount
			totalWithdrawals += result.WithdrawalAmount

			totalsPerMerchant[result.Merchant] += result.DepositAmount
			totalsPerMerchant[result.Merchant] -= result.WithdrawalAmount

			category, _ := result.Categorize()

			totalsPerCategory[category] += result.DepositAmount
			totalsPerCategory[category] -= result.WithdrawalAmount

		}
	}

	return ParseResult{
		Records:           records,
		Total:             total,
		TotalDeposits:     totalDeposits,
		TotalWithdrawals:  totalWithdrawals,
		TotalsPerMerchant: totalsPerMerchant,
		TotalsPerCategory: totalsPerCategory,
	}
}
