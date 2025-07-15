## 📦 RedisCachingExpress

A simple Express.js API that caches external API responses using Redis for improved performance.
This demo fetches data from `https://httpbin.org/get`, stores the result in Redis, and serves it from cache for future requests.

<img width="1200" height="464" alt="image" src="https://github.com/user-attachments/assets/817cb5b4-143f-4a60-b580-83a9f048462b" />


---

### 🚀 Features

* Fetch external data from `https://httpbin.org/get`
* Cache the response in Redis with a TTL (time to live)
* Fast response time on repeated calls
* Environment config via `.env`

---

### 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Redis**
* **node-fetch**
* **dotenv**

---

### 📁 Project Structure

```
/A2
├── server.js          # Express server with Redis integration
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (not committed)
└── .gitignore         # Ignores node_modules and .env
```

---

### ⚙️ Setup & Run

1. **Clone the repo**

   ```bash
   git clone https://github.com/amadich/RedisCachingExpress.git
   cd RedisCachingExpress
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```env
   REDIS_URL=redis://VPS-IP:6379 // or use localhost if you run it locally
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Test the API**

   * Call: [http://localhost:3000/api/external](http://localhost:3000/api/external)
   * First request fetches from `httpbin.org`, others hit Redis cache

---

### 📉 Cache Logic

* Redis key: `httpbin:get`
* TTL: 60 seconds
* After 60s, the external API will be called again
<img width="388" height="359" alt="image" src="https://github.com/user-attachments/assets/7b23d3df-5100-4bb6-87c6-ec504bc9e6fc" />

---

### 🧪 Example Redis CLI

```bash
redis-cli
> get httpbin:get
```

---

