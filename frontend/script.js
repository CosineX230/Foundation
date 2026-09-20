const API_URL = window.__API_URL__ || "http://localhost:3000";

async function test() {
    const queryInput = document.getElementById("queryInput");
    const resultsOutput = document.getElementById("results");
    const query = (queryInput ? queryInput.value : "material(fire).") || "material(fire).";

    try {
        const response = await fetch(`${API_URL}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Query failed");
        }

        const output = Array.isArray(data.results) ? data.results.join("\n") : "[]";
        if (resultsOutput) {
            resultsOutput.textContent = output;
        }
        console.log("Query results:", data.results);
    } catch (err) {
        console.error("Query error:", err);
        if (resultsOutput) {
            resultsOutput.textContent = err.message;
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("runQueryButton");
    if (button) {
        button.addEventListener("click", test);
    }
});