document.getElementById("quoteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const age = parseInt(document.getElementById("age").value);
    const coverage = parseInt(document.getElementById("coverage").value);
    const type = document.getElementById("type").value;
  
    let baseRate = 0.02;
    if (type === "health") baseRate = 0.015;
    else if (type === "car") baseRate = 0.03;
  
    let ageFactor = age > 50 ? 1.5 : 1.2;
    const quote = (coverage * baseRate * ageFactor).toFixed(2);
    document.getElementById("result").textContent = `Estimated Monthly Premium: $${quote}`;
    
    this.reset(); // ← clears the form
  });  

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// Initialize database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE claims (
                claim_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                status TEXT NOT NULL,
                submission_date TEXT NOT NULL,
                last_updated TEXT NOT NULL
            )
        `);
    }
});

// Submit a new claim
app.post('/claims', (req, res) => {
    const { user_id, status } = req.body;
    const submissionDate = new Date().toISOString();
    const query = `
        INSERT INTO claims (user_id, status, submission_date, last_updated)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [user_id, status, submissionDate, submissionDate], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({ claim_id: this.lastID, user_id, status });
        }
    });
});

// Get claim status
app.get('/claims/:id', (req, res) => {
    const query = 'SELECT * FROM claims WHERE claim_id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!row) {
            res.status(404).send('Claim not found.');
        } else {
            res.json(row);
        }
    });
});

// Update claim status
app.put('/claims/:id', (req, res) => {
    const { status } = req.body;
    const lastUpdated = new Date().toISOString();
    const query = `
        UPDATE claims
        SET status = ?, last_updated = ?
        WHERE claim_id = ?
    `;

    db.run(query, [status, lastUpdated, req.params.id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else if (this.changes === 0) {
            res.status(404).send('Claim not found.');
        } else {
            res.send('Claim updated successfully.');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
function submitContactForm(e) {
    e.preventDefault();
    alert('Thanks for contacting us! We will get back to you soon.');
    e.target.reset();
  }
  