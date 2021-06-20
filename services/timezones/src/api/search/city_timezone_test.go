package search

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSearchInvalidCity(t *testing.T) {
	timezone, err := GetCityTimezone("SaoPaulo")

	assert.Nil(t, timezone)
	assert.NotNil(t, err)
	assert.EqualValues(t, "no city found with this name", err.Error())
}

func TestSearchValidCity(t *testing.T) {
	timezone, err := GetCityTimezone("Tokyo")

	assert.Nil(t, err)
	assert.NotNil(t, timezone)
	assert.EqualValues(t, "Tokyo", timezone.Name)
	assert.EqualValues(t, 9, timezone.GMTOffset)
}

func TestSearchValidCityCaseInsensitive(t *testing.T) {
	timezone, err := GetCityTimezone("tOkYo")

	assert.Nil(t, err)
	assert.NotNil(t, timezone)
	assert.EqualValues(t, "Tokyo", timezone.Name)
	assert.EqualValues(t, 9, timezone.GMTOffset)
}
