## GPS PING ASSINGMENT

Core Requirements:(all satisfied)
1. User Features:
- a. Registration & Login: Users should be able to register and log in.
- b. Location Tracking: After logging in, track the user's GPS location and send a ping to the
server every 4 seconds.
- c. Scalability: The backend must handle at least 500 live users tracking their locations.
2. Admin Features:
- a. User Monitoring: Provide an admin interface to view all registered users.
- b. Location Logs: Allow the admin to view detailed location logs for individual users.


## Bonus task

 - [x] 1. Redis Integration:
- a. Use Redis for caching frequently queried data or optimizing real-time data handling.
- [x] 2. Relational Database Optimization:
- a. Implement advanced features of relational databases (e.g., indexing, partitions) for better
performance.
- [x] 3. Code Architecture:
- a. Use clean, modular, and scalable code architecture with clear separation of concerns.
- [] 4. Enhanced Admin Panel:
- a. Build a more advanced admin panel with filters, user search, and exportable logs.
- [x] 5. React JS App:
- a. Create a web app for users to register, log in, and share their location. (Minimal frontend
would be suffice)

## testing

tested for 500 concurrent users:

![Screenshot from 2024-12-28 18-29-06](https://github.com/user-attachments/assets/68e6ced8-e3e1-4e07-83c2-91d02713c667)



### Key Observations:

#### Request Duration:

- 90th Percentile (p(90)): 5.04 seconds.
- 95th Percentile (p(95)): 5.88 seconds.
- Average: 2.9 seconds.
- Minimum: 47.93 milliseconds.
- Maximum: 11.03 seconds.

#### Request Success:

 -HTTP 200 responses indicate all responses were successful (expected_response:true).

#### Request Rate:

- Total Requests: 33,242.
- Requests per Second: 100.61.
- Failure Rate: <mark>http_req_failed</mark>: 0.00%, indicating no failed requests.
Request Breakdown:

- Receiving (http_req_receiving): Median 135.98 μs, P95 147.2 μs.
- Sending (http_req_sending): Median 54.82 μs, P95 60.51 μs.
- Waiting (http_req_waiting): Median 2.79 seconds.
### Iterations:
- Total: 33,242 iterations.
- Iteration Duration: Median 3.8 seconds, P95 6.88 seconds.
### Virtual Users (VUs):
- Active (min): 4.
- Active (max): 500.
### Summary:
The test sustained 100.61 requests per second with 500 concurrent virtual users. While all requests succeeded, the response time distribution shows some higher latency under load, with 90% of requests completing within 5.04 seconds and 95% within 5.88 seconds. There were no failed requests.



## local setup
- clone this repo or download the code
- get in both repo one by one and run "npm install"
- then go to backend repo and run :
   ```bash
   npm start
   ```
 - then go to frontend repo and run :
 ```bash
 npm run dev
```
- to access admin panel, enter email "admin@admin" and password "admin"

  ## photos

![Screenshot from 2024-12-28 17-25-34](https://github.com/user-attachments/assets/b1e1f918-f07e-4d5f-8fba-904f599955cb)

 
![Screenshot from 2024-12-28 17-24-16](https://github.com/user-attachments/assets/65785755-3388-44df-b414-3282111d6ef4)
