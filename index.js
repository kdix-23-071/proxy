require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running! Try /issues");
});

// ====== 設定 ======
const BACKLOG_SPACE = process.env.BACKLOG_SPACE; 
const BACKLOG_API_KEY = process.env.BACKLOG_API_KEY; 
// ==================

app.get("/issues", async (req, res) => {
  try {
    const r = await axios.get(
      `https://${BACKLOG_SPACE}.backlog.com/api/v2/issues?apiKey=${BACKLOG_API_KEY}`,
      {
        params: {
          apiKey: BACKLOG_API_KEY,
          ...req.query,
        },
      }
    );
    res.json(r.data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Proxy error", detail: err.response?.data });
  }
});

app.listen(3001, () => {
  console.log("Backlog proxy running at http://localhost:3001");
});
