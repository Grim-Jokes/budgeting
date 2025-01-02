package business

import "time"

type Receipt struct {
	Date  time.Time
	Items []Item
}
