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

	for key, value := range result.TotalsPerMerchant {
		fmt.Printf("%s: %.2f\n", key, value)
	}

	fmt.Printf("Total: %.2f", result.Total)
}
