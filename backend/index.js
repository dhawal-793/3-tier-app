const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.ORIGIN,
      "http://app"
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);

const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  connectionString: process.env.CONNECTION_STRING,
});

const testDbConnection = async () => {
  try {
    console.log("trying db connection");
    await pool.connect();
    console.log("Connected to the database successfully!");


    await createTableIfNotExists();
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

testDbConnection();


const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS country_and_capitals (
      id SERIAL PRIMARY KEY,
      country TEXT NOT NULL,
      capital TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Table 'country_and_capitals' checked/created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
    process.exit(1);
  }
};

const port = process.env.PORT ?? 3005;
const data = [
  { country: "India", capital: "delhi" },
  { country: "Bhutan", capital: "Thimpu" },
  { country: "USA", capital: "washington" },
  { country: "England", capital: "london" },
];

app.get('/health_check', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id,country, capital FROM country_and_capitals"
    );
    console.log("Get success");
    return res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data from database" });
  }
});

app.get("/api/data-test", function (req, res) {
  return res.status(200).json({
    data,
  });
});

app.post("/api/new", async (req, res) => {
  const { country, capital } = req.body;

  if (!country || !capital) {
    return res.status(400).json({ error: "Country and capital are required" });
  }

  const formatString = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedCountry = formatString(country);
  const formattedCapital = formatString(capital);

  try {
    const duplicateCheck = await pool.query(
      "SELECT * FROM country_and_capitals WHERE country = $1 OR capital = $2",
      [formattedCountry, formattedCapital]
    );

    if (duplicateCheck.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Country or Capital already exists" });
    }

    const result = await pool.query(
      "INSERT INTO country_and_capitals (country, capital) VALUES ($1, $2) RETURNING *",
      [formattedCountry, formattedCapital]
    );

    return res.status(201).json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error inserting data:", err);
    return res
      .status(500)
      .json({ error: "Error inserting data into database" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM country_and_capitals WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    console.log("Delete success");
    return res.status(204).send();
  } catch (err) {
    console.error("Error deleting data:", err);
    return res.status(500).json({ error: "Error deleting data from database" });
  }
});

app.listen(port, () =>
  console.log(`Backend REST API listening on port : ${port} !!`)
);
