package yncu

import (
	"log"
	"regexp"
	"strings"
)

type SanitizerFn = func(Merchant) Merchant

var sanitizerFns = []SanitizerFn{
	handleETransfer,
	createSanitizer(`Withdrawal Transfer to \*\d+ MTG`, "Mortgage - YNCU"),
	createSanitizer(`Deposit MD Tfr from \*5229    SAV`, "Emergency Savings"),
	createSanitizer(`Withdrawal Transfer to \*5229 SAV`, "Emergency Savings"),
	createSanitizer(`Deposit MD Tfr from \*2588    SAV`, "Reno Savings"),
	createSanitizer(`Withdrawal Transfer to \*2588 SAV`, "Reno Savings"),
	createSanitizer(`Deposit MD Tfr from \*0527    SAV`, "Tax Savings"),
	createSanitizer(`Withdrawal Transfer to \*0527 SAV`, "Tax Savings"),
	createSanitizer(`Deposit MD Tfr from \*1054    SAV`, "Car Insurance Savings"),
	createSanitizer(`Withdrawal Transfer to \*1054 SAV`, "Car Insurance Savings"),
	createSanitizer(`Deposit MD Tfr from \*5693    SAV`, "Home Maintenance Savings"),
	createSanitizer(`Withdrawal Transfer to \*5693 SAV`, "Home Maintenance Savings"),
	createSanitizer(`Withdrawal MD Tfr to \*5693   SAV`, "Home Maintenance Savings"),
	// createSanitizer(`Withdrawal Transfer to \*\d+ SAV`, "Savings"),
	createSanitizer(`Bill Payment to 407 ETR`, "407 Toll Road"),
	createSanitizer(`Bill Payment to Mastercard`, "Mastercard"),
	createSanitizer(`Bill Payment to Enova`, "Hydro"),
	createSanitizer(`Electronic Deposit Payroll`, "Income"),
	createSanitizer(`Automobile Rent/Leases`, "Car Lease"),
	createSanitizer(`Insurance CUMIS / CLIC`, "Mortgage Insurance"),
	createSanitizer(`Financeit`, "Gutter payment"),
	createSanitizer(`Service Charges`, `Service Charges`),
	createSanitizer(`AFFIRM`, `Affirm`),
	createSanitizer(`SUNLIFE MED INS`, "Benefits"),
	createSanitizer(` Utility Bill Payment City of Kitchener \d+`, "Water & Gas"),
	createSanitizer(`Bill Payment to Kitchener    Taxes`, "Property Taxes"),
	createSanitizer(`Electronic Deposit CANADA`, "Govt"),
	createSanitizer(`Electronic Deposit Tax       Refunds CANADA`, "Taxes"),
	createSanitizer(`Descriptive Withdrawal       Online Pmt To Canada Revenue Agency`, "Taxes"),
	createSanitizer(`Non-sufficient Funds Fee`, "Bank Fee"),
	createSanitizer(`Electronic Deposit           Miscellaneous Payments CSI`, "Savings"),
	createSanitizer(`Electronic Withdrawal        Miscellaneous Payments       GOCARDLESS 0006HFN3B8EH`, "Misc"),
	createSanitizer(`Bill Payment to Qtrade`, "Investments + TFSA"),
}

type Merchant string

func (m Merchant) Contains(value string) bool {

	re := regexp.MustCompile("(?i)" + value)

	return re.MatchString(string(m))

}

func sanitizeMerchanName(name Merchant) Merchant {

	var result Merchant = ""

	for _, sanitizer := range sanitizerFns {
		result = sanitizer(name)

		if result != "" {
			return Merchant(result)
		}
	}

	log.Println("WARN: Cannot find", name)
	return "N/A"

}

func handleETransfer(name Merchant) Merchant {

	if name.Contains("etransfer") {
		result := strings.Split(string(name), ":")

		return Merchant(strings.Trim(result[1], " "))
	}

	return ""
}

func createSanitizer(filter string, result Merchant) func(Merchant) Merchant {
	return func(name Merchant) Merchant {
		if name.Contains(filter) {
			return result
		}

		return ""
	}
}
