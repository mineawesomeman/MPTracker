import express from  'express'
import ViteExpress from 'vite-express'
import fs from 'fs'

const app = express()
//set this to false if dev
const PRODUCTION = true
let PORT = 3000

//load accounts file
const ACCOUNTS = JSON.parse(fs.readFileSync('accounts.json', 'utf8'));

if (PRODUCTION) {
    ViteExpress.config({ mode: "production" })
    PORT = 80
}

let helloCount = 0;
const allowedUsers = ACCOUNTS.accounts
console.log(allowedUsers)

app.use( express.json() )

app.post('/user-validation', (req, res) => {
    // console.log(req)
    if (!req.body.id) {
        res.status(400)
        res.end("Bad Request")
    } else {
        const access = allowedUsers.includes(req.body.id)
        res.json({
            'beta': access
        })
    }
});

app.get('/hello', (req, res) => {
    //do something
    helloCount++;
    res.json({
        hello: helloCount
    })
})

ViteExpress.listen( app, PORT )