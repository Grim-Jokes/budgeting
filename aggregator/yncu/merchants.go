package yncu

import (
	"aggregator/merchants"
	"strings"
)

var Sanitizers = []merchants.SanitizerFn{
	handleETransfer,
	merchants.CreateSanitizer(`Withdrawal Transfer to \*\d+ MTG`, merchants.MortgageYNCU),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*5229    SAV`, merchants.EmergencySavings),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*5229 SAV`, merchants.EmergencySavings),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*2588    SAV`, merchants.RenoSavings),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*2588 SAV`, merchants.RenoSavings),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*0527    SAV`, merchants.TaxSavings),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*0527 SAV`, merchants.TaxSavings),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*1054    SAV`, merchants.CarInsuranceSavings),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*1054 SAV`, merchants.CarInsuranceSavings),
	merchants.CreateSanitizer(`Deposit MD Tfr from \*5693    SAV`, merchants.HomeMaintenanceSavings),
	merchants.CreateSanitizer(`Withdrawal Transfer to \*5693 SAV`, merchants.HomeMaintenanceSavings),
	merchants.CreateSanitizer(`Withdrawal MD Tfr to \*5693   SAV`, merchants.HomeMaintenanceSavings),
	merchants.CreateSanitizer(`Bill Payment to 407 ETR`, merchants.TollRoad),
	merchants.CreateSanitizer(`Bill Payment to Mastercard`, merchants.Mastercard),
	merchants.CreateSanitizer(`Bill Payment to Enova`, merchants.Hydro),
	merchants.CreateSanitizer(`Electronic Deposit Payroll`, merchants.Income),
	merchants.CreateSanitizer(`Automobile Rent/Leases`, merchants.CarLease),
	merchants.CreateSanitizer(`Insurance CUMIS / CLIC`, merchants.MortgageInsurance),
	merchants.CreateSanitizer(`Financeit`, merchants.GutterPayment),
	merchants.CreateSanitizer(`Service Charges`, merchants.BankFee),
	merchants.CreateSanitizer(`AFFIRM`, merchants.Affirm),
	merchants.CreateSanitizer(`SUNLIFE MED INS`, "Benefits"),
	merchants.CreateSanitizer(` Utility Bill Payment City of Kitchener \d+`, merchants.WaterAndGas),
	merchants.CreateSanitizer(`Bill Payment to Kitchener    Taxes`, merchants.PropertyTaxes),
	merchants.CreateSanitizer(`Electronic Deposit CANADA`, merchants.Govt),
	merchants.CreateSanitizer(`Electronic Deposit Tax       Refunds CANADA`, merchants.Taxes),
	merchants.CreateSanitizer(`Descriptive Withdrawal       Online Pmt To Canada Revenue Agency`, merchants.Taxes),
	merchants.CreateSanitizer(`Non-sufficient Funds Fee`, merchants.BankFee),
	merchants.CreateSanitizer(`Electronic Deposit           Miscellaneous Payments CSI`, merchants.SavingsWithdrawal),
	merchants.CreateSanitizer(`Electronic Withdrawal        Miscellaneous Payments       GOCARDLESS 0006HFN3B8EH`, merchants.Misc),
	merchants.CreateSanitizer(`Bill Payment to Qtrade`, merchants.InvestmentsAndTFSA),
}

func handleETransfer(name merchants.Merchant) merchants.Merchant {

	if name.Contains("etransfer") {
		result := strings.Split(string(name), ":")

		return merchants.Merchant(strings.Trim(result[1], " "))
	}

	return ""
}
