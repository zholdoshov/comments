const express = require("express");
const db = require("../db");

const router = express.Router();

// get all comments
router.get("/", (req, res) => {
    const { sort = 'date_desc' } = req.query;
    const [sortBy, order] = sort.split('_');
    
    const comments = db
        .prepare(`SELECT * FROM comments ORDER BY ${sortBy} ${order}`)
        .all();

    res.json(comments);
})

// create comment
router.post("/", (req, res) => {
    const { text, image = '' } = req.body;
    const author = 'Admin';
    const date = new Date().toISOString();
    const likes = 0;

    if (!text) return res.status(400).json({error: "Text required!"});

    const stmt = db.prepare(`
        INSERT INTO comments (author, text, date, likes, image)
        VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(author, text, date, likes, image);

    res.status(201).json({id: result.lastInsertRowid, author, text, date, likes, image});
})


// edit comment
router.put("/:id", (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({error: "Text required!"});

    const stmt = db.prepare(
        "UPDATE comments SET text = ? WHERE id = ?"
    );

    const result = stmt.run(text, req.params.id);

    if (!result.changes) return res.status(404).json({error: "Not found!"});

    const updated = db
        .prepare("SELECT * FROM comments WHERE id = ?")
        .get(req.params.id);

    res.json(updated);
})


// delete comment
router.delete("/:id", (req, res) => {
    const result = db
        .prepare("DELETE FROM comments WHERE id = ?")
        .run(req.params.id);

    if (!result.changes) return res.status(404).json({error: "Not found!"});

    res.json({success: true});
})

module.exports = router;