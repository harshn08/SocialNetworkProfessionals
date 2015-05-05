/**
 * User Related Queries
 */
var conn = require('../model/dbConnection');
var pool = conn.getPoolInstance();

exports.signUp = function(email, password, firstName, lastName,userType, callback) {

	var query = "insert into users "
			+ "(firstname,lastname,email,password,user_type,lastLoggedIn)"
			+ "values (?,?,?,?,?,now());";
	pool.getConnection(function(err, connection) {
		connection.query(query, [ firstName, lastName, email, password,userType],
				function(regerr, rows) {

					if (regerr) {
						pool.releaseConnection(connection);
						console.log("Error regiter user : " + regerr);
					} else {
						pool.releaseConnection(connection);
						callback(regerr, rows);
					}
				});
	});

}


exports.signIn = function(userName, password, callback) {

	console.log("USERNAME: " + userName + " Password: " + password);
	var sql = 'SELECT firstname,lastname,user_Id,user_type,lastLoggedIn FROM users where email = ? and password = ?';
	console.log(sql);
	var authResults;
	pool.getConnection(function(err, connection) {
		connection.query(sql, [ userName, password ], function(err, rows) {
			console.log(rows);
			authResults = rows;
			if(err){
				pool.releaseConnection(connection);
				console.log("ERROR: " + err.message);
			}
			else{
				
				if (rows.length !== 0) {
					var updateLoginTimeSql = "update users set lastLoggedIn = now() where user_id="+rows[0].user_id;
					connection.query(updateLoginTimeSql,function(){
						pool.releaseConnection(connection);
						callback(err,authResults);
					});
				} else {
					console.log("no user with this credentials");
					pool.releaseConnection(connection);
					callback(err, rows);
				}
				
			}
			
		});

	});
}


exports.searchUsers = function(firstName, lastName, callback) {

	console.log(" Name: " + firstName +" " + lastName);
	var sql = 'SELECT firstname, lastname, user_Id FROM users WHERE (firstname LIKE CONCAT("%","' + firstName + '","%") AND lastname LIKE CONCAT("%","'+ lastName +'","%")) OR (firstname LIKE CONCAT("%","' + firstName + '","%")) OR (lastname LIKE CONCAT("%","' + firstName + '","%")) ';
	console.log("QUERY: " + sql);
	pool.getConnection(function(err, connection) {
		connection.query(sql, [ firstName, lastName ], function(err, rows) {
			console.log(rows);
			if(err){
				console.log("no users exist with these search parameters");
				pool.releaseConnection(connection);
				callback(err, rows);
			}
			else {
				pool.releaseConnection(connection);
				callback(err, rows);

			}
		});

	});
}

exports.isUserPresent = function(email,callback){
	
	var queryusername="select email from users where email = ?";
	pool.getConnection(function(err, connection) {
		  connection.query( queryusername,[email], function(err, rows) {
		    connection.release();
		    if(err){
		    	pool.releaseConnection(connection);
		    	console.log("Error check username available : "+err);
		    }
		    else{
		    	console.log(rows);
		    	var isunique = false;
		    	if(rows.length > 0){
		    		 isunique = true;    		
		    	}
		    	pool.releaseConnection(connection);
		    	 callback(err,isunique);
		    }
		  }); 
		}); 
}

exports.getName = function(userId, callback) {


	console.log(" userId: " + userId);

	var sql = 'SELECT firstname, lastname FROM users where user_Id = ?';

	console.log(sql);

	pool.getConnection(function(err, connection) {

	connection.query(sql, [ userId ], function(err, rows) {

	console.log(rows);

	if (rows.length !== 0) {
		
	pool.releaseConnection(connection);	
	callback(err, rows);


	} else {

	console.log("no users exist with these search parameters");
	pool.releaseConnection(connection);
	callback(err, rows);

	}

	});


	});

	}