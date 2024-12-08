package main

import (
	"aggregator/mastercard"
	"aggregator/parsing"
	"aggregator/yncu"
	"fmt"
)

func main() {

	skipMcLine := 0

	result := parsing.ParseFile([]parsing.ParseParams{
		{
			FileName: "yncu/data.csv",
			Parser:   yncu.ParseRecord,
		},
		{
			FileName:    "mastercard/data.csv",
			Parser:      mastercard.ParseRecord,
			SkipLineNum: &skipMcLine,
		},
	},
	)

	fmt.Println("Merchant, Amount,  PCT of Income, PCT of Expenses")

	for merchant, totalPerMerchant := range result.TotalsPerMerchant {
		if merchant != "Income" {
			fmt.Printf("%s, %.2f,  %.2f%%,%.2f%%\n",
				merchant,
				totalPerMerchant,
				float64(totalPerMerchant)/float64(result.TotalDeposits)*100,
				float64(totalPerMerchant)/float64(result.TotalWithdrawals)*100)
		}
	}

	fmt.Printf("Remainderm, %.2f\n", result.Total)
}
