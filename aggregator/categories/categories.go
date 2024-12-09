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

// EveryDay ()
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

type SubCategoryToCategoryMap = map[SubCategory][]Category

var ParentCategories = map[SubCategory]Category{
	Activities:    Children,
	Allowance:     Children,
	Medical:       Children,
	Childcare:     Children,
	Clothing:      Children,
	School:        Children,
	Toys:          Children,
	ChildrenOther: Children,

	Groceries:        Everyday,
	Restaurants:      Everyday,
	PersonalSupplies: Everyday,
	Clothes:          Everyday,
	Laundry:          Everyday,
	HairAndbeauty:    Everyday,
	Subscriptions:    Everyday,
	EveryDayOther:    Everyday,

	CreditCards: Debt,
	Loands:      Debt,
	Taxes:       Debt,
	DebtOther:   Debt,
}
