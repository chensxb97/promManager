package config

import (
	"fmt"
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v3"
)

type ServerConfig struct {
	Address string `yaml:"address"`
}

type PromConfig struct {
	URL string `yaml:"url"`
}

type PBConfig struct {
	URL string `yaml:"url"`
}

type Config struct {
	Server ServerConfig `yaml:"server"`
	Prom   PromConfig   `yaml:"prometheus"`
	PB     PBConfig     `yaml:"pocketbase"`
}

var AppConfig *Config // local variable

func LoadConfig(path string) (*Config, error) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("error reading config file path: %w", err)
	}

	var cfg Config
	err = yaml.Unmarshal(data, &cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to parse config file: %w", err)
	}

	return &cfg, nil
}

// InitConfig initializes the global config.
func InitConfig(path string) {
	cfg, err := LoadConfig(path)
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}
	AppConfig = cfg
}
