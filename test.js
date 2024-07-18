const express = require('express');
const { randomBytes, randomInt } = require('crypto');
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const FLAG = process.env.FLAG || "flag{test_flag}";
const KEY = process.env.KEY || "eloidfhwkefbjwkefhjbwekfhjhbwekfhjb";
const PORT = process.env.PORT || 3000;

let admin_token = randomBytes(16).toString("hex");
let pass = randomInt(2 ** 16).toString().padEnd(5, "0");
let DB = {};
// Didn't learn mongoDB :(
DB[`admin-${admin_token}`] = pass;
// Only admin can know the username and password :)
console.log(`Your login details\n${JSON.stringify(DB)}`)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Only i know the username :)
    if (DB[username]) {
        console.log("right user!")
        console.log(pass, password, pass === password)
        if (password === pass) {
            // password changed everytime i login so iam secure :)
            pass = randomInt(2 ** 16).toString().padEnd(5, "0");
            // Let admin get new password's reminder
            //fetch("https://webhook.site/4009b056-4f96-429d-aa35-e15cb9126dc0/?newPass=" + pass);
            return res.render("secrets", { flag: FLAG });
        }
        return res.send("Incorrect Username/Password");
    }
});
app.post("/register", (req, res) => {
    const { key, user, pass } = req.body;
    if (key === FLAG + KEY) {
        DB[user] = pass;
        return res.send("Ok!!!")
    }
    return res.send("Incorrect key");
}
)
app.listen(PORT, () => console.log(`listening on port ${PORT}`));