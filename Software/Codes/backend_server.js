const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let binDataStore = [];

// Receive bin data
app.post("/api/bin-data", (req, res) => {
  const data = req.body;

  if (!data.id || data.level === undefined) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const enrichedData = {
    ...data,
    receivedAt: new Date().toISOString()
  };

  binDataStore.push(enrichedData);

  res.status(200).json({ message: "Data stored successfully" });
});

// Get all bins
app.get("/api/bin-data", (req, res) => {
  res.json(binDataStore);
});

// Get critical bins
app.get("/api/alerts", (req, res) => {
  const alerts = binDataStore.filter(
    bin => bin.level > 80 || bin.weight > 7
  );
  res.json(alerts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
