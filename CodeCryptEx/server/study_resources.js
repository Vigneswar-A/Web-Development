const fs = require('fs').promises;
const path = require('path');

async function getTopics() {
    try {
        return await fs.readdir(path.join(__dirname, '..', 'study_resources'));
    } catch (error) {
        console.error('Error reading writeups directory:', error);
        throw error;
    }
}

async function getTopic(topic) {
    try {
        const files = await fs.readdir(path.join(__dirname, '..', 'study_resources', topic));
        console.log(files);
        return files.map((s) => path.basename(s, path.extname(s)));
    } catch (error) {
        console.error(`Error reading writeups directory for '${topic}':`, error);
        throw error;
    }
}

function handleErrors(res, error) {
    console.error(error);
    res.status(500).send('Oops, some problem has occurred!');
}

module.exports = (app) => {
    app.get('/study_resources', async (req, res) => {
        try {
            const topics = await getTopics();
            return res.render('study_resources.ejs', { topics });
        } catch (error) {
            handleErrors(res, error);
        }
    });

    app.get('/study_resources/penetration_testing', async (req, res) => {
        try {
            console.log("ee");
            const topics = await getTopic('penetration_testing');
            console.log(topics);
            return res.render('penetration_testing.ejs', { topics });
        } catch (error) {
            handleErrors(res, error);
        }
    });

    app.get('/study_resources/penetration_testing/static/:file', (req, res) => {
        const file = req.params.file;
        const pagePath = path.join(__dirname, 'static', file);
        res.sendFile(pagePath);
    });

    app.get('/study_resources/penetration_testing/:topic', async (req, res) => {
        const topic = req.params.topic;
        try {
            const topics = await getTopic('penetration_testing');
            if (topics.includes(topic)) {
                const pagePath = path.join(__dirname, '..', 'study_resources', 'penetration_testing', `${topic}.pdf`);
                res.sendFile(pagePath);
            } else {
                res.status(404).send('Topic not found');
            }
        } catch (error) {
            handleErrors(res, error);
        }
    });
};
