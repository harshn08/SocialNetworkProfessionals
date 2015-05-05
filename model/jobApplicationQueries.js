/**
 * New node file
 */

var conn = require('../model/dbConnection');
var pool = conn.getPoolInstance();


exports.postJobApplication = function(jobId, userId, companyId, companyName, status, callback) {

	var query = "insert into job_applications "
			+ "(job_id,user_id,company_id,company_name,status,application_date)"
			+ "values (?,?,?,?,?,now());";
	pool.getConnection(function(err, connection) {
		connection.query(query, [ jobId, userId, companyId, companyName, status],
				function(err, rows) {

					if (err) {
						pool.releaseConnection(connection);
						console.log("Error in inserting job application : " + err);
					} else {
						pool.releaseConnection(connection);
						callback(err, rows);
					}
				});
	});

}

exports.getJobApplication = function(userId, callback) {

	console.log(" userId: " + userId);
	var sql = 'SELECT company_name,job_id,company_id,status,application_date FROM job_applications where user_id = ?';
	console.log(sql);
	pool.getConnection(function(err, connection) {
		connection.query(sql, [ userId ], function(err, rows) {
			console.log(rows);
			if (rows.length !== 0) {
				pool.releaseConnection(connection);
				callback(err, rows);

			} else {
				pool.releaseConnection(connection);
				console.log("no job with these search parameters");
				callback(err, rows);
			}
		});

	});
}

exports.updateJobStatus = function(jobId, userId, status, callback){
	
	var sql = 'SELECT * FROM job_applications WHERE job_id = ? and user_id = ?';
	var sqlupdate = 'UPDATE job_applications SET status = ? WHERE job_id = ? and user_id = ?';
	console.log(sql);
	pool.getConnection(function(err, connection){
		connection.query(sql, [jobId, userId], function(err,rows){
			if(rows.length !== 0){
			connection.query(sqlupdate,[status, jobId, userId]);
			callback(err,rows);
			pool.releaseConnection(connection);
			console.log("Job status updated successfully.");
			} else {
				pool.releaseConnection(connection);
				console.log("no job with these search parameters");
				callback(err, rows);
			}
		});
	});
}
