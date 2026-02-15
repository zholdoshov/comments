const express = require('express');
const cors = require("cors");

const commentsRoutes = require("./routes/comments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/comments", commentsRoutes);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})