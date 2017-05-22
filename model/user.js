const Promise = require('promise');

module.exports = (function userService() {
    

    const getAuthUser = function getAuthUser(app,req) {
        return new Promise((resolve) => {
        try{
            var getSql = "SELECT COUNT(*) as authenticated from supplier WHERE supplier_email='"+req.query.username+"' AND password='"+req.query.password+"'";
            app.get('client').query(getSql, function (err, results, fields) {
                if (err)
                console.log("Error in get");
            console.log(results[0].authenticated);
                resolve(results[0].authenticated);
            })
        }
        catch(error) {
            console.log("Error",error)
        }
        });
    };


    const getUserData = function getUserData(app) {
        return new Promise((resolve) => {
        try{
            var getSql = "SELECT id, supplier_email,supplier_name,password from supplier";   
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

    const createUserData = function createUserData(app,req) {
        return new Promise((resolve) => {
        try{   
            var addSql = "INSERT INTO supplier (supplier_email,supplier_name,password) VALUES('"+req.body.supplier_email+"','"+req.body.supplier_name+"','"+req.body.password+"')";
            app.get('client').query(addSql,function (err, results, fields) {
                if(err){
                    if(err.code=="ER_DUP_ENTRY")
                    resolve(err.code)      
                }
                resolve(results);
            })
        }
        catch(error) {
            console.log("Error",error)
        }

        });
    };

    const updateUserData = function updateUserData(app,req) {
        return new Promise((resolve) => {
        try{   
 
            var updateSql = "UPDATE supplier SET supplier_email='"+req.body.supplier_email+"',supplier_name='"+req.body.supplier_name+"',password='"+req.body.password+"' WHERE id ="+req.body.id;
             
            app.get('client').query(updateSql,function (err, results, fields) {
                if (err)
                console.log("Error in update",err);
                
                if(results.affectedRows==1){
                    resolve(results);
                }else if(results.affectedRows==0){
                    resolve("User Not exist for "+req.body.id);
                }
            })
        }
        catch(error) {
            console.log("Error",error)
        }


        });
    };

    const deleteUserData = function deleteUserData(app,req) {
        return new Promise((resolve) => {
        try{   
            var deleteSql = "DELETE FROM supplier WHERE id ="+req.body.id;
            app.get('client').query(deleteSql,function (err, results, fields) {
                
                if (err)
                console.log("Error in delete",err);

                if(results.affectedRows==1){
                    resolve(results);
                }else if(results.affectedRows==0){
                    resolve("User Not exist for "+req.body.id);
                }
                
            })
        }
        catch(error) {
            console.log("Error",error)
        }


        });
    };

  return {
    getAuthUser,
    getUserData,
    createUserData,
    updateUserData,
    deleteUserData
  };
}());
