package storage

import "fmt"

type Cache interface {
	GetCachedResults() map[string]interface{}
	getData(key string) (interface{}, error)
	saveData(key string, value interface{}) error
}

type PrometheusCache struct {
	result map[string]interface{}
}

// NewPrometheusCache creates and initializes a new prometheusCache
func NewPrometheusCache() (*PrometheusCache, error) {
	return &PrometheusCache{result: make(map[string]interface{})}, nil
}

func (cache *PrometheusCache) GetCachedResults() map[string]interface{} {
	return cache.result
}

func (cache *PrometheusCache) getData(key string) (interface{}, error) {
	value, exists := cache.result[key]
	if !exists {
		return nil, fmt.Errorf("key not found in cache")
	}
	return value, nil
}

func (cache *PrometheusCache) saveData(key string, value interface{}) error {
	cache.result[key] = value
	return nil
}
