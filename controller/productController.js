const productService = require('../model/product');
const Promise = require('promise');
// TODO --> Validation of promise code via linter
module.exports = (function productController() {
    /**
     * @description Function will pick log Data from rcschedule based on parameters
     * @param app application object
     */

  const productData = function productData(app) {
    return new Promise((resolve, reject) => {
      productService.getProductData(app)
            .then((respData) => {
                resolve({
                result: true,
                message: respData
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

   const searchProduct = function searchProduct(app,search) {
    return new Promise((resolve, reject) => {
      productService.searchProductData(app,search)
            .then((respData) => {
              if(respData=''){
                resolve({
                result: true,
                message: respData,
                });
              }else{
                resolve({
                result: true,
                message: "No product exist",
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

   const createProduct = function createProduct(app, req) {
    return new Promise((resolve, reject) => {
      productService.createProductData(app, req)
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

  const updateProductData = function updateProductData(app, req) {
    return new Promise((resolve, reject) => {
      productService.updateProductData(app, req)
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

  const deleteProductData = function deleteProductData(app, req) {
    return new Promise((resolve, reject) => {
      productService.deleteProductData(app, req)
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
    productData,
    searchProduct,
    createProduct,
    updateProductData,
    deleteProductData
  };
}());
