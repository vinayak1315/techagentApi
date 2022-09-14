const express = require('express');
const errorMiddleware = require('./middlewares/errors')
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

// setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION') config({ path: 'backend/config/config.env' })

dotenv.config({ path: 'backend/config/config.env'})  
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


// Import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
// Routing 
app.use(products);
app.use(auth);
app.use(order)
app.use(payment)

if(process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
// Middleware to handle errors
app.use(errorMiddleware)
module.exports = app 