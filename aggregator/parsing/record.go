package parsing

import (
	"aggregator/categories"
	"aggregator/merchants"
	"aggregator/money"
)

type ParserFn = func([]string) *RecordResult

type RecordResult struct {
	Merchant         merchants.Merchant
	DepositAmount    money.Money
	WithdrawalAmount money.Money
}

func (r *RecordResult) Categorize() (categories.Category, categories.SubCategory) {

	val, ok := merchantCategories[r.Merchant]

	if !ok {
		return categories.Other, ""
	}

	return val, ""
}

var merchantCategories = MerchantCategoryMap{
	merchants.AAndW:                categories.Other,
	merchants.Amazon:               categories.Other,
	merchants.Accountant:           categories.Other,
	merchants.Angels:               categories.Other,
	merchants.AnimalHospital:       categories.Other,
	merchants.ArabellaPark:         categories.Other,
	merchants.Beertown:             categories.Other,
	merchants.BenjaminTreeFarm:     categories.Other,
	merchants.BingmenasCamping:     categories.Other,
	merchants.Bitwarden:            categories.Other,
	merchants.Blizzard:             categories.Other,
	merchants.BusanBBQ:             categories.Other,
	merchants.Camping:              categories.Other,
	merchants.CanadianTire:         categories.Other,
	merchants.CanadianTireGas:      categories.Other,
	merchants.CarInsurance:         categories.Other,
	merchants.CarMaintenance:       categories.Other,
	merchants.ChristmasTree:        categories.Other,
	merchants.Costco:               categories.Other,
	merchants.CostcoGas:            categories.Other,
	merchants.CovenantCafe:         categories.Other,
	merchants.CrateAndBarel:        categories.Other,
	merchants.Dentist:              categories.Other,
	merchants.Disney:               categories.Other,
	merchants.Dollarama:            categories.Other,
	merchants.DomainName:           categories.Other,
	merchants.Dominos:              categories.Other,
	merchants.DSpotDessertCaffe:    categories.Other,
	merchants.Esso:                 categories.Other,
	merchants.EthernetInstallation: categories.Other,
	merchants.EyeDoctor:            categories.Other,
	merchants.Eurofood:             categories.Other,
	merchants.FoodBasics:           categories.Other,
	merchants.FunVilla:             categories.Other,
	merchants.Garmin:               categories.Other,
	merchants.Gardening:            categories.Other,
	merchants.GiantTiger:           categories.Other,
	merchants.GinosPizza:           categories.Other,
	merchants.Gog:                  categories.Other,
	merchants.Google:               categories.Other,
	merchants.Grammarly:            categories.Other,
	merchants.GreatClips:           categories.Other,
	merchants.GreatWolfLodge:       categories.Other,
	merchants.GroceryDelivery:      categories.Other,
	merchants.Health:               categories.Other,
	merchants.HomeDepot:            categories.Other,
	merchants.HomeInsurance:        categories.Other,
	merchants.Hospital:             categories.Other,
	merchants.HumanSociety:         categories.Other,
	merchants.IceCream:             categories.Other,
	merchants.Ikea:                 categories.Other,
	merchants.Interest:             categories.Other,
	merchants.InterestAdjustment:   categories.Other,
	merchants.IshAndChips:          categories.Other,
	merchants.Jagex:                categories.Other,
	merchants.Jinzakaya:            categories.Other,
	merchants.JohnnyFresco:         categories.Other,
	merchants.KidsActivities:       categories.Other,
	merchants.KidsSchool:           categories.Other,
	merchants.Landmark:             categories.Other,
	merchants.LaLola:               categories.Other,
	merchants.Lazees:               categories.Other,
	merchants.MandMGroceries:       categories.Other,
	merchants.McDonalds:            categories.Other,
	merchants.MentalHealth:         categories.Other,
	merchants.MicrosoftStore:       categories.Other,
	merchants.MongolianGrill:       categories.Everyday,
	merchants.Montanas:             categories.Other,
	merchants.Mortys:               categories.Other,
	merchants.MrPretzels:           categories.Other,
	merchants.Music:                categories.Other,
	merchants.Museum:               categories.Other,
	merchants.Netflix:              categories.Other,
	merchants.Ubuiquiti:            categories.Other,
	merchants.NoFrils:              categories.Other,
	merchants.Parking:              categories.Other,
	merchants.Pastries:             categories.Other,
	merchants.Pazzo:                categories.Other,
	merchants.Pet:                  categories.Other,
	merchants.PestControl:          categories.Other,
	merchants.PetValu:              categories.Other,
	merchants.PetroCanada:          categories.Other,
	merchants.Phones:               categories.Other,
	merchants.PioneerGas:           categories.Other,
	merchants.PitaFactory:          categories.Other,
	merchants.ProperBarbershop:     categories.Other,
	merchants.Qdoba:                categories.Other,
	merchants.Restaurant:           categories.Other,
	merchants.Restaurants:          categories.Other,
	merchants.Rona:                 categories.Other,
	merchants.SansoteiRamen:        categories.Everyday,
	merchants.Scouts:               categories.Children,
	merchants.Shell:                categories.Transportation,
	merchants.ShoppersDrugMart:     categories.Everyday,
	merchants.SnugHarbour:          categories.Everyday,
	merchants.Sobeys:               categories.Everyday,
	merchants.Starbucks:            categories.Everyday,
	merchants.StateAndMain:         categories.Everyday,
	merchants.Steam:                categories.Entertainment,
	merchants.Superstore:           categories.Everyday,
	merchants.TekSavvy:             categories.Utilities,
	merchants.TheFishHut:           categories.Everyday,
	merchants.TndTMarket:           categories.Everyday,
	merchants.Uber:                 categories.Transportation,
	merchants.UberEats:             categories.Everyday,
	merchants.Walmart:              categories.Everyday,
	merchants.WasteDisposal:        categories.Other,
	merchants.Watami:               categories.Everyday,
	merchants.WingsUp:              categories.Everyday,
	merchants.YoutubeMusic:         categories.Entertainment,
	merchants.Zehrs:                categories.Everyday,
}

type MerchantCategoryMap = map[merchants.Merchant]categories.Category
type MerchantSubCategoryMap = map[merchants.Merchant]categories.Category
