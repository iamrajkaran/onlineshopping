module.exports = {
  createRouter(app) {
  const productController = require('../controller/productController');
  const userController = require('../controller/userController'); 
  const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  const validate = require('express-jsonschema').validate;
  const schema = require("../schema");

  app.get('/', (req, res) => {
  res.send('Route not defined. Please choosee another route');
  });
  
  app.post('/user/:action',validate({body: schema.createUserSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = userController
        if (action === 'createUser') {
          handler.createUser(app, req)
           .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });


    app.get('/user/:action', (req, res) => {
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = userController
        if (action === 'userData') {
          handler.userData(app)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    
 
    app.put('/user/:action',validate({body: schema.updateUserSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = userController
        if (action === 'updateUserData') {
          handler.updateUserData(app, req)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    app.delete('/user/:action',validate({body: schema.deleteUserSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = userController
        if (action === 'deleteUserData') {
          handler.deleteUserData(app, req)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });


  // token is created on authenticated user
  app.get('/user/auth/:action', (req, res) => {
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = userController;
        if (action === 'authUser') {
          handler.authUser(app,req)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    // route middleware to verify a token
    app.use(function(req, res, next) {
      // check header or url parameters or post parameters for token
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('secretKey'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;    
            next();
          }
        });
      } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
      }
    });


    //*********************************
      //Rest of the routes 
      // token is required to all the routes defined below
    //*********************************

 

    app.get('/product/:action', (req, res) => {
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = productController;
        if (action === 'productData') {
          handler.productData(app)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    app.get('/searchProduct/:action/:search',validate({query: schema.searchProductSchema}), (req, res) => {
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = productController;
        if (action === 'searchProduct') {
          handler.searchProduct(app, req.params.search)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    app.post('/product/:action',validate({body: schema.createProductSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = productController;
        if (action === 'createProduct') {
          handler.createProduct(app, req)
           .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });
 
    app.put('/product/:action',validate({body: schema.updateProductSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = productController;
        if (action === 'updateProductData') {
          handler.updateProductData(app, req)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });

    app.delete('/product/:action',validate({body: schema.deleteProductSchema}), (req, res) => { 
      const action = req.params.action;
      res.setHeader('Content-Type', 'application/json');
      if (typeof action !== 'undefined' || action != null) {
        const handler = productController;
        if (action === 'deleteProductData') {
          handler.deleteProductData(app, req)
                  .then((resp) => {
                    res.send(JSON.stringify(resp));
                  })
                  .catch((error) => {
                    res.send(JSON.stringify(error));
                  });
        } else {
          res.send(JSON.stringify({
            result: false,
            message: 'Please provide valid task action',
            data: [],
          }));
        }
      } else {
        res.send(JSON.stringify({
          result: false,
          message: 'Please provide valid controller',
          data: [],
        }));
      }
    });
  }
};
