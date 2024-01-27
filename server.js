import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

let helloCount = 0;

app.use( express.json() )


app.get('/hello', (req, res) => {
    //do something
    helloCount++;
    res.json({
        hello: helloCount
    })
})

ViteExpress.listen( app, 3000 )