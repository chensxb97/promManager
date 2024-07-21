# promVisualizer

## Objective
A self-service onboarding platform for visualising Prometheus Queries

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
