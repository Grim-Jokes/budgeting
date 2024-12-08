package main

import (
	"aggregator/yncu"
	"fmt"
)

func main() {
	result := yncu.ParseData()

	for key, value := range result.TotalsPerMerchant {
		if key != "Income" {
			fmt.Printf("Merchant: %s, Total: %.2f (%.2f)%%\n", key, value, value/result.TotalExpenses)
		} else {
			fmt.Printf("Merchant: %s, Total: %.2f\n", key, value)
		}
	}

	fmt.Printf("Total: %.2f - %.2f = %.2f\n", result.TotalIncome, result.TotalExpenses, result.Total)
}
