package api

import "github.com/yuricampolongo/timezone-tokyo-exercise/services/timezones/src/api/controllers"

func mapUrls() {
	router.GET("/timezone/:city", controllers.Timezone.GetTimezone)
}
