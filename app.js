const app = require("express")();

const PORT = process.env.PORT || 3000;

const path = require('path');

app.get("", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('App up at port ${PORT}');
});