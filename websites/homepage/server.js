require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname)));


app.post("/api/register", async (req, res) => {
  const username = req.body.username || req.body.account;
  const password = req.body.password;

  try {
    const response = await fetch(`${process.env.DATABASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: process.env.TOKEN,
        account: username,
        password: password,
      }),
    });
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.log("Can't establish connection to Database-API:", error.message);
    return res
      .status(500)
      .json({ error: "Can't establish connection to Database-API.", errorMessage: error.message, errorCause: error.cause});
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await fetch(`${process.env.DATABASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.TOKEN,
        account: username,
        password: password,
      }),
    });
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.log("Can't establish connection to Database-API:", error.message);
    return res
      .status(500)
      .json({ error: "Can't establish connection to Database-API.", errorMessage: error.message, errorCause: error.cause});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
