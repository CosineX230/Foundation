const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pl = require("tau-prolog");
require("tau-prolog/modules/lists.js")(pl);

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

function runQuery(queryString) {
  return new Promise((resolve, reject) => {
    const session = pl.create(1000);
    const prologCode = fs.readFileSync(path.join(__dirname, "level1.pl"), "utf8");

    session.consult(prologCode, {
      success: () => {
        session.query(queryString, {
          success: () => {
            const results = [];

            function collectAnswers() {
              session.answer({
                success: answer => {
                  if (answer !== false) {
                    results.push(session.format_answer(answer));
                    collectAnswers();
                  } else {
                    resolve(results);
                  }
                },
                fail: () => resolve(results),
                error: err => reject(err),
                limit: () => reject(new Error("Answer limit reached"))
              });
            }

            collectAnswers();
          },
          error: err => reject(err)
        });
      },
      error: err => reject(err)
    });
  });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

app.post("/query", async (req, res) => {
  try {
    const query = req.body.query || "material(fire).";
    const results = await runQuery(query);
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
