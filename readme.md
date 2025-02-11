# Metrics API - under construction 

## Overview
This is a sample project designed to test observability techniques with Grafana. It provides endpoints to submit, retrieve, and analyze metrics data.

## Features
- Collect metrics from different sources
- Retrieve metrics data
- Analyze and visualize metrics

## Installation
To install the Metrics API, clone the repository and install the dependencies:

```bash
git clone https://github.com/viniciuslunardi/metrics-api.git
cd metrics-api
npm install
```

## Usage
Start server

```bash
npm start:dev
```
The API will be available at `http://localhost:3000`.

Run load test (must have K6[https://k6.io/] installed)

```bash
npm test:load 
```

Run Grafana with Prometheus, Loki e Promtail (must have docker installed)
```bash
cd infra/observability
docker-compose up -d
```
Access localhost:3001 with "admin" "admin" and connect the Prometheus and Loki Datasource


## Endpoints

### Retrieve Metrics
```
GET /health
```
Should inform health-check status of the project
```

GET /users/random
```
Fetch fake user using faker just for test now

```
GET /metrics
```
Grafana will fetch that endpoint and collect the metrics

## Contributing
Just fork it.

## License
This project is licensed under the MIT License.
