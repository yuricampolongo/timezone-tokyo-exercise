package api

import "github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/controllers"

// mapUrls - Map all URL that this service will be listening.
func mapUrls() {
	// Returns the requested city timezone information
	router.GET("/timezone/:city", controllers.Timezone.GetTimezone)
}
