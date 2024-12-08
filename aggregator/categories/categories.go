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
	ChildrenOther SubCategory = "Other"
)
