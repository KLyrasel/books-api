//dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//configuration
const app = express()
//accesses the PORT from the .env file
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//controller router
app.use(`/books`, require(`./book-controller`))

//routes
app.get(`/`, (req, res) => {
    res.send('Hello world')
})

app.get('/products/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})


//configures mongoose/mongo
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)
//listen, keeps local server open
app.listen(PORT)

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})