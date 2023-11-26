const express = require("express");
const app = express();

app.use(express.static("public"))
app.set("view engine", "ejs")

const path = require("path")

app.set("views", path.join('C:/Users/viguv/OneDrive/Desktop/Programming/Web Development/App/views'))
app.listen(8080, () => {
    console.log("Listening on port 8080!");
})

app.get('/rand', (req, res) => {
    const n = Math.ceil(Math.random() * 100);
    res.render('random', { n: n, name: 'Elliot' })
})

students = [
    ['Vigneswar', '125003455', 'B', '8940980826']
]
app.get('/info', (req, res) => {
    res.render('info.ejs', students);
})


app.get('/echo/:data', (req, res) => {
    const { data } = req.params;
    res.render('echo', { data })
})

app.get('*', (req, res) => {
    res.render("home")
})