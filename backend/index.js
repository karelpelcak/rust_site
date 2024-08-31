const express = require("express");
const cors = require("cors");
const request = require('request');
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get('/api/steam/:userId', (req, res) => {
  const { userId } = req.params;
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=7AB31C3B45F781CEF909082C21859A4E&format=json&steamids=${userId}`;
  request(url).pipe(res);
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.PlayerDatabase.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 6113;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
