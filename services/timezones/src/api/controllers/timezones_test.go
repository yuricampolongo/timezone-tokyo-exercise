package controllers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/models"
)

func TestInvalidCityName(t *testing.T) {
	c, w := mockContext(t, "", "GET", "/timezone/:city", []gin.Param{{Key: "city", Value: "SaoPaulo"}})

	Timezone.GetTimezone(c)

	assert.EqualValues(t, http.StatusNotFound, w.Code)
	var errMessage string
	json.NewDecoder(w.Body).Decode(&errMessage)
	assert.NotNil(t, errMessage)
	assert.EqualValues(t, "no city found with the given name", errMessage)
}

func TestValidCityName(t *testing.T) {
	c, w := mockContext(t, "", "GET", "/timezone/:city", []gin.Param{{Key: "city", Value: "Tokyo"}})

	Timezone.GetTimezone(c)

	assert.EqualValues(t, http.StatusOK, w.Code)
	var tokyoTimezoneInfo models.TimezoneInfo
	json.NewDecoder(w.Body).Decode(&tokyoTimezoneInfo)
	assert.NotNil(t, tokyoTimezoneInfo)
	assert.EqualValues(t, "Tokyo", tokyoTimezoneInfo.Name)
	assert.EqualValues(t, 9, tokyoTimezoneInfo.GMTOffset)
}

func TestValidCityNameCaseInsensitive(t *testing.T) {
	c, w := mockContext(t, "", "GET", "/timezone/:city", []gin.Param{{Key: "city", Value: "tOkYO"}})

	Timezone.GetTimezone(c)

	assert.EqualValues(t, http.StatusOK, w.Code)
	var tokyoTimezoneInfo models.TimezoneInfo
	json.NewDecoder(w.Body).Decode(&tokyoTimezoneInfo)
	assert.NotNil(t, tokyoTimezoneInfo)
	assert.EqualValues(t, "Tokyo", tokyoTimezoneInfo.Name)
	assert.EqualValues(t, 9, tokyoTimezoneInfo.GMTOffset)
}

// Mock a new Gin context, with that, we can personalize the method, endpoint and what will be the return
func mockContext(t *testing.T, body string, method string, endpoint string, params []gin.Param) (*gin.Context, *httptest.ResponseRecorder) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = &http.Request{
		Header: make(http.Header),
	}
	jsonParam := body
	c.Request, _ = http.NewRequest(method, endpoint, strings.NewReader(string(jsonParam)))
	c.Request.Header.Set("Content-Type", "application/json")
	c.Params = params
	return c, w
}
