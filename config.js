var mysql = require('mysql');
var client = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'shopdb'
});


client.connect(function(err) {
    if (err) console.log(err);
});


module.exports = {
	"client":client,
	"secretKey":"onlineShopping"
}