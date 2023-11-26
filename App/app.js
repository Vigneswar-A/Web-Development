const express = require("express");
const app = express()




app.listen(8000, () => {
    console.log("Listening...")
})

app.get('/s3cr3t', (req, res) => {
    console.log(`Got Request from ${req.headers.host}`)
    res.send("You found a secret page wow! but can you find a bigger secret?")
})

app.post('/s3cr3t', (req, res) => {
    console.log(`Got Request from ${req.headers.host}`)
    res.send("You are a genius this is a bigger secret!!")
})

app.get('/echo/:something', (req, res) => {
    res.send(req.params.something)
    console.log(req.params.something)
})

app.get('/search', (req, res) => {
    res.send(`Cannot find ${req.query.f}`)
})

app.post('/echo', (req, res) => {
    res.send("HEY DONT POST!");
})


app.get('*', (req, res) => {
    console.log(`Got Request from ${req.headers.host}`)
    res.send("<title>Custom Page </title><h1>Hey!!</h1>")
})
