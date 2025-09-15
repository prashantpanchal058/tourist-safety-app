const connectToMongo = require('./db');
const express = require("express");

var cors = require('cors');

connectToMongo();
const app = express();
const port = 8007;

app.use(cors())
app.use(express.json())

app.use('/auth', require('./routes/auth'))

app.use('/loc', require('./routes/hospital'))

app.use('/report', require('./routes/report'))

app.use('/book', require('./routes/bookplan'))

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
})