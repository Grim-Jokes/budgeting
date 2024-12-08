package merchants

import "regexp"

func (m Merchant) Contains(value string) bool {

	re := regexp.MustCompile("(?i)" + value)

	return re.MatchString(string(m))

}

type Merchant string
