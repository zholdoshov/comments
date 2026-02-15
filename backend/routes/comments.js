const express = require("express");
const db = require("../db");

const router = express.Router();

// get all comments
router.get("/", (req, res) => {
    const comments = db
        .prepare("SELECT * FROM comments ORDER BY date DESC")
        .all();

    res.json(comments);
})

module.exports = router;