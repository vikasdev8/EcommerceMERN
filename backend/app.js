const express = require('express');
const product = require('./routes/productroute.js');
const User = require('./routes/userroutes.js');
const cookieParser = require('cookie-parser')
const app = express();
const bodyParser =  require('body-parser')
const fileUpload = require('express-fileupload')
const payment = require('./routes/paymentRoute')
const path = require("path");

const errorMiddleware = require('./middelware/error.js');
const Order = require('./routes/orderroute.js')
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


app.use('/api/v1', product)
app.use('/api/v1', User)
app.use('/api/v1', Order)
app.use('/api/v1', payment)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)

module.exports = app
