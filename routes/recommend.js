/*	This is */

var rec = require('../model/recommendQueries');
var jquery = require('../public/js/jquery-1.11.2.min.js');
var http = require('http');

exports.getRecommendedUsers = function(req, res){
	var userid = req.params.userId;
	console.log(userid);
	console.log("Getting the recommended users");
	rec.getUserRecommendation(userid, function(err,data){
		if(err){
			res.writeHead(400);
			res.end("Error getting the recommended users");
		}else{
			res.send(data);
			//console.log(data.Item.recommended_user.NS[0]);
			//console.log(data.Item.recommended_user.NS.length);
		}
	});
}

exports.getRecommendedJobs =  function(req,res){
	var userid = req.params.userId;
	console.log("User ID: " + userid);
	console.log("Getting the recommended jobs");
	rec.getJobRecommendation(userid, function(err,data){
		if(err){
			res.writeHead(400);
			res.end("Error getting the recommended jobs");
		}else{
			res.send(data);
			//console.log("Successfully recieved the data");
			//console.log(data.Item.recommended_job.SS[0]);
		}
	});
}