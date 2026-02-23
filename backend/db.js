const Database = require('better-sqlite3');
const fs = require('fs');

const db = new Database('comments.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        author TEXT NOT NULL,
        text TEXT NOT NULL,
        date DATETIME NOT NULL,
        likes INTEGER DEFAULT 0,
        image TEXT
    )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM comments').get();

if (count.count === 0) {
    const raw = fs.readFileSync('./data/comments.json');
    const { comments } = JSON.parse(raw);

    const insert = db.prepare(`
        INSERT INTO comments (id, author, text, date, likes, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const comment of comments) {
        insert.run(Number(comment.id), comment.author, comment.text, comment.date, comment.likes, comment.image);
    }

    console.log('Seeded initial comments');
}

module.exports = db;