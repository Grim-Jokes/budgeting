package merchants

import (
	"log"
)

type SanitizerFn = func(Merchant) Merchant

func SanitizeMerchanName(name Merchant, sanitizerFns []SanitizerFn) Merchant {
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

func CreateSanitizer(filter string, result Merchant) func(Merchant) Merchant {

	return func(name Merchant) Merchant {
		if name.Contains(filter) {
			return result
		}

		return ""
	}
}
