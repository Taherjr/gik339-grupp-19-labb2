const express = require("express");

const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const port = 3000;

server.listen(3000, () => console.log("Server running"));

server.get("/users", (req, res) => {
  const sqlite3 = require("sqlite3").verbose();

  const db = new sqlite3.Database("./gik339-labb2.db");

  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).send(err); // Skickar felmeddelande och statuskod 500 till klienten om det uppstår ett fel
    } else {
      // Skicka svaret tillbaka till klienten i JSON-format
      res.json(rows);
    }

    // Stäng databaskopplingen när du är klar
    db.close((err) => {
      if (err) {
        console.error("Stänga databas går ej", err.message);
      } else {
        console.log("Ingen koppling till databasen");
      }
    });
  });
});
