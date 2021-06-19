package api

import "github.com/gin-gonic/gin"

const (
	apiPort = ":3000"
)

var (
	router *gin.Engine
)

func init() {
	router = gin.Default()
}

func StartApi() {
	mapUrls()

	if err := router.Run(apiPort); err != nil {
		panic(err)
	}
}
