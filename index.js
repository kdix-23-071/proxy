const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ====== 設定 ======
const BACKLOG_SPACE = "yourspace"; // 例: "example" なら example.backlog.com
const BACKLOG_API_KEY = "YOUR_BACKLOG_API_KEY"; // ← APIキー
// ==================

app.get("/issues", async (req, res) => {
  try {
    const r = await axios.get(
      `https://${BACKLOG_SPACE}.backlog.com/api/v2/issues`,
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
