package search

import (
	"errors"
	"strings"

	"github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/models"
)

var (
	timezones []*models.TimezoneInfo
)

func init() {
	tokyo := &models.TimezoneInfo{
		Name:      "Tokyo",
		GMTOffset: 9,
	}

	timezones = append(timezones, tokyo)
}

// GetCityTimezone - Returns the city timezone information based on its name
// an error will be returned if no city was found with the given name
func GetCityTimezone(cityName string) (*models.TimezoneInfo, error) {
	for _, v := range timezones {
		if strings.EqualFold(v.Name, cityName) {
			return v, nil
		}
	}
	return nil, errors.New("no city found with this name")
}
