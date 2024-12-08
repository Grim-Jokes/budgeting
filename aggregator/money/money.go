package money

import (
	"log"
	"strconv"
)

type Money float64

func ToMoney(from string) Money {

	if from == "" {
		return 0.0
	}

	value, err := strconv.ParseFloat(from, 64)

	if err != nil {
		log.Println("WARN", err)
		value = 0.0
	}

	return Money(value)
}

func (m Money) ToString() string {
	return strconv.FormatFloat(float64(m), 'f', 2, 64)
}
