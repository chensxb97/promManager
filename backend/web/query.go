package web

import (
	"encoding/json"
	"net/http"
	"time"
)

func (s *Server) computeQuery(w http.ResponseWriter, r *http.Request) {
	// Compute prometheus query
	query := r.URL.Query().Get("query")
	result, err := s.querier.QueryPrometheus(query, time.Now())
	if err != nil {
		http.Error(w, "Error querying Prometheus", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func (s *Server) getQueryCache(w http.ResponseWriter, r *http.Request) {
	// Get the cached results
	queryCache := s.cache.GetCachedResults()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(queryCache)
}
