package mastercard

import "aggregator/merchants"

// Merchant constants
const (
	AAndW                merchants.Merchant = "A&W"
	Amazon               merchants.Merchant = "Amazon"
	Accountant           merchants.Merchant = "Accountant"
	Angels               merchants.Merchant = "Angel's"
	AnimalHospital       merchants.Merchant = "Animal Hospital of Cambridge"
	ArabellaPark         merchants.Merchant = "Arabella Park Restaurant"
	Beertown             merchants.Merchant = "Beertown"
	BenjaminTreeFarm     merchants.Merchant = "Benjamin Tree Farm"
	BingmenasCamping     merchants.Merchant = "Bingemans Camping"
	Bitwarden            merchants.Merchant = "Bitwarden"
	Blizzard             merchants.Merchant = "Blizzard Entertainment"
	BusanBBQ             merchants.Merchant = "Busan Korean BBQ"
	Camping              merchants.Merchant = "Camping"
	CanadianTire         merchants.Merchant = "Canadian Tire"
	CanadianTireGas      merchants.Merchant = "Canadian Tire Gas"
	CarInsurance         merchants.Merchant = "Car Insurance"
	CarMaintenance       merchants.Merchant = "Car Maintenance"
	ChristmasTree        merchants.Merchant = "Christmas Tree"
	Costco               merchants.Merchant = "Costco"
	CostcoGas            merchants.Merchant = "Costco Gas"
	CovenantCafe         merchants.Merchant = "Covenant Cafe"
	CrateAndBarel        merchants.Merchant = "Crate And Barell"
	Dentist              merchants.Merchant = "Dentist"
	Disney               merchants.Merchant = "Disney"
	Dollarama            merchants.Merchant = "Dollarama"
	DomainName           merchants.Merchant = "Domain Name"
	Dominos              merchants.Merchant = "Dominos"
	DSpotDessertCaffe    merchants.Merchant = "D Spot Desert Cafe"
	Esso                 merchants.Merchant = "Esso"
	EthernetInstallation merchants.Merchant = "Ethernet Installation"
	EyeDoctor            merchants.Merchant = "Eye Doctor"
	Eurofood             merchants.Merchant = "Eurofood"
	FoodBasics           merchants.Merchant = "Food Basics"
	FunVilla             merchants.Merchant = "FunVilla"
	Garmin               merchants.Merchant = "Garmin"
	Gardening            merchants.Merchant = "Gardening"
	GiantTiger           merchants.Merchant = "Girant Tiger"
	GinosPizza           merchants.Merchant = "Gina's Pizza"
	Gog                  merchants.Merchant = "GOG"
	Google               merchants.Merchant = "Google"
	Grammarly            merchants.Merchant = "Grammarly"
	GreatClips           merchants.Merchant = "Great Clips"
	GreatWolfLodge       merchants.Merchant = "Great Wolf Lodge"
	Groceries            merchants.Merchant = "Groceries"
	GroceryDelivery      merchants.Merchant = "Grocery Delivery"
	Health               merchants.Merchant = "Health"
	HomeDepot            merchants.Merchant = "Home Depot"
	HomeInsurance        merchants.Merchant = "Home Insurance"
	Hospital             merchants.Merchant = "Hospital"
	HumanSociety         merchants.Merchant = "KW Humane Society"
	IceCream             merchants.Merchant = "Ice Cream"
	Ikea                 merchants.Merchant = "Ikea"
	Interest             merchants.Merchant = "Interest"
	InterestAdjustment   merchants.Merchant = "Interest Adjustment"
	IshAndChips          merchants.Merchant = "Ish and Chips"
	Jagex                merchants.Merchant = "Jagex"
	Jinzakaya            merchants.Merchant = "Jinzakaya"
	JohnnyFresco         merchants.Merchant = "Johnny Fresco"
	KidsActivities       merchants.Merchant = "Kids Activities"
	KidsSchool           merchants.Merchant = "Kid's School"
	Landmark             merchants.Merchant = "Landmark Cinema"
	LaLola               merchants.Merchant = "La Lola"
	Lazees               merchants.Merchant = "Lazees Shawarma"
	MandMGroceries       merchants.Merchant = "M&M (Groceries)"
	McDonalds            merchants.Merchant = "McDonalds"
	MentalHealth         merchants.Merchant = "Mental Health"
	MicrosoftStore       merchants.Merchant = "Microsoft Store"
	Misc                 merchants.Merchant = "Misc"
	MongolianGrill       merchants.Merchant = "Mongolian Grill"
	Montanas             merchants.Merchant = "Montanas"
	Mortys               merchants.Merchant = "Morty's Pub"
	MrPretzels           merchants.Merchant = "Mr Pretzels"
	Music                merchants.Merchant = "Music"
	Museum               merchants.Merchant = "Museum"
	Netflix              merchants.Merchant = "Netflix"
	NetworkingGear       merchants.Merchant = "Networking Gear"
	NoFrils              merchants.Merchant = "No Frills"
	Parking              merchants.Merchant = "Parking"
	Pastries             merchants.Merchant = "Pastries"
	Pazzo                merchants.Merchant = "Pazzor"
	Pet                  merchants.Merchant = "Pet"
	PestControl          merchants.Merchant = "Pest Control"
	PetValu              merchants.Merchant = "Pet Valu"
	PetroCanada          merchants.Merchant = "Petro Canada"
	Phones               merchants.Merchant = "Phones"
	PioneerGas           merchants.Merchant = "Pioneer Gas"
	PitaFactory          merchants.Merchant = "PitaFactory"
	ProperBarbershop     merchants.Merchant = "Proper Barbershop"
	Qdoba                merchants.Merchant = "Qdoba Mexican Eats"
	Restaurant           merchants.Merchant = "Restaurant"
	Restaurants          merchants.Merchant = "Restaurants"
	Rona                 merchants.Merchant = "Rona"
	SansoteiRamen        merchants.Merchant = "Sansotei Ramen"
	Scouts               merchants.Merchant = "Scouts"
	Shell                merchants.Merchant = "Shell"
	ShoppersDrugMart     merchants.Merchant = "Shoppers Drug Mart"
	SnugHarbour          merchants.Merchant = "Snug Harbour"
	Sobeys               merchants.Merchant = "Sobeys"
	Starbucks            merchants.Merchant = "Starbucks"
	StateAndMain         merchants.Merchant = "State & Main Restaurant"
	Steam                merchants.Merchant = "Steam"
	Superstore           merchants.Merchant = "Superstore"
	TakeOut              merchants.Merchant = "Take Out"
	TekSavvy             merchants.Merchant = "TekSavvy"
	TheFishHut           merchants.Merchant = "The Fish Hut"
	TndTMarket           merchants.Merchant = "T&T Market"
	Uber                 merchants.Merchant = "Uber"
	UberEats             merchants.Merchant = "Uber Eats"
	VideoGames           merchants.Merchant = "Video Games"
	Walmart              merchants.Merchant = "Walmart"
	WasteDisposal        merchants.Merchant = "Waste Disposal"
	Watami               merchants.Merchant = "Watami Sushi"
	WingsUp              merchants.Merchant = "WingsUp"
	YoutubeMusic         merchants.Merchant = "Youtube Music"
	Zehrs                merchants.Merchant = "Zehrs"
)

var sanitizerFns = []merchants.SanitizerFn{
	merchants.CreateSanitizer(`Amazon`, Amazon),
	merchants.CreateSanitizer(`AMZN`, Amazon),
	merchants.CreateSanitizer(`costco gas`, CostcoGas),
	merchants.CreateSanitizer(`google`, Google),
	merchants.CreateSanitizer(`wingsup!?`, WingsUp),
	merchants.CreateSanitizer(`Mongolian Grill`, MongolianGrill),
	merchants.CreateSanitizer(`PROPER BARBERSHOP`, ProperBarbershop),
	merchants.CreateSanitizer(`Mcdonald`, McDonalds),
	merchants.CreateSanitizer(`GARMIN`, Garmin),
	merchants.CreateSanitizer(`WAL-?MART`, Walmart),
	merchants.CreateSanitizer(`Youtube Music`, YoutubeMusic),
	merchants.CreateSanitizer(`PET`, PetValu),
	merchants.CreateSanitizer(`ANIMAL HOSPITAL OF CAM`, AnimalHospital),
	merchants.CreateSanitizer(`Petro`, PetroCanada),
	merchants.CreateSanitizer(`CERTAS HOME AUTO`, HomeInsurance),
	merchants.CreateSanitizer(`RCSS #\d+`, Superstore),
	merchants.CreateSanitizer(`Disney`, Disney),
	merchants.CreateSanitizer(`Waterloo catholic dist`, KidsSchool),
	merchants.CreateSanitizer(`ESSO`, Esso),
	merchants.CreateSanitizer(`Netflix`, Netflix),
	merchants.CreateSanitizer(`Costco wholesale`, Costco),
	merchants.CreateSanitizer(`TSI INTERNET`, TekSavvy),
	merchants.CreateSanitizer(`NAME-CHEAP`, DomainName),
	merchants.CreateSanitizer(`Parking`, Parking),
	merchants.CreateSanitizer(`PITA FACTORY`, PitaFactory),
	merchants.CreateSanitizer(`GREAT WOLF`, GreatWolfLodge),
	merchants.CreateSanitizer(`Busan`, BusanBBQ),
	merchants.CreateSanitizer(`ASHRAF DENTISTRY`, Dentist),
	merchants.CreateSanitizer(`Freedom Mobile`, Phones),
	merchants.CreateSanitizer(`GEMINI MOTORS`, CarMaintenance),
	merchants.CreateSanitizer(`GOG sp.`, Gog),
	merchants.CreateSanitizer(`ANGEL'S ON WESTMOUNT`, Angels),
	merchants.CreateSanitizer(`CREMA PASTRY`, Pastries),
	merchants.CreateSanitizer(`Bitwarden`, Bitwarden),
	merchants.CreateSanitizer(`Microsoft\*Store`, MicrosoftStore),
	merchants.CreateSanitizer(`SQ \*ISH AND CHIPS`, IshAndChips),
	merchants.CreateSanitizer(`Benjamin Tree Farm`, BenjaminTreeFarm),
	merchants.CreateSanitizer(`EXHALE`, MentalHealth),
	merchants.CreateSanitizer(`UBER CANADA/UBEREATS`, UberEats),
	merchants.CreateSanitizer(`FOOD BASICS`, FoodBasics),
	merchants.CreateSanitizer(`SHOPPERS DRUG MART`, ShoppersDrugMart),
	merchants.CreateSanitizer(`\*LA LOLA CATERING`, LaLola),
	merchants.CreateSanitizer(`STEAM PURCHASE`, Steam),
	merchants.CreateSanitizer(`PURCHASE INTEREST CHARGE`, Interest),
	merchants.CreateSanitizer(`PC EXPRESS`, GroceryDelivery),
	merchants.CreateSanitizer(`ABELL PEST CONTROL`, PestControl),
	merchants.CreateSanitizer(`STEAMGAMES\.COM`, Steam),
	merchants.CreateSanitizer(`GLOGOWSKI EURO FOOD`, Eurofood),
	merchants.CreateSanitizer(`Starbucks`, Starbucks),
	merchants.CreateSanitizer(`WATAMI`, Watami),
	merchants.CreateSanitizer(`PIONEER \d+`, PioneerGas),
	merchants.CreateSanitizer(`PIONEER STN`, PioneerGas),
	merchants.CreateSanitizer(`Home depot`, HomeDepot),
	merchants.CreateSanitizer(`RONA`, Rona),
	merchants.CreateSanitizer(`UBER\* EATS`, UberEats),
	merchants.CreateSanitizer(`UBERTRIP`, Uber),
	merchants.CreateSanitizer(`UBER\* TRIP`, Uber),
	merchants.CreateSanitizer(`DOMINOS`, Dominos),
	merchants.CreateSanitizer(`M&M Food`, MandMGroceries),
	merchants.CreateSanitizer(`MONTANAS COOKHOUSE`, Montanas),
	merchants.CreateSanitizer(`ACT\*KITCHENER`, KidsActivities),
	merchants.CreateSanitizer(`Grammarly`, Grammarly),
	merchants.CreateSanitizer(`YELLOWBAG`, Gardening),
	merchants.CreateSanitizer(`JOHNNY FRESCO`, JohnnyFresco),
	merchants.CreateSanitizer(`GINO'S PIZZA`, GinosPizza),
	merchants.CreateSanitizer(`Great Clips`, GreatClips),
	merchants.CreateSanitizer(`GOG\.com`, Gog),
	merchants.CreateSanitizer(`Covenant Cafe`, CovenantCafe),
	merchants.CreateSanitizer(`BELAIRDIRECT`, CarInsurance),
	merchants.CreateSanitizer(`Sansotei Ramen`, SansoteiRamen),
	merchants.CreateSanitizer(`MEADOW ACRES GARDEN`, Gardening),
	merchants.CreateSanitizer(`CALIBRE LLP`, Accountant),
	merchants.CreateSanitizer(`Canadian tire gas bar`, CanadianTireGas),
	merchants.CreateSanitizer(`canadian tire`, CanadianTire),
	merchants.CreateSanitizer(`UBIQUITI`, NetworkingGear),
	merchants.CreateSanitizer(`KITCHENER WATERLOO HUM`, HumanSociety),
	merchants.CreateSanitizer(`THE JMBG NETWORK`, EthernetInstallation),
	merchants.CreateSanitizer(`SHELL C`, Shell),
	merchants.CreateSanitizer(`T&T SUPERMARKET`, TndTMarket),
	merchants.CreateSanitizer(`JAGEX`, Jagex),
	merchants.CreateSanitizer(`Morty's Pub`, Mortys),
	merchants.CreateSanitizer(`State & main`, StateAndMain),
	merchants.CreateSanitizer(`Grand River Hospital`, Hospital),
	merchants.CreateSanitizer(`Giant tiger`, Groceries),
	merchants.CreateSanitizer(`\*Arabella park`, ArabellaPark),
	merchants.CreateSanitizer(`\*PAZZO CO`, Pazzo),
	merchants.CreateSanitizer(`LAZEEZ SHAWARMA`, Lazees),
	merchants.CreateSanitizer(`ZEHRS`, Zehrs),
	merchants.CreateSanitizer(`ROCKY MOUNTAIN CHOCOLA`, Pastries),
	merchants.CreateSanitizer(`Paul & Mallory's`, NoFrils),
	merchants.CreateSanitizer(`UBER CANADA`, Uber),
	merchants.CreateSanitizer(`LANDMARK`, Landmark),
	merchants.CreateSanitizer(`LM Waterloo`, Landmark),
	merchants.CreateSanitizer(`DRIFTWOOD FAMILY EYECA`, EyeDoctor),
	merchants.CreateSanitizer(`QDOBA MEXICAN EATS`, Qdoba),
	merchants.CreateSanitizer(`CRATE AND BARREL`, CrateAndBarel),
	merchants.CreateSanitizer(`D SPOT DESSERT CAFFE`, DSpotDessertCaffe),
	merchants.CreateSanitizer(`A & W`, AAndW),
	merchants.CreateSanitizer(`THE FISH HUT`, TheFishHut),
	merchants.CreateSanitizer(`JINZAKAYA`, Jinzakaya),
	merchants.CreateSanitizer(`REG WATERLOO LANDFILL`, WasteDisposal),
	merchants.CreateSanitizer(`BINGEMANS CAMPING`, BingmenasCamping),
	merchants.CreateSanitizer(`Bingemans`, KidsActivities),
	merchants.CreateSanitizer(`BASKIN ROBBINS`, IceCream),
	merchants.CreateSanitizer(`Sobeys`, Sobeys),
	merchants.CreateSanitizer(`\*BLIZZARD US`, Blizzard),
	merchants.CreateSanitizer(`IKEA`, Ikea),
	merchants.CreateSanitizer(`SCOUTS CANADA`, Scouts),
	merchants.CreateSanitizer(`FUNVILLA`, FunVilla),
	merchants.CreateSanitizer(`SNUG HARBOUR`, SnugHarbour),
	merchants.CreateSanitizer(`DOLLARAMA`, Dollarama),
	merchants.CreateSanitizer(`Beertown`, Restaurant),
	merchants.CreateSanitizer(`Lisboa Bakery`, Pastries),
	merchants.CreateSanitizer(`TELZE`, Phones),
	merchants.CreateSanitizer(`MR. PRETZELS`, MrPretzels),
	merchants.CreateSanitizer(`KRISPY KREME`, Pastries),
	merchants.CreateSanitizer(`INTEREST ADJUSTMENT`, InterestAdjustment),
	merchants.CreateSanitizer(`SP ROM COMMERCIAL`, Museum),
}
