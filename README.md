# Prometheus Onboarding Manager

## Objective
A self-service onboarding platform for managing Prometheus Queries and other metadata. The idea is to create a user interface that offers Prometheus functionality and customisation for third-party users, without having to make direct and high-risk modifications to the Prometheus configurations.

## Summary of App
- A react app for onboarding prometheus queries and displays visualisations in a global dashboard.
- React 18, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Pocketbase](https://pocketbase.io/docs/) as our lightweight database.
- Vertical Navigation Side Bar
- Home Page provides a global view of all onboarded prometheus visualisations
- Onboarding Page performs CRUD operations on prometheus queries
  - Onboard new prometheus query with validation and preview before submission
  - Edit existing prometheus queries
  - Delete existing prometheus queries
  - Clone existing prometheus queries

## Future Work
- Healthchecks
- Exporter Metadata
- Configuration Management
- Query Results Caching

