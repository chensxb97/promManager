// cmd/main.go
package main

import (
	"flag"
	"log"

	"github.com/chensxb97/backend/config"
	"github.com/chensxb97/backend/query"
	"github.com/chensxb97/backend/storage"
	"github.com/chensxb97/backend/web"
)

func main() {
	// Define the command-line flag for the config file path
	configPath := flag.String("config", "./local_test/config.yaml", "path to the configuration file")
	flag.Parse()

	// Initialize configuration
	config.InitConfig(*configPath)

	// Initialize Prometheus Querier
	promQuerier, err := query.NewPrometheusQuerier(config.AppConfig.Prom.URL)
	if err != nil {
		log.Fatalf("Failed to initialize Prometheus instance: %v", err)
	}

	// Initialize PocketBase Database
	pbDB, err := storage.NewPocketBaseDB(config.AppConfig.PB.URL)
	if err != nil {
		log.Fatalf("Failed to initialize PocketBase DB: %v", err)
	}

	// Initialize Prometheus Results Cache
	cache, err := storage.NewPrometheusCache()
	if err != nil {
		log.Fatalf("Failed to initialize prometheus cache: %v", err)
	}

	// Initialize and start the server
	server := web.NewServer(promQuerier, pbDB, cache)
	log.Printf("Starting server on %s...", config.AppConfig.Server.Address)
	server.Start(config.AppConfig.Server.Address)
}
