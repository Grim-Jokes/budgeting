package writing

import (
	"aggregator/parsing"
	"encoding/csv"
	"log"
	"os"
)

func SaveRecords(result parsing.ParseResult) {
	fileName := "data.csv"

	file, err := os.OpenFile(fileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		log.Fatalf("Failed to open file %v", err)
	}
	defer file.Close()

	if _, err := file.WriteString("Merchant, Deposit, Withdrawal, Category\n"); err != nil {
		log.Fatalf("Failed to write header to file %v", err)
	}

	writer := csv.NewWriter(file)
	defer writer.Flush()

	for _, record := range result.Records {
		category, _ := record.Categorize()

		row := []string{
			string(record.Merchant),
			record.DepositAmount.ToString(),
			record.WithdrawalAmount.ToString(),
			string(category),
		}

		writer.Write(row)

	}

}
