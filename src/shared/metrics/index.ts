import client from "prom-client";
import { Request, Response, NextFunction } from "express";

// Registro de métricas
export const register = new client.Registry();

// Criando métricas
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duração das requisições HTTP em segundos",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total de requisições HTTP recebidas",
  labelNames: ["method", "route", "status_code"]
});

const memoryUsage = new client.Gauge({
  name: "process_memory_usage_bytes",
  help: "Uso de memória do processo em bytes"
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(memoryUsage);

// Middleware para medir tempo de resposta e contar requisições
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const route = req.route ? req.route.path : req.path;
    httpRequestsTotal.inc({ method: req.method, route, status_code: res.statusCode });
    end({ method: req.method, route, status_code: res.statusCode });
  });

  memoryUsage.set(process.memoryUsage().heapUsed);
  next();
};
