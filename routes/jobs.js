/**
 * New node file
 */

var job = require('../model/jobQueries');
var jquery = require('../public/js/jquery-1.11.2.min.js');
var http = require('http');

exports.getJobsByCompany = function(req, res) {
	console.log("getJobsByCompany");
	var companyId = req.session.companyId;
	job.getJobsByCompanyId(companyId, function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while fetching data\n");
		} else {
			console.log("Jobs by company____"+data);
			res.send(data);

		}
	});
}

exports.getJobDetails = function(req, res) {
	var jobId = req.params.jobId;
	job.getJobDetails(jobId, function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while fetching data\n");
		} else {

			res.send(data);

		}
	});
}

exports.getJobs = function(req, res) {
	job.getAllJobs(function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while fetching data\n");
		} else {

			res.send(data);

		}
	});
}

exports.insertJobDetails = function(req, res) {
	var companyId = req.session.companyId;
	var companyName = req.body.companyName;
	var jobTitle = req.body.jobTitle;
	var jobDesc = req.body.jobDesc;
	var expiryDate = req.body.expiryDate;
	var location = req.body.location;
	
	console.log("Company Name______"+companyName);
	job.insertJob(companyId,companyName, jobTitle, jobDesc, expiryDate, location, function(
			err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while inserting data\n");
		} else {
			res.redirect("/companyhomepage");
		}
	});
}

exports.deleteJob = function(req, res) {
	var jobId = req.params.jobId;
	job.deleteJob(jobId, function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while deleting record\n");
		} else {
			res.writeHead(200);
			res.end("Job Deleted Successfully\n");

		}
	});
}

//Method to search Jobs

exports.searchJobs = function(req,res){
	var searchTerm = req.params.searchTerm;
	job.searchJobs(searchTerm,function(err,data){
		if(err){
			res.writeHead(400);
			res.end("Error while searching record\n");
		}else{
			res.send(data);
		}
	});
}

exports.loadJobs = function(req,res){
	job.loadJobsInRedis(function(err,data){
		if(err){
			res.writeHead(400);
			res.end("Error while loading jobs\n");
		}else{
			res.send("Jobs data loaded\n");
		}
	});
}

// Method to show Job Insert Page
exports.showInsertJobDetailsView = function(req, res) {
	console.log("Inside showInsertJobDetailsView");
	var companyName = req.params.companyName;
	var companyId = req.session.userId;
	console.log("CompanyName______"+companyName+ "Id_____"+companyId);
	res.render('insertJobDetails',{companyName:companyName});
}

// Method to show Job Details Page

exports.showJobDetailsView = function(req, res) {
	var jobId = req.params.jobId;
	var userid = req.session.userId;
	console.log("Inside showJobDetailsView");
	job.getJobDetails(jobId, function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while fetching data\n");
		} else {
			
			res.render("jobDetails",{job:data,userId:userid});
			
		}
	});
}

exports.showJobDetailsViewAJAX = function(req, res) {
	var jobId = req.params.jobId;
	var userid = req.session.userId;
	console.log("Inside showJobDetailsView");
	job.getJobDetails(jobId, function(err, data) {
		if (err) {
			res.writeHead(400);
			res.end("Error while fetching data\n");
		} else {
			
			res.send(data);
			
		}
	});
}

// Method to show Job Home Page

exports.showJobsView = function(req, res) {

	res.render("jobsHomePage");

}

exports.showCompanyJobsView = function(req,res){
	res.render("companyJobs");
}
