package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/search"
)

type timezoner interface {
	GetTimezone(c *gin.Context)
}
type timezone struct{}

// Timezone - Used to handle the calls from the API
var Timezone timezoner

func init() {
	Timezone = &timezone{}
}

func (t *timezone) GetTimezone(c *gin.Context) {
	timezone, err := search.GetCityTimezone(c.Param("city"))
	if err != nil {
		c.JSON(http.StatusNotFound, errors.New("no city found with the given name"))
		return
	}
	c.JSON(http.StatusOK, timezone)
}
