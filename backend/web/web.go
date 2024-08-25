package web

import (
	"net/http"

	"github.com/chensxb97/backend/query"
	"github.com/chensxb97/backend/storage"
	"github.com/gorilla/mux"
)

type Server struct {
	router  *mux.Router
	querier query.Querier
	db      storage.Database
	cache   storage.Cache
}

func NewServer(querier query.Querier, db storage.Database, cache storage.Cache) *Server {
	s := &Server{
		router:  mux.NewRouter(),
		querier: querier,
		db:      db,
		cache:   cache,
	}

	s.routes()
	return s
}

func (s *Server) routes() {
	// Register database handlers
	s.router.HandleFunc("/api/database/promQueries/get", s.getPromQueries).Methods("GET")
	s.router.HandleFunc("/api/database/promQueries/get/{id}", s.getPromQuery).Methods("GET")
	s.router.HandleFunc("/api/database/promQueries/create/{id}", s.createPromQuery).Methods("POST")
	s.router.HandleFunc("/api/database/promQueries/update/{id}", s.updatePromQuery).Methods("PATCH")
	s.router.HandleFunc("/api/database/promQueries/delete/{id}", s.deletePromQuery).Methods("DELETE")

	// Register query handlers
	s.router.HandleFunc("/api/query/compute", s.computeQuery).Methods("GET")
	s.router.HandleFunc("/api/query/cache", s.getQueryCache).Methods("GET")
}

func (s *Server) Start(address string) {
	http.ListenAndServe(address, s.router)
}
