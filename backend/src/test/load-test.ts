import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 users
    { duration: "30s", target: 300 }, // Ramp up to 300 users
    { duration: "1m", target: 500 }, // Ramp up to 500 users
    { duration: "3m", target: 500 }, // Stay at 500 users
    { duration: "30s", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests should be below 1000ms
    "http_req_duration{status:200}": ["p(95)<1000"], // 95% of successful requests should be below 1000ms
  },
};

export default function () {
  const payload = {
    email: `user${__VU}@test.com`,
    latitude: 37.7749 + Math.random(),
    longitude: -122.4194 + Math.random(),
  };

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: "30s",
  };

  const response = http.post(
    "http://localhost:5000/api/v1/ping",
    JSON.stringify(payload),
    params
  );
  if (response.status !== 200) {
    console.log(`
        Virtual User: ${__VU}
        Status: ${response.status}
        Body: ${response.body}
        Payload: ${JSON.stringify(payload)}
        Duration: ${response.timings.duration}ms
    `);
  }
  check(response, {
    "ping status is 200": (r) => r.status === 200,
    "response time < 1000ms": (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
