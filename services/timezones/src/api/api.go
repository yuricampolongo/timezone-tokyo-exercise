package api

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const (
	// We use the port 3000 as default, If you change this port
	// you must also change in the docker-compose.yml file.
	apiPort = ":3000"
)

var (
	router *gin.Engine
)

func init() {
	router = gin.Default()

	// Adding CORS permission to GET requests
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))
}

func StartApi() {
	// Starts the URL Mappings for this service
	mapUrls()

	// Starts the listening for requests
	if err := router.Run(apiPort); err != nil {
		panic(err)
	}
}
