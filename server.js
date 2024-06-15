const express = require('express')
const app = express()
const mongoose = require("mongoose")
const router = require('./routes/todoRoutes')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Database Connected Successfully')
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
app.use(cors())
app.use(bodyParser.json())
app.use('/',router)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started Successfully on ${process.env.PORT}`)
})