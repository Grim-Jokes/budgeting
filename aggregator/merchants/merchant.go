package merchants

import (
	"aggregator/categories"
	"regexp"
)

func (m Merchant) Contains(value string) bool {

	re := regexp.MustCompile("(?i)" + value)

	return re.MatchString(string(m))
}

var merchantCategories = MerchantCategoryMap{
	AAndW:                categories.Other,
	Amazon:               categories.Other,
	Accountant:           categories.Other,
	Angels:               categories.Other,
	AnimalHospital:       categories.Other,
	ArabellaPark:         categories.Other,
	Beertown:             categories.Other,
	BenjaminTreeFarm:     categories.Other,
	BingmenasCamping:     categories.Other,
	Bitwarden:            categories.Other,
	Blizzard:             categories.Other,
	BusanBBQ:             categories.Other,
	Camping:              categories.Other,
	CanadianTire:         categories.Other,
	CanadianTireGas:      categories.Other,
	CarInsurance:         categories.Other,
	CarMaintenance:       categories.Other,
	ChristmasTree:        categories.Other,
	Costco:               categories.Other,
	CostcoGas:            categories.Other,
	CovenantCafe:         categories.Other,
	CrateAndBarel:        categories.Other,
	Dentist:              categories.Other,
	Disney:               categories.Other,
	Dollarama:            categories.Other,
	DomainName:           categories.Other,
	Dominos:              categories.Other,
	DSpotDessertCaffe:    categories.Other,
	Esso:                 categories.Other,
	EthernetInstallation: categories.Other,
	EyeDoctor:            categories.Other,
	Eurofood:             categories.Other,
	FoodBasics:           categories.Other,
	FunVilla:             categories.Other,
	Garmin:               categories.Other,
	Gardening:            categories.Other,
	GiantTiger:           categories.Other,
	GinosPizza:           categories.Other,
	Gog:                  categories.Other,
	Google:               categories.Other,
	Grammarly:            categories.Other,
	GreatClips:           categories.Other,
	GreatWolfLodge:       categories.Other,
	GroceryDelivery:      categories.Other,
	Health:               categories.Other,
	HomeDepot:            categories.Other,
	HomeInsurance:        categories.Other,
	Hospital:             categories.Other,
	HumanSociety:         categories.Other,
	IceCream:             categories.Other,
	Ikea:                 categories.Other,
	Interest:             categories.Other,
	InterestAdjustment:   categories.Other,
	IshAndChips:          categories.Other,
	Jagex:                categories.Other,
	Jinzakaya:            categories.Other,
	JohnnyFresco:         categories.Other,
	KidsActivities:       categories.Other,
	KidsSchool:           categories.Other,
	Landmark:             categories.Other,
	LaLola:               categories.Other,
	Lazees:               categories.Other,
	MandMGroceries:       categories.Other,
	McDonalds:            categories.Other,
	MentalHealth:         categories.Other,
	MicrosoftStore:       categories.Other,
	MongolianGrill:       categories.Everyday,
	Montanas:             categories.Other,
	Mortys:               categories.Other,
	MrPretzels:           categories.Other,
	Music:                categories.Other,
	Museum:               categories.Other,
	Netflix:              categories.Other,
	Ubuiquiti:            categories.Other,
	NoFrils:              categories.Other,
	Parking:              categories.Other,
	Pastries:             categories.Other,
	Pazzo:                categories.Other,
	Pet:                  categories.Other,
	PestControl:          categories.Other,
	PetValu:              categories.Other,
	PetroCanada:          categories.Other,
	Phones:               categories.Other,
	PioneerGas:           categories.Other,
	PitaFactory:          categories.Other,
	ProperBarbershop:     categories.Other,
	Qdoba:                categories.Other,
	Restaurant:           categories.Other,
	Restaurants:          categories.Other,
	Rona:                 categories.Other,
	SansoteiRamen:        categories.Everyday,
	Scouts:               categories.Children,
	Shell:                categories.Transportation,
	ShoppersDrugMart:     categories.Everyday,
	SnugHarbour:          categories.Everyday,
	Sobeys:               categories.Everyday,
	Starbucks:            categories.Everyday,
	StateAndMain:         categories.Everyday,
	Steam:                categories.Entertainment,
	Superstore:           categories.Everyday,
	TekSavvy:             categories.Utilities,
	TheFishHut:           categories.Everyday,
	TndTMarket:           categories.Everyday,
	Uber:                 categories.Transportation,
	UberEats:             categories.Everyday,
	Walmart:              categories.Everyday,
	WasteDisposal:        categories.Other,
	Watami:               categories.Everyday,
	WingsUp:              categories.Everyday,
	YoutubeMusic:         categories.Entertainment,
	Zehrs:                categories.Everyday,
}

func (m Merchant) GetCategories() (categories.Category, categories.SubCategory) {

	val, ok := merchantCategories[m]
	if !ok {
		return categories.Other, ""
	}

	return val, ""

}

type Merchant string
type MerchantName string

type MerchantCategoryMap = map[Merchant]categories.Category
type MerchantSubCategoryMap = map[Merchant]categories.Category
