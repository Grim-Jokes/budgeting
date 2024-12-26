package categories

type Category string

type SubCategory string

const (
	Children         Category = "Children"
	Debt             Category = "Debt"
	Education        Category = "Education"
	Entertainment    Category = "Entertainment"
	Everyday         Category = "Everyday"
	Gifts            Category = "Gifts"
	HealthAndmedical Category = "Health/medical"
	Home             Category = "Home"
	Insurance        Category = "Insurance"
	Pets             Category = "Pets"
	Technology       Category = "Technology"
	Transportation   Category = "Transportation"
	Travel           Category = "Travel"
	Utilities        Category = "Utilities"
	Other            Category = "Other"
	Savings          Category = "Savings"
)

const (
	Income Category = "Income"
)

// Income
const (
	Pay         SubCategory = "Pay"
	OtherIncome SubCategory = "Other Income"
)

// Savings
const (
	Investments SubCategory = "Investments"
)

// Children
const (
	Activities    SubCategory = "Activities"
	Allowance     SubCategory = "Allowance"
	Medical       SubCategory = "Medical"
	Childcare     SubCategory = "Childcare"
	Clothing      SubCategory = "Clothing"
	School        SubCategory = "School"
	Toys          SubCategory = "Toys"
	ChildrenOther SubCategory = "Children Other"
)

// EveryDay
const (
	Groceries        SubCategory = "Groceries"
	Restaurants      SubCategory = "Restaurants"
	PersonalSupplies SubCategory = "Personal supplies"
	Clothes          SubCategory = "Clothes"
	Laundry          SubCategory = "Laundry/dry cleaning"
	HairAndbeauty    SubCategory = "Hair/beauty"
	Subscriptions    SubCategory = "Subscriptions"
	EveryDayOther    SubCategory = "EVerydayy Other"
)

// Debt
const (
	CreditCards SubCategory = "Credit Cards"
	Loands      SubCategory = "Loans"
	Taxes       SubCategory = "Taxes"
	DebtOther   SubCategory = "Debt Other"
)

// Home
const (
	Mortgage      SubCategory = "Rent/mortgage"
	PropertyTaxes SubCategory = "Property taxes"
	Furnishings   SubCategory = "Furnishings"
	LawnAndGarden SubCategory = "Lawn/garden"
	HomeSupplies  SubCategory = "Home Supplies"
	Maintenance   SubCategory = "Maintenance"
	Improvements  SubCategory = "Improvements"
	Moving        SubCategory = "Moving"
	HomeOther     SubCategory = "Home Other"
)

// Transportation
const (
	Fuel                   SubCategory = "Fuel"
	CarPayments            SubCategory = "Car payments"
	Repairs                SubCategory = "Repairs"
	License                SubCategory = "Registration/license"
	TransportationSupplies SubCategory = "Transportation Supplies"
	PublicTransit          SubCategory = "Public transit"
	TransportationOther    SubCategory = "Transportation Other"
)

// Insurance
const (
	Car            SubCategory = "Car"
	Health         SubCategory = "Health"
	HomeInsurance  SubCategory = "Home"
	Life           SubCategory = "Life"
	OtherInsurance SubCategory = "Other"
)

// Utilities
const (
	Phone          SubCategory = "Phone"
	TVUtility      SubCategory = "TV"
	Internet       SubCategory = "Internet"
	Electricity    SubCategory = "Electricity"
	HeatAndWater   SubCategory = "Heat/Water"
	Trash          SubCategory = "Trash"
	OtherUtilities SubCategory = "OtherUtilities"
)

// Health/medical
const (
	DoctorsDentalVision SubCategory = "Doctor/Dental/Vision"
	SpecialtyCare       SubCategory = "Specialist"
	Pharmacy            SubCategory = "Pharmacy"
	Emergency           SubCategory = "Emergency"
	OtherMedical        SubCategory = "Other Medical"
)

// Entertainment
const (
	Books              SubCategory = "Books"
	ConcertsOrShows    SubCategory = "Concerts/shows"
	Games              SubCategory = "Games"
	Hobbies            SubCategory = "Hobbies"
	Movies             SubCategory = "Movies"
	Music              SubCategory = "Music"
	OutdoorActivities  SubCategory = "Outdoor activities"
	Photography        SubCategory = "Photography"
	Sports             SubCategory = "Sports"
	TheaterPlays       SubCategory = "Theater/plays"
	TV                 SubCategory = "TV"
	OtherEntertainment SubCategory = "Other Entertainment"
)

// Pets
const (
	Food     SubCategory = "Food"
	Vet      SubCategory = "Vet/medical"
	PetToys  SubCategory = "Toys"
	Supplies SubCategory = "Supplies"
	PetOther SubCategory = "Other"
)

// Technology

const (
	DomainsAndHosting SubCategory = "Domains & hosting"
	OnlineServices    SubCategory = "Online services"
	Hardware          SubCategory = "Hardware"
	Software          SubCategory = "Software"
	OtherTech         SubCategory = "Other Tech"
)

// Other
const (
	BankFees SubCategory = "Bank Fees"
)
