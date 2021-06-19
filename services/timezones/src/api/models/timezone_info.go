package models

// TimezoneInfo - Used to store timezone information for a city
type TimezoneInfo struct {
	Name      string `json:"name"`
	GMTOffset int    `json:"gmt_offset"`
}
