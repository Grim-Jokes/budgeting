package writing

import (
	"aggregator/parsing"
	"encoding/csv"
	"log"
	"os"
	"strconv"
)

func SaveRecords(result parsing.ParseResult) {
	fileName := "data.csv"

	file, err := os.OpenFile(fileName, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0644)

	if err != nil {
		log.Fatalf("Failed to open file %v", err)
	}
	defer file.Close()

	if _, err := file.WriteString("Date, Merchant, Deposit, Withdrawal, Category, Sub-Category\n"); err != nil {
		log.Fatalf("Failed to write header to file %v", err)
	}

	writer := csv.NewWriter(file)
	defer writer.Flush()

	for _, record := range result.Records {
		category, subCategory := record.Categorize()

		row := []string{
			record.Date.Format("2006-01-02"),
			string(record.Merchant),
			record.DepositAmount.ToString(),
			record.WithdrawalAmount.ToString(),
			string(category),
			string(subCategory),
		}

		writer.Write(row)

	}

	writer.Write([]string{})

	for category, total := range result.TotalsPerCategory {

		writer.Write([]string{
			string(category),
			strconv.FormatFloat(float64(total*-1), 'f', 2, 64),
			strconv.FormatFloat(((float64(total))/float64(result.TotalDeposits))*100, 'f', 2, 64) + "%",
		})

		for childCat, _ := range result.TotalsPerSubCategory[category] {

			months := result.TotalsPerSubCategoryPerMonth[category][childCat]
			row := []string{string(childCat)}
			for _, val := range months {
				row = append(row, strconv.FormatFloat(float64(val*-1), 'f', 2, 64))
			}

			// row = append(row, strconv.FormatFloat(float64(childTotal), 'f', 2, 64),
			// 	strconv.FormatFloat((float64(childTotal)/float64(total))*100, 'f', 2, 64)+"%")

			writer.Write(row)

		}

		writer.Write([]string{})

	}

	writer.Write([]string{})
	writer.Write([]string{
		"",
		"",
		result.TotalDeposits.ToString(),
	})

	writer.Write([]string{
		"",
		"",
		"",
		result.TotalWithdrawals.ToString(),
	})

	writer.Write([]string{
		"",
		"",
		"",
		result.Total.ToString(),
	})

}
