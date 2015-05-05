var dbConn = require('../model/dbConnection');
var db = dbConn.getDBconnection();
var uuid = require('node-uuid');
var fs = require("fs");
var cprofile = require('./companyprofile');

var client = dbConn.getRedisConnection();
/*var redis = require("redis");
var client = redis.createClient(6379,"127.0.0.1");*/
//redis-cmpe282.cysnho.0001.usw1.cache.amazonaws.com
var dynamo = dbConn.getAWSConnection();

exports.getSearchView = function(req,res){
	res.render('search');
}

exports.getCompanyProfileViewName = function(req,res){
	var query = req.params.companyName;
	client.get(query, function(err, companyId) {
		res.render('companyprofile', {companyId:companyId});
	}); 
}

exports.getCompanyView = function(req,res){
	console.log(req.session.companyId);
	res.render('companyhomepage', {companyId:req.session.companyId});
}

exports.getCompanyRegisterView = function(req,res){
	console.log(req.session.companyId);
	res.render('companydetailsregistration', {companyId:req.session.companyId});
}

exports.getCompanyProfile = function(req,res){
	var companyId = parseInt(req.params.companyId);
	console.log("  cid  "+companyId);
	db.table('companyprofile').having('companyId').eq(companyId).scan(
	function(err, data) {
		if(!err){
			res.status(200).json({data : data});
		}
	});
}

exports.insertCompanyProfile = function(req,res){	
	var companyId = req.session.companyId;
	var companyName = req.body.name;
	var overview = req.body.overviewText;
	var url = req.body.urlText;
	
	db.table('companyprofile').insert({
		companyId : companyId,
		companyName : companyName,
		overview : overview,
		url : url,
		logo : "junk",
		numFollowers : 0,
		status : "We are online!!! Do visit our official page!!!"
	},function(err,data) {
		if(err){
			console.log("Error: "+err);
			res.status(400).json({errmsg:err});
		}else{
			client.set(companyName, companyId);
			res.status(200).json({msg:'insert success', companyId:companyId});
		}
    });
}

exports.changeCompanyLogo = function(req,res){
	var companyId = parseInt(req.params.companyId);

	fs.readFile(req.files.logo.path, function (err, data) {
	  fs.writeFile("./public/uploads/"+req.files.logo.name, data, function (err) {
		  cprofile.updateCompanyLogo(req, res, "./uploads/"+req.files.logo.name, companyId, req.body.cId);
	  });
	});
}

exports.updateCompanyLogo = function(req, res, path, companyId, redirectAction){
	db.table('companyprofile').where('companyId').eq(companyId).update({
		logo: path
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			res.redirect('/companyhomepage');
		}
	});
}

exports.updateCompanyName = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var name = req.body.name;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		companyName : name
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			//console.log( data );
			//res.status(200).json({msg:'update success'});
			res.redirect("/");
		}
	});
}

exports.updateCompanyOverview = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var overview = req.body.overview;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		overview: overview
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.updateCompanyURL = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var url = req.body.urlO;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		url: url
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.getCompanyFollowers = function(req,res){
	var companyId = req.params.companyId;
	var userId = req.body.id;
	console.log(companyId+"  "+userId);
	client.get("follow"+companyId, function(err, result) {
		console.log(result);
		if(result === null){
			console.log("no data");
		}else{
			var flag = false;
			var splitArr = result.split(",");
			for (i = 0; i < splitArr.length; i++) { 
				console.log(splitArr[1]);
			    if(splitArr[i] === userId.toString()){
			    	flag = true;
			    }
			}
		}
		if(flag){
			res.json({msg:'true'});
		}else{
			res.json({msg:'false'});
		}
	});
}

exports.addCompanyFollower = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var userId = req.body.id;
	
	client.get("follow"+companyId, function(err, result) {
		client.set("follow"+companyId, result+","+userId);
	});
	
	db.table('companyprofile').where('companyId').eq(companyId).increment({
		numFollowers : 1
    }, function( err, data ) {
    	if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'follower added'});
		}
    });
}

exports.updateCompanyStatus = function(req,res){
	var companyId = parseInt(req.params.companyId);
	var status = req.body.status;
	
	db.table('companyprofile').where('companyId').eq(companyId).update({
		status: status
	}, function( err, data ) {
		if(err){
			console.log( err );
			res.status(400).json({errmsg:err});
		}else{
			console.log( data );
			res.status(200).json({msg:'update success'});
		}
	});
}

exports.autoCompleteCompanySearch = function(req,res){
	var query = req.body.query+"*";
	console.log(query);
	client.keys(query, function(err, reply) {
	    console.log(reply);
		res.send(reply);
	});
}

exports.companySearch = function(req,res){
	var query = req.body.name+"*";
	console.log(query);
	client.keys(query, function(err, ids) {
		var result = [];
		var counter = 0;
		ids.forEach(function (key, pos) {
	    	client.get(key, function(err, companyId) {
	    		console.log(companyId);
	    		cprofile.companyData(parseInt(companyId), function(err, data){
	    			if(!err){
	    				result.push(data);
	    				counter++;
	    				if(counter == ids.length){
	    					console.log(result);
	    					res.send(JSON.stringify(result));
	    				}
	    			}
	    		});
	    	}); 
	    });
	});
}

exports.companyData = function(companyId, callback){
	db.table('companyprofile').having('companyId').eq(companyId).scan(
		function(err, data) {
		var companies = {};
		if(!err){
			companies.id = companyId;
			companies.name = data[0].companyName;
			companies.overview = data[0].overview;
			callback(err, companies);
		}else{
			callback(err, companies);
		}
	});
}

exports.loadcompanyIds = function(req, res){
	db.table('companyprofile').scan(function(err, data) {
		for(var i=0;i<data.length;i++){
			console.log(data[i].companyName+"  "+data[i].companyId);
			client.set(data[i].companyName, data[i].companyId);
		}	
	});
}
/*
"skill":{
	"Value" :{
		"SS": skill
	},
"Action":"ADD"
},
"certification":{
	"Value" :{
		"SS": certification
	},
"Action":"ADD"
},
"user_followed":{
	"Value" :{
		"SS": user_followed
	},
"Action":"ADD"
},
"post":{
	"Value" :{
		"SS": post
	},
"Action":"ADD"
},
"company_followed":{
	"Value" :{
		"SS": company_followed
	},
"Action":"ADD"
},*/
var dynamo = dbConn.getAWSConnection();
var basicCSV = require("basic-csv");
exports.addUserProfiles = function(req, res){
	basicCSV.readCSV("csvnew.csv", {
		  dropHeader: true
		}, function (error, rows) {
		  console.log(rows.length);
		  for(var i=0;i<1;i++){
			  //if(i==0){
			  var row = rows[i];
			  //console.log(row);
			  var id = i+1;
			  var college = [];
			  college.push(row[0].replace("'","").replace("'",""));
			  var location = [];
			  location.push(row[1].replace("'","").replace("'",""));
			  var company = [];
			  company.push(row[2].replace("'","").replace("'",""));
			  var job_title = [];
			  job_title.push(row[3].replace("'","").replace("'",""));
			  var degree = [];
			  degree.push(row[4].replace("'","").replace("'",""));
			  var post = [];
			  post.push("Hi");
			  var user_followed = [];
			  user_followed.push("");
			  var company_followed = [];
			  company_followed.push("");
			  var skill = [];
			  skill.push("");
			  var certification = [];
			  certification.push("");
			  console.log(college);
			  console.log(location);
			  console.log(company);
			  console.log(job_title);
			  console.log(degree);
			  dynamo.updateItem(
					    {"TableName":"user_profile",
					        "Key":{
					            "user_id":{
					            	"S":id+""
					            	}
					        },
					        "AttributeUpdates":{
					        	"bio":{
					        		"Value" :{
					        			"S":"!!!"
					        		},
					        	"Action":"PUT"
					        	},
					        	"status":{
					        		"Value" :{
					        			"S":"Hi"
					        		},
					        	"Action":"PUT"
					        	},
					        	"college":{
					        		"Value" :{
					        			"SS": college
					        		},
					        	"Action":"ADD"
					        	},
					        	"location":{
					        		"Value" :{
					        			"SS": location
					        		},
					        	"Action":"ADD"
					        	},
					        	"company":{
					        		"Value" :{
					        			"SS": company
					        		},
					        	"Action":"ADD"
					        	},
					        	"job_title":{
					        		"Value" :{
					        			"SS": job_title
					        		},
					        	"Action":"ADD"
					        	},
					        	"degree":{
					        		"Value" :{
					        			"SS": degree
					        		},
					        	"Action":"ADD"
					        	}
					        }
					    }, function(err,data) {
					    	/*console.log("Error______"+err);
							console.log(data);*/
					});
			  //}
			}
		});
}

exports.logout = function(req, res){
	req.session.companyId = null;
	res.render('login');
}