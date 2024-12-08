package yncu

import (
	"encoding/csv"
	"log"
	"os"
	"strconv"
)

type YncuParseResult struct {
	Total             float64
	TotalIncome       float64
	TotalExpenses     float64
	TotalsPerMerchant TotalsPerMerchant
}

type TotalsPerMerchant map[Merchant]float64

var totalsPerMerchant TotalsPerMerchant = make(TotalsPerMerchant)

func ParseData() YncuParseResult {

	file, err := os.Open("yncu/data.csv")

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	totalIncome := 0.0
	totalExpenses := 0.0
	total := 0.0

	reader := csv.NewReader(file)

	for {
		record, err := reader.Read()

		if err != nil {
			if err.Error() != "EOF" {
				log.Fatal(err)
			}
			break
		}
		merchant, withdraw, deposit := Merchant(record[2]), record[4], record[5]

		merchant = sanitizeMerchanName(merchant)

		if record[4] != "" {
			value, err := strconv.ParseFloat(withdraw, 64)

			if err != nil {
				log.Println("WARN", err)
				value = 0.0
			}

			total -= value
			val := totalsPerMerchant[merchant]

			totalsPerMerchant[merchant] = val - value
			totalExpenses += value
		}

		if record[5] != "" {
			value, err := strconv.ParseFloat(deposit, 64)

			if err != nil {
				log.Println("WARN", err)
				value = 0.0
			}

			total += value
			val := totalsPerMerchant[merchant]

			totalsPerMerchant[merchant] = val + value
			totalIncome += value
		}

	}

	return YncuParseResult{
		Total:             total,
		TotalsPerMerchant: totalsPerMerchant,
		TotalIncome:       totalIncome,
		TotalExpenses:     totalExpenses,
	}

}
