package yncu

import (
	"aggregator/merchants"
	"strings"
)

var Sanitizers = []merchants.SanitizerFn{
	handleETransfer,
	merchants.CreateSanitizer(`Withdrawal Transfer to \*\d+ MTG`, "Mortgage - YNCU"),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*5229    SAV`, "Emergency Savings"),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*5229 SAV`, "Emergency Savings"),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*2588    SAV`, "Reno Savings"),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*2588 SAV`, "Reno Savings"),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*0527    SAV`, "Tax Savings"),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*0527 SAV`, "Tax Savings"),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*1054    SAV`, "Car Insurance Savings"),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*1054 SAV`, "Car Insurance Savings"),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*5693    SAV`, "Home Maintenance Savings"),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*5693 SAV`, "Home Maintenance Savings"),
	merchants.CreateSanitizer(`Withdrawal MD Tfr to \*5693   SAV`, "Home Maintenance Savings"),
	merchants.CreateSanitizer(`Bill Payment to 407 ETR`, "407 Toll Road"),
	merchants.CreateSanitizer(`Bill Payment to Mastercard`, "Mastercard"),
	merchants.CreateSanitizer(`Bill Payment to Enova`, "Hydro"),
	merchants.CreateSanitizer(`Electronic Deposit Payroll`, "Income"),
	merchants.CreateSanitizer(`Automobile Rent/Leases`, "Car Lease"),
	merchants.CreateSanitizer(`Insurance CUMIS / CLIC`, "Mortgage Insurance"),
	merchants.CreateSanitizer(`Financeit`, "Gutter payment"),
	merchants.CreateSanitizer(`Service Charges`, `Service Charges`),
	merchants.CreateSanitizer(`AFFIRM`, `Affirm`),
	merchants.CreateSanitizer(`SUNLIFE MED INS`, "Benefits"),
	merchants.CreateSanitizer(` Utility Bill Payment City of Kitchener \d+`, "Water & Gas"),
	merchants.CreateSanitizer(`Bill Payment to Kitchener    Taxes`, "Property Taxes"),
	merchants.CreateSanitizer(`Electronic Deposit CANADA`, "Govt"),
	merchants.CreateSanitizer(`Electronic Deposit Tax       Refunds CANADA`, "Taxes"),
	merchants.CreateSanitizer(`Descriptive Withdrawal       Online Pmt To Canada Revenue Agency`, "Taxes"),
	merchants.CreateSanitizer(`Non-sufficient Funds Fee`, "Bank Fee"),
	merchants.CreateSanitizer(`Electronic Deposit           Miscellaneous Payments CSI`, "Savings"),
	merchants.CreateSanitizer(`Electronic Withdrawal        Miscellaneous Payments       GOCARDLESS 0006HFN3B8EH`, "Misc"),
	merchants.CreateSanitizer(`Bill Payment to Qtrade`, "Investments + TFSA"),
}

func handleETransfer(name merchants.Merchant) merchants.Merchant {

	if name.Contains("etransfer") {
		result := strings.Split(string(name), ":")

		return merchants.Merchant(strings.Trim(result[1], " "))
	}

	return ""
}
