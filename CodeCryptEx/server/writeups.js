const fs = require('fs').promises;
const path = require('path');


async function getWriteupTopics() {
    try {
        return await fs.readdir(path.join(__dirname, '..', 'writeups'));
    } catch (error) {
        console.error('Error reading writeups directory:', error);
        throw error;
    }
}

async function getWriteups(writeup) {
    try {
        const files = await fs.readdir(path.join(__dirname, '..', 'writeups', writeup));
        return files.map((s) => path.basename(s, path.extname(s)));
    } catch (error) {
        console.error(`Error reading writeups directory for '${writeup}':`, error);
        throw error;
    }
}

function handleErrors(res, error) {
    console.error(error);
    res.status(500).send('Oops, some problem has occurred!');
}

module.exports = (app) => {
    app.get('/writeups', async (req, res) => {
        try {
            const writeups = await getWriteupTopics();
            return res.render('writeups.ejs', { writeups });
        } catch (error) {
            handleErrors(res, error);
        }
    });

    app.get('/writeups/hackthebox', async (req, res) => {
        try {
            const boxes = await getWriteups('hackthebox');
            return res.render('hackthebox.ejs', { boxes });
        } catch (error) {
            handleErrors(res, error);
        }
    });

    app.get('/writeups/hackthebox/static/:file', (req, res) => {
        const file = req.params.file;
        const pagePath = path.join(__dirname, 'static', file);
        res.sendFile(pagePath);
    });

    app.get('/writeups/hackthebox/:name', async (req, res) => {
        const name = req.params.name;
        try {
            const boxes = await getWriteups('hackthebox');
            if (boxes.includes(name)) {
                const pagePath = path.join(__dirname, '..', 'writeups', 'hackthebox', `${name}.pdf`);
                res.sendFile(pagePath);
            } else {
                res.status(404).send('Write-up not found');
            }
        } catch (error) {
            handleErrors(res, error);
        }
    });
};
