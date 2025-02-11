import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 50, // 50 usuários simultâneos
  duration: '60s', // 60 segundos de teste
};

export default function () {
  http.get('http://localhost:3000/api/v1/health');
  sleep(1);
  http.get('http://localhost:3000/api/v1/users/random');
  sleep(1); // Simula tempo entre requisições
}
