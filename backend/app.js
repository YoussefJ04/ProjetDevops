const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend operational" });
});


app.get("/items", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY id ASC");
  res.json(rows);
});

app.post("/items", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const { rows } = await pool.query(
    "INSERT INTO items(name) VALUES($1) RETURNING *",
    [name]
  );
  res.status(201).json(rows[0]);
});

app.put("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const { rows } = await pool.query(
    "UPDATE items SET name=$1 WHERE id=$2 RETURNING *",
    [name, id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

app.delete("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM items WHERE id=$1", [id]);
  if (rowCount === 0) return res.status(404).json({ error: "not found" });
  res.status(204).send();
});


initDb().catch((e) => {
  console.error("DB init error:", e);
  process.exit(1);
});

module.exports = app;

