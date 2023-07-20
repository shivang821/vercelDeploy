const dotenv = require('dotenv')
const cors=require('cors')
const express = require('express')
const app = express()
app.use(express.json());
const userRoute = require('./routes/userRoutes')
const postRoute = require('./routes/newpost')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
dotenv.config({ path: "./config.env" })
require('./database/conn')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
    // app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(express.json({ limit: '50mb', extended: true }));
app.use(fileUpload())
app.use(cookieParser())
app.use(userRoute)
app.use(postRoute)
app.use(express.static('dist'));
app.listen(4000, (req, res) => {
    console.log("server runnin on port 4000");
})