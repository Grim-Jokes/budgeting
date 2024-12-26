package parsing

import (
	"aggregator/categories"
	"aggregator/merchants"
	"aggregator/money"
	"time"
)

type ParserFn = func([]string) *RecordResult

type RecordResult struct {
	Merchant         merchants.Merchant
	DepositAmount    money.Money
	WithdrawalAmount money.Money
	Date             time.Time
}

func (r *RecordResult) Categorize() (categories.Category, categories.SubCategory) {

	category, ok := merchantCategories[r.Merchant]
	subCategory, ok1 := merchantSubCategories[r.Merchant]

	if !ok {
		return categories.Other, ""
	}

	if ok && !ok1 {
		return category, ""
	}

	return category, categories.SubCategory(subCategory)
}

var merchantCategories = MerchantCategoryMap{
	merchants.AAndW:                categories.Technology,
	merchants.Amazon:               categories.Technology,
	merchants.Accountant:           categories.Other,
	merchants.Angels:               categories.Everyday,
	merchants.AnimalHospital:       categories.Pets,
	merchants.ArabellaPark:         categories.Everyday,
	merchants.Beertown:             categories.Everyday,
	merchants.BenjaminTreeFarm:     categories.Entertainment,
	merchants.Bingmenas:            categories.Children,
	merchants.BingmenasCamping:     categories.Entertainment,
	merchants.Bitwarden:            categories.Technology,
	merchants.Blizzard:             categories.Entertainment,
	merchants.BusanBBQ:             categories.Everyday,
	merchants.Camping:              categories.Entertainment,
	merchants.CanadianTire:         categories.Home,
	merchants.CanadianTireGas:      categories.Transportation,
	merchants.CarInsurance:         categories.Insurance,
	merchants.CarMaintenance:       categories.Transportation,
	merchants.Costco:               categories.Everyday,
	merchants.CostcoGas:            categories.Transportation,
	merchants.CovenantCafe:         categories.Everyday,
	merchants.CrateAndBarel:        categories.Gifts,
	merchants.Dentist:              categories.HealthAndmedical,
	merchants.Disney:               categories.Entertainment,
	merchants.Dollarama:            categories.Home,
	merchants.DomainName:           categories.Technology,
	merchants.Dominos:              categories.Everyday,
	merchants.DSpotDessertCaffe:    categories.Everyday,
	merchants.Esso:                 categories.Transportation,
	merchants.EthernetInstallation: categories.Home,
	merchants.EyeDoctor:            categories.HealthAndmedical,
	merchants.Eurofood:             categories.Everyday,
	merchants.FoodBasics:           categories.Everyday,
	merchants.FunVilla:             categories.Children,
	merchants.Garmin:               categories.Technology,
	merchants.Gardening:            categories.Home,
	merchants.GiantTiger:           categories.Everyday,
	merchants.GinosPizza:           categories.Everyday,
	merchants.Gog:                  categories.Entertainment,
	merchants.Google:               categories.Technology,
	merchants.Grammarly:            categories.Technology,
	merchants.GreatClips:           categories.Everyday,
	merchants.GreatWolfLodge:       categories.Children,
	merchants.GroceryDelivery:      categories.Everyday,
	merchants.HomeDepot:            categories.Home,
	merchants.HomeInsurance:        categories.Insurance,
	merchants.Hospital:             categories.HealthAndmedical,
	merchants.HumanSociety:         categories.Pets,
	merchants.IceCream:             categories.Everyday,
	merchants.Ikea:                 categories.Home,
	merchants.Interest:             categories.Debt,
	merchants.InterestAdjustment:   categories.Debt,
	merchants.IshAndChips:          categories.Everyday,
	merchants.Jagex:                categories.Entertainment,
	merchants.Jinzakaya:            categories.Everyday,
	merchants.JohnnyFresco:         categories.Everyday,
	merchants.KidsSchool:           categories.Children,
	merchants.Landmark:             categories.Entertainment,
	merchants.LaLola:               categories.Everyday,
	merchants.Lazees:               categories.Everyday,
	merchants.MandMGroceries:       categories.Everyday,
	merchants.McDonalds:            categories.Everyday,
	merchants.MentalHealth:         categories.HealthAndmedical,
	merchants.MicrosoftStore:       categories.Entertainment,
	merchants.MongolianGrill:       categories.Everyday,
	merchants.Montanas:             categories.Everyday,
	merchants.Mortys:               categories.Everyday,
	merchants.MrPretzels:           categories.Everyday,
	merchants.Museum:               categories.Children,
	merchants.Netflix:              categories.Entertainment,
	merchants.Ubuiquiti:            categories.Home,
	merchants.NoFrils:              categories.Everyday,
	merchants.Parking:              categories.Transportation,
	merchants.Pastries:             categories.Everyday,
	merchants.Pazzo:                categories.Everyday,
	merchants.Pet:                  categories.Pets,
	merchants.PestControl:          categories.Home,
	merchants.PetValu:              categories.Pets,
	merchants.PetroCanada:          categories.Transportation,
	merchants.Phones:               categories.Utilities,
	merchants.PioneerGas:           categories.Transportation,
	merchants.PitaFactory:          categories.Everyday,
	merchants.ProperBarbershop:     categories.Everyday,
	merchants.Qdoba:                categories.Everyday,
	merchants.Rona:                 categories.Home,
	merchants.SansoteiRamen:        categories.Everyday,
	merchants.Scouts:               categories.Children,
	merchants.Shell:                categories.Transportation,
	merchants.ShoppersDrugMart:     categories.HealthAndmedical,
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
	merchants.WasteDisposal:        categories.Home,
	merchants.Watami:               categories.Everyday,
	merchants.WingsUp:              categories.Everyday,
	merchants.YoutubeMusic:         categories.Entertainment,
	merchants.Zehrs:                categories.Everyday,
	merchants.RenoSavings:          categories.Home,
	merchants.ActKitchener:         categories.Children,
	merchants.MortgageYNCU:         categories.Home,
	merchants.MilestonesGrill:      categories.Everyday,

	merchants.CarInsuranceSavings:    categories.Insurance,
	merchants.HomeMaintenanceSavings: categories.Home,
	merchants.TollRoad:               categories.Transportation,
	merchants.Hydro:                  categories.Utilities,
	merchants.CarLease:               categories.Transportation,
	merchants.MortgageInsurance:      categories.Insurance,
	merchants.GutterPayment:          categories.Home,
	merchants.BankFee:                categories.Other,
	merchants.Affirm:                 categories.Debt,
	merchants.WaterAndGas:            categories.Utilities,
	merchants.PropertyTaxes:          categories.Home,
	merchants.Govt:                   categories.Debt,
	merchants.Taxes:                  categories.Debt,
	merchants.SavingsWithdrawal:      categories.Income,

	merchants.Income: categories.Income,

	merchants.EmergencySavings:   categories.Savings,
	merchants.TaxSavings:         categories.Savings,
	merchants.InvestmentsAndTFSA: categories.Savings,
}

var merchantSubCategories = MerchantSubCategoryMap{
	// Savings
	merchants.InvestmentsAndTFSA: categories.Investments,

	// Home
	merchants.CanadianTire:         categories.HomeOther,
	merchants.Dollarama:            categories.HomeOther,
	merchants.EthernetInstallation: categories.Improvements,
	merchants.Gardening:            categories.LawnAndGarden,
	merchants.HomeDepot:            categories.HomeOther,
	merchants.Ikea:                 categories.Furnishings,
	merchants.PestControl:          categories.HomeOther,
	merchants.Rona:                 categories.HomeOther,
	merchants.WasteDisposal:        categories.HomeOther,
	merchants.RenoSavings:          categories.Improvements,
	merchants.MortgageYNCU:         categories.Mortgage,
	merchants.Ubuiquiti:            categories.Improvements,
	merchants.GutterPayment:        categories.Improvements,
	merchants.PropertyTaxes:        categories.PropertyTaxes,

	// Transportation
	merchants.CanadianTireGas: categories.Fuel,
	merchants.CarMaintenance:  categories.Repairs,
	merchants.CostcoGas:       categories.Fuel,
	merchants.Esso:            categories.Fuel,
	merchants.Parking:         categories.Fuel,
	merchants.PetroCanada:     categories.Fuel,
	merchants.PioneerGas:      categories.Fuel,
	merchants.Shell:           categories.Fuel,
	merchants.Uber:            categories.Fuel,
	merchants.CarLease:        categories.CarPayments,
	merchants.TollRoad:        categories.TransportationOther,

	// Children
	merchants.FunVilla:       categories.Activities,
	merchants.GreatWolfLodge: categories.Activities,
	merchants.Bingmenas:      categories.Activities,
	merchants.KidsSchool:     categories.School,
	merchants.Museum:         categories.Activities,
	merchants.Scouts:         categories.Activities,
	merchants.ActKitchener:   categories.Activities,

	// Debt
	merchants.Interest:           categories.CreditCards,
	merchants.InterestAdjustment: categories.CreditCards,
	merchants.Govt:               categories.DebtOther,
	merchants.Taxes:              categories.Taxes,

	// Utilitiers
	merchants.HomeMaintenanceSavings: categories.Maintenance,
	merchants.Phones:                 categories.Phone,
	merchants.TekSavvy:               categories.Internet,
	merchants.Hydro:                  categories.Electricity,
	merchants.WaterAndGas:            categories.HeatAndWater,

	merchants.Affirm: categories.DebtOther,

	// Health
	merchants.ShoppersDrugMart: categories.Pharmacy,
	merchants.Dentist:          categories.DoctorsDentalVision,
	merchants.MentalHealth:     categories.OtherMedical,

	// Every Day
	merchants.AAndW:             categories.Restaurants,
	merchants.Angels:            categories.Restaurants,
	merchants.ArabellaPark:      categories.Restaurants,
	merchants.Beertown:          categories.Restaurants,
	merchants.BusanBBQ:          categories.Restaurants,
	merchants.CovenantCafe:      categories.Restaurants,
	merchants.Dominos:           categories.Restaurants,
	merchants.DSpotDessertCaffe: categories.Restaurants,
	merchants.FoodBasics:        categories.Restaurants,
	merchants.GiantTiger:        categories.Restaurants,
	merchants.GinosPizza:        categories.Restaurants,
	merchants.IceCream:          categories.Restaurants,
	merchants.IshAndChips:       categories.Restaurants,
	merchants.Jinzakaya:         categories.Restaurants,
	merchants.JohnnyFresco:      categories.Restaurants,
	merchants.LaLola:            categories.Restaurants,
	merchants.MandMGroceries:    categories.Restaurants,
	merchants.McDonalds:         categories.Restaurants,
	merchants.MongolianGrill:    categories.Restaurants,
	merchants.Montanas:          categories.Restaurants,
	merchants.Mortys:            categories.Restaurants,
	merchants.MrPretzels:        categories.Restaurants,
	merchants.NoFrils:           categories.Restaurants,
	merchants.Pastries:          categories.Restaurants,
	merchants.Pazzo:             categories.Restaurants,
	merchants.PitaFactory:       categories.Restaurants,
	merchants.Qdoba:             categories.Restaurants,
	merchants.SansoteiRamen:     categories.Restaurants,
	merchants.SnugHarbour:       categories.Restaurants,
	merchants.Starbucks:         categories.Restaurants,
	merchants.StateAndMain:      categories.Restaurants,
	merchants.TheFishHut:        categories.Restaurants,
	merchants.TndTMarket:        categories.Restaurants,
	merchants.UberEats:          categories.Restaurants,
	merchants.Watami:            categories.Restaurants,
	merchants.WingsUp:           categories.Restaurants,
	merchants.Lazees:            categories.Restaurants,
	merchants.MilestonesGrill:   categories.Restaurants,

	merchants.Walmart:         categories.Groceries,
	merchants.Sobeys:          categories.Groceries,
	merchants.Superstore:      categories.Groceries,
	merchants.Zehrs:           categories.Groceries,
	merchants.Costco:          categories.Groceries,
	merchants.GroceryDelivery: categories.Groceries,
	merchants.Eurofood:        categories.Groceries,

	merchants.GreatClips:       categories.HairAndbeauty,
	merchants.ProperBarbershop: categories.HairAndbeauty,

	// Insurance
	merchants.CarInsurance:        categories.Car,
	merchants.HomeInsurance:       categories.HomeInsurance,
	merchants.CarInsuranceSavings: categories.Car,
	merchants.MortgageInsurance:   categories.OtherInsurance,

	// Enterntainment
	merchants.BingmenasCamping: categories.OutdoorActivities,
	merchants.Blizzard:         categories.Games,
	merchants.Disney:           categories.TV,
	merchants.Gog:              categories.Games,
	merchants.Jagex:            categories.Games,
	merchants.Landmark:         categories.Movies,
	merchants.MicrosoftStore:   categories.Games,
	merchants.Netflix:          categories.TV,
	merchants.Steam:            categories.Games,
	merchants.YoutubeMusic:     categories.Music,
	merchants.BenjaminTreeFarm: categories.OutdoorActivities,

	merchants.Income: categories.Pay,

	// Pets
	merchants.AnimalHospital: categories.Vet,
	merchants.PetValu:        categories.PetToys,
	merchants.HumanSociety:   categories.PetOther,

	// Tech
	merchants.Amazon:     categories.OnlineServices,
	merchants.Bitwarden:  categories.Subscriptions,
	merchants.DomainName: categories.DomainsAndHosting,
	merchants.Garmin:     categories.Hardware,
	merchants.Google:     categories.OnlineServices,
	merchants.Grammarly:  categories.OnlineServices,

	// Income
	merchants.SavingsWithdrawal: categories.Investments,

	// Other
	merchants.BankFee: categories.BankFees,
}

type MerchantCategoryMap = map[merchants.Merchant]categories.Category
type MerchantSubCategoryMap = map[merchants.Merchant]categories.SubCategory
