package merchants

import (
	"log"
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
	createSanitizer(`Amazon`, `Amazon`),
	createSanitizer(`AMZN`, `Amazon`),
	createSanitizer(`costgo gas`, `Gas`),
	createSanitizer(`google`, "Google"),
	createSanitizer(`wingsup!?`, "Take Out"),
	createSanitizer(`Mongolian Grill`, `Restaurant`),
	createSanitizer(`PROPER BARBERSHOP`, `Haircut`),
	createSanitizer(`Mcdonald`, `Restaurant`),
	createSanitizer(`GARMIN`, `Health`),
	createSanitizer(`WAL-?MART`, `Walmart`),
	createSanitizer(`Youtube Music`, `Music`),
	createSanitizer(`PET`, `Pet`),
	createSanitizer(`Animal`, `Vet`),
	createSanitizer(`Petro`, `Gas`),
	createSanitizer(`CERTAS HOME AUTO`, `Home Insurance`),
	createSanitizer(`RCSS #\d+`, `Superstore`),
	createSanitizer(`Disney`, `Disney`),
	createSanitizer(`Waterloo catholic dist`, `Kid's SChool`),
	createSanitizer(`ESSO`, `Gas`),
	createSanitizer(`Netflix`, `NetFlix`),
	createSanitizer(`Costco wholesale`, `Costco`),
	createSanitizer(`Costco gas`, `Gas`),
	createSanitizer(`TSI INTERNET`, `Internet`),
	createSanitizer(`NAME-CHEAP`, `Domain name`),
	createSanitizer(`Parking`, `Parking`),
	createSanitizer(`PITA FACTORY`, `Restaurant`),
	createSanitizer(`GREAT WOLF`, `Great Wolf Lodge`),
	createSanitizer(`Busan`, `Restaurant`),
	createSanitizer(`ASHRAF DENTISTRY`, `Dentist`),
	createSanitizer(`Freedom Mobile`, `Phones`),
	createSanitizer(`GEMINI MOTORS`, `Car Maintenance`),
	createSanitizer(`GOG sp.`, `Video Games`),
	createSanitizer(`ANGEL'S ON WESTMOUNT`, "Restaurant"),
	createSanitizer(`CREMA PASTRY`, `Pastries`),
	createSanitizer(`Bitwarden`, `Bitwarden`),
	createSanitizer(`Microsoft\*Store`, `Video Games`),
	createSanitizer(`SQ \*ISH AND CHIPS`, `Restaurant`),
	createSanitizer(`Benjamin Tree Farm`, `Christmas Tree`),
	createSanitizer(`EXHALE`, `Mental Health`),
	createSanitizer(`UBER CANADA/UBEREATS`, `Take Out`),
	createSanitizer(`FOOD BASICS`, `Food Basics`),
	createSanitizer(`SHOPPERS DRUG MART`, `Drug Mart`),
	createSanitizer(`\*LA LOLA CATERING`, `Restaurant`),
	createSanitizer(`STEAM PURCHASE`, `Video Games`),
	createSanitizer(`PURCHASE INTEREST CHARGE`, `Interest`),
	createSanitizer(`PC EXPRESS`, `Grocery Delivery`),
	createSanitizer(`ABELL PEST CONTROL`, `Pest Control`),
	createSanitizer(`STEAMGAMES\.COM`, `Video Games`),
	createSanitizer(`GLOGOWSKI EURO FOOD`, `Eurofood`),
	createSanitizer(`Starbucks`, `Starbucks`),
	createSanitizer(`WATAMI`, `Restaurants`),
	createSanitizer(`PIONEER \d+`, `Gas`),
	createSanitizer(`PIONEER STN`, `Gas`),
	createSanitizer(`Home depo`, `Home Improvement`),
	createSanitizer(`RONA`, `Home Improvement`),
	createSanitizer(`UBER\* EATS`, `Take Out`),
	createSanitizer(`UBERTRIP`, `Uber`),
	createSanitizer(`UBER\* TRIP`, `Uber`),
	createSanitizer(`DOMINOS`, `Take Out`),
	createSanitizer(`M&M Food`, `M&M (Groceries)`),
	createSanitizer(`MONTANAS COOKHOUSE`, `Restaurant`),
	createSanitizer(`ACT\*KITCHENER`, `Kids Activities`),
	createSanitizer(`Grammarly`, `Grammarly`),
	createSanitizer(`YELLOWBAG`, `Gardening`),
	createSanitizer(`JOHNNY FRESCO`, `Take Out`),
	createSanitizer(`GINO'S PIZZA`, `Take Out`),
	createSanitizer(`Great Clips`, `Haircut`),
	createSanitizer(`GOG.com`, `Video Games`),
	createSanitizer(`Covenant Cafe`, `Restaurant`),
	createSanitizer(`BELAIRDIRECT`, "Car Insurance"),
	createSanitizer(`Sansotei Ramen`, `Restaurant`),
	createSanitizer(`MEADOW ACRES GARDEN`, `Gardening`),
	createSanitizer(`CALIBRE LLP`, `Accountant`),
	createSanitizer(`Canadian tire gas bar`, `Gas`),
	createSanitizer(`canadian tire`, `Home Improvement`),
	createSanitizer(`UBIQUITI`, `Networking Gear`),
	createSanitizer(`KITCHENER WATERLOO HUM`, `Pets`),
	createSanitizer(`THE JMBG NETWORK`, `Ethernet Installation`),
	createSanitizer(`SHELL C`, `Gas`),
	createSanitizer(`T&T SUPERMARKET`, `Groceries`),
	createSanitizer(`JAGEX`, `Video Games`),
	createSanitizer(`Morty's Pub`, `Restaurant`),
	createSanitizer(`State & main`, `Restaurant`),
	createSanitizer(`Grand River Hospital`, `Hospital`),
	createSanitizer(`Giant tiger`, `Groceries`),
	createSanitizer(`\*Arabella park`, `Restaurant`),
	createSanitizer(`\*PAZZO CO`, `Restaurant`),
	createSanitizer(`LAZEEZ SHAWARMA`, `Restaurant`),
	createSanitizer(`ZEHRS`, `Groceries`),
	createSanitizer(`ROCKY MOUNTAIN CHOCOLA`, `Pastries`),
	createSanitizer(`Paul & Mallory's`, `Groceries`),
	createSanitizer(`UBER CANADA`, `Uber`),
	createSanitizer(`LANDMARK`, `Movie Theatre`),
	createSanitizer(`LM Waterloo`, `Movie Theatre`),
	createSanitizer(`DRIFTWOOD FAMILY EYECA`, `Eye Doctor`),
	createSanitizer(`QDOBA MEXICAN EATS`, `Restaurant`),
	createSanitizer(`CRATE AND BARREL`, `Restaurant`),
	createSanitizer(`D SPOT DESSERT CAFFE`, `Restaurant`),
	createSanitizer(`A & W`, `Restaurant`),
	createSanitizer(`THE FISH HUT`, `Take Out`),
	createSanitizer(`JINZAKAYA`, `Restaurant`),
	createSanitizer(`REG WATERLOO LANDFILL`, `Waste Disposal`),
	createSanitizer(`BINGEMANS CAMPING`, `Camping`),
	createSanitizer(`Bingemans`, `Kids Activities`),
	createSanitizer(`BASKIN ROBBINS`, `Ice Cream`),
	createSanitizer(`Sobeys`, `Groceries`),
	createSanitizer(`\*BLIZZARD US`, `Video Games`),
	createSanitizer(`IKEA`, `Furniture`),
	createSanitizer(`SCOUTS CANADA`, `Kid's Activities`),
	createSanitizer(`FUNVILLA`, `Kid's Activities`),
	createSanitizer(`SNUG HARBOUR`, `Restaurant`),
	createSanitizer(`DOLLARAMA`, `Misc`),
	createSanitizer(`Beertown`, `Restaurant`),
	createSanitizer(`Lisboa Bakery`, `Pastries`),
	createSanitizer(`TELZE`, `Phones`),
	createSanitizer(`MR. PRETZELS`, `Take Out`),
	createSanitizer(`KRISPY KREME`, `Pastries`),
	createSanitizer(`INTEREST ADJUSTMENT`, `Interest Adjustment`),
	createSanitizer(`SP ROM COMMERCIAL`, `Kids Activities`),
}

func SanitizeMerchanName(name Merchant) Merchant {

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
