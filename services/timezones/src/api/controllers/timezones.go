package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/search"
)

// This interface defines all necessaries methods signatures
// for handle the timezone requests
type timezoner interface {
	GetTimezone(c *gin.Context)
}
type timezone struct{}

// Timezone - Used to handle the calls from the API
var Timezone timezoner

// Initialize the object that will be used to handle
// the url requests
func init() {
	Timezone = &timezone{}
}

// GetTimezone - Retrieves the timezone for the city
// passed as a parameter.
// Returns 200 with the city timezone information
// Returns 404 if no city with the given name was found
func (t *timezone) GetTimezone(c *gin.Context) {
	timezone, err := search.GetCityTimezone(c.Param("city"))
	if err != nil {
		c.JSON(http.StatusNotFound, "no city found with the given name")
		return
	}
	c.JSON(http.StatusOK, timezone)
}
