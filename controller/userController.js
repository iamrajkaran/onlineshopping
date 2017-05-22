const userService = require('../model/user');
const Promise = require('promise');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = (function userController() {
     

  const authUser = function authUser(app,req) {
    return new Promise((resolve, reject) => {
      userService.getAuthUser(app,req)
            .then((respData) => { 
              if(respData===1){
                 var token = jwt.sign(req.query, app.get('secretKey'), {
                   expiresIn : 1
                 });
                resolve({
                result: true,
                message: "User is authenticated",
                token: token
                });
              }else if(respData===0){
                resolve({
                result: true,
                message: "Invalid Username and password",
                });
              }else{
                resolve({
                result: true,
                message: "No user exist",
                });
              }
            })
              .catch((error) => {
                console.log(error)
                reject({
                  result: false,
                  message: error,
                });
              });
    });
  };

  const userData = function userData(app) {
    return new Promise((resolve, reject) => {
      userService.getUserData(app)
            .then((respData) => { 
               resolve({
                result: true,
                message:  respData,
                });
           
            })
              .catch((error) => {
                console.log(error)
                reject({
                  result: false,
                  message: error,
                });
              });
    });
  };

   const createUser = function createUser(app, req) {
    return new Promise((resolve, reject) => {
      userService.createUserData(app, req)
            .then((respData) => {
              if(respData=="ER_DUP_ENTRY")
              resolve({
                result: false,
                message: "Duplicate User Not allowed",
              });
                
              resolve({
                result: true,
                message: respData,
              });
            })
              .catch((error) => {
                console.log(error)
                reject({
                  result: false,
                  message: error,
                });
              });
    });
  };

  const updateUserData = function updateUserData(app, req) {
    return new Promise((resolve, reject) => {
      userService.updateUserData(app, req)
            .then((respData) => {
              resolve({
                result: true,
                message: respData,
              });
            })
              .catch((error) => {
                console.log(error)
                reject({
                  result: false,
                  message: error,
                });
              });
    });
  };

  const deleteUserData = function deleteUserData(app, req) {
    return new Promise((resolve, reject) => {
      userService.deleteUserData(app, req)
            .then((respData) => {
              resolve({
                result: true,
                message: respData,
              });
              
            })
              .catch((error) => {
                console.log(error)
                reject({
                  result: false,
                  message: error,
                });
              });
    });
  };



  return {
    authUser,
    userData,
    createUser,
    updateUserData,
    deleteUserData
  };
}());
