const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')

const PORT = 80;
app.use(express.static('static'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
    return res.render('index.ejs');
})

const dirs = ['pwn', 'htb', 'web'];

for (const dir of dirs) {
    app.get('/' + dir, (req, res) => {
        const writeupsDir = path.join('writeups', dir);
        fs.readdir(writeupsDir, (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                return res.status(500).send('Error reading folder');
            }
            const writeups = files.map(file => file.split('.').slice(0, -1).join('.'));
            res.render('writeups.ejs', { writeups: writeups ?? [], dir: '/' + dir });
        });
    });
}

app.get('/:dir/:filename', (req, res) => {
    const dir = req.params.dir
    if (!dir in dirs)
        return res.status(404)
    const filename = req.params.filename;
    const filePath = path.join('writeups', dir, filename) + '.pdf';
    res.contentType('application/pdf');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});

app.use((req, res, next) => {
    res.redirect('/');
});