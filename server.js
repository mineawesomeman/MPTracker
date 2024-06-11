import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

let helloCount = 0;
const allowedUsers = [
    "102735845349975296276"
]

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

ViteExpress.listen( app, 3000 )