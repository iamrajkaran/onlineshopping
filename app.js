const express 	= require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');

const router = require('./routes/router');
// const userController = require('./controller/userController');
const config = require('./config')
// *****************************************************************
// configuration 
// *****************************************************************

const port = process.env.PORT || 8080; // port nuber of app
 
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// app.set('secretKey', 'onlineShopping'); 
app.set('secretKey', config.secretKey);
app.set('client', config.client);
// app.set('userController', userController); 

 

router.createRouter(app);


// *****************************************************************
// start the server 
// *****************************************************************
app.listen(port);
console.log('Server runs at http://localhost:' + port);
