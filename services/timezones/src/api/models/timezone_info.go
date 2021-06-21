package models

// TimezoneInfo - Used to store timezone information for a city
// name: City name, this name cannot contains any espaces
// GMTOffset: in hours, how many hours of difference to GMT+0
type TimezoneInfo struct {
	Name      string `json:"name"`
	GMTOffset int    `json:"gmt_offset"`
}
