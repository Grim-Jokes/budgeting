package main

import (
	"aggregator/parsing"
	"aggregator/writing"
)

func main() {

	skipMcLine := 0

	result := parsing.ParseFile([]parsing.ParseParams{
		{
			FileName: "yncu/data.csv",
			Parser:   parsing.ParseYncuRecord,
		},
		{
			FileName:    "mastercard/data.csv",
			Parser:      parsing.ParseMastercardRecord,
			SkipLineNum: &skipMcLine,
		},
	},
	)

	writing.SaveRecords(result)

}
