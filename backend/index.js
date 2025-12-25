const { app, initDb } = require("./app");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (e) {
    console.error("DB init error:", e);
    process.exit(1);
  }
})();
