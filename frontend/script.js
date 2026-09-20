const fs = require("fs");
const pl = require("tau-prolog");
require("tau-prolog/modules/lists.js")

let session = pl.create(1000)

const prologCode = fs.readFileSync("../backend/level1.pl", "utf8");
function test() {
    session.consult(prologCode, {
        success: () => {
            session.query("material(fire)", {
                success: () => {
                    let results = [];

                    session.answers(answer => {
                        if(answer !== false) {
                            results.push(session.format_answer(answer));
                        } else {
                            console.log("Query results:", results);
                        }
                    };
                },
                error: err => console.error("Query error: ", err)
            };
        }),
        error: err => console.error("Consult error:", err)
    });
}