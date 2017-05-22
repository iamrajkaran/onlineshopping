const Promise = require('promise');

module.exports = (function ProductService() {
            
    const getProductData = function getProductData(app) {
        return new Promise((resolve) => {
        try{
        	var getSql = "SELECT supplier_id,product_name,product_description,status from product";    
            app.get('client').query(getSql, function (err, results, fields) {
                if (err)
                console.log("Error in get");
                resolve(results);
            })
        }
        catch(error) {
            console.log("Error",error)
        }
        });
    };


    const searchProductData = function searchProductData(app,search) {
        return new Promise((resolve) => {
        try{
            var getSql = "SELECT supplier_id,product_name,product_description,status from product WHERE product_name LIKE '%"+search+"%'";    
            console.log(getSql)
            app.get('client').query(getSql, function (err, results, fields) {
                if (err)
                console.log("Error in get",err);
                resolve(results);
            })
        }
        catch(error) {
            console.log("Error",error)
        }
        });
    };

    const createProductData = function createProductData(app,req) {
	    return new Promise((resolve) => {
	    try{   
	        var addSql = "INSERT INTO product (supplier_id,product_name,product_description,status,created_time) VALUES('"+req.body.supplier_id+"','"+req.body.product_name+"','"+req.body.product_description+"','"+req.body.status+"',NOW())";
	        app.get('client').query(addSql,function (err, results, fields) {
	            if (err)
	            console.log("Error in create",err);
	            resolve(results);
	        })
	    }
	    catch(error) {
	        console.log("Error",error)
	    }

	    });
    };

    const updateProductData = function updateProductData(app,req) {
        return new Promise((resolve) => {
        try{   
 
            var updateSql = "UPDATE product SET product_name='"+req.body.product_name+"',product_description='"+req.body.product_description+"',status='"+req.body.status+"' WHERE product_id ="+req.body.product_id;
            app.get('client').query(updateSql,function (err, results, fields) {
                if (err)
                console.log("Error in update",err);

                if(results.affectedRows==1){
                    resolve(results);
                }else if(results.affectedRows==0){
                    resolve("Product Not exist for "+req.body.id);
                }

            })
        }
        catch(error) {
            console.log("Error",error)
        }


        });
    };

    const deleteProductData = function deleteProductData(app,req) {
        return new Promise((resolve) => {
        try{   
 
            var deleteSql = "DELETE FROM product WHERE product_id ="+req.body.product_id;
            app.get('client').query(deleteSql,function (err, results, fields) {
                if (err)
                console.log("Error in delete",err);
                
                if(results.affectedRows==1){
                    resolve(results);
                }else if(results.affectedRows==0){
                    resolve("Product Not exist for "+req.body.id);
                }

            })
        }
        catch(error) {
            console.log("Error",error)
        }


        });
    };

  return {
    getProductData,
    searchProductData,
    createProductData,
    updateProductData,
    deleteProductData
  };
}());
 
 