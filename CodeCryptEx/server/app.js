const express = require('express');
const app = express();

const PORT = 80;
const path = require('path')
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

require('./writeups')(app);
require('./study_resources')(app);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/:file', (req, res) => {
    try {
        const file = req.params.file;
        res.sendFile(path.join(__dirname, 'static', file));
    }
    catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
})