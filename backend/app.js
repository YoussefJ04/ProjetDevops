const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", message: "Backend operational" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "DB not reachable" });
  }
});


app.post("/items", async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name is required" });

  const result = await db.query(
    "INSERT INTO items(name) VALUES($1) RETURNING id, name",
    [name]
  );
  res.status(201).json(result.rows[0]);
});

app.get("/items", async (req, res) => {
  const result = await db.query("SELECT id, name FROM items ORDER BY id ASC");
  res.json(result.rows);
});

app.put("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name is required" });

  const result = await db.query(
    "UPDATE items SET name=$1 WHERE id=$2 RETURNING id, name",
    [name, id]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "not found" });
  res.json(result.rows[0]);
});

app.delete("/items/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.query("DELETE FROM items WHERE id=$1", [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: "not found" });
  res.status(204).send();
});

module.exports = app;

