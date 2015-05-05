/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var session = require('express-session');
var http = require('http');
var path = require('path');
var profile = require('./routes/profile');
var job = require('./routes/jobs');
var jobapp = require('./routes/jobapplication');
var user = require('./routes/users');
var rec = require('./routes/recommend');
var companyprofile = require('./routes/companyprofile');
var index = require('./routes/index');
var events = require('events');
var EventEmitter = events.EventEmitter;
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

app.use(express.cookieParser());
app.use(express.session({
	secret : '1234567890QWERTY'
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(session({
	secret : 'secre session',
	resave : true,
	saveUninitialized : true
}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '\public')));
app.use(express.multipart());

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', index.login);
app.get('/searchPage', index.search); // returns search page
app.get('/homePage', index.home); // returns home page
app.post('/signUp', user.signUp);
app.post('/signIn', user.signIn);
app.get('/logout', user.logout);
app.get('/getUserFromSession', user.getUserFromSession);
app.post('/checkForExistingUser', user.IsUserPresent);
app.get('/searchuser/:str', user.searchUsers);

app.get('/userrec/:userId', rec.getRecommendedUsers);
app.get('/jobrec/:userId', rec.getRecommendedJobs);

app.post('/application', jobapp.postJobApplication);
app.get('/userapplication/:userId', jobapp.getJobApplication);
app.get('/userapplicationAJAX/:userId', jobapp.getJobApplicationAJAX);
app.post('/updatejobstatus/:jobId/:userId', jobapp.updateJobStatus);
app.get('/getName/:userId', user.getName);

app.post('/bio/:userid', profile.insertBio);
app.post('/certification/:userid', profile.insertCertification);
app.post('/skill/:userid', profile.insertSkill);
app.post('/college/:userid', profile.insertCollege);
app.post('/companyone/:userid', profile.insertCompany);
app.post('/degree/:userid', profile.insertDegree);
app.post('/job_title/:userid', profile.insertJobTitle);
app.post('/location/:userid', profile.insertLocation);
app.post('/status/:userid', profile.insertStatus);
app.post('/company_followed/:userid', profile.insertCompanyFollowed);
app.post('/user_followed', profile.insertUserFollowed);
app.get('/user/:userId/companynewsfeed', profile.getCompanyNewsFeed);
app.post('/posts', profile.insertPost);
app.get('/careerPath', profile.showCareerPathPage);
app.get('/getCareerPath/:expPos',profile.getCareerPath);

app.get('/portfolio', profile.getPortfolio); // portfolio page
app.get('/profile/:userid', profile.getProfile); // profile data

app.get('/userprofile', profile.getUserProfile); // profile page

app.get('/insertJobDetailsPage/:companyName', job.showInsertJobDetailsView);
app.get('/showJobDetailsPage/:jobId', job.showJobDetailsView);
app.get('/showJobDetailsPageAJAX/:jobId', job.showJobDetailsViewAJAX);
app.get('/showJobs', job.showJobsView);
app.get('/showJobsByCompany', job.showCompanyJobsView);

app.get('/jobs', job.getJobs);
app.get('/jobs/:jobId', job.getJobDetails);
app.get('/searchJobs/:searchTerm', job.searchJobs);
app.get('/company/jobs', job.getJobsByCompany);
app.post('/company/:companyId/jobs/', job.insertJobDetails);
app.get('/company/:companyId/jobs/:jobId', job.deleteJob);

app.get('/loadJobData', job.loadJobs);

app.get('/searchpage', companyprofile.getSearchView);
app.get('/companyregistrationpage', companyprofile.getCompanyRegisterView);
app.get('/companyhomepage', companyprofile.getCompanyView);
app.get('/companyprofilepagename/:companyName',
		companyprofile.getCompanyProfileViewName);
app.get('/company/logout', companyprofile.logout);

app.post('/company', companyprofile.insertCompanyProfile);
app.get('/company/:companyId', companyprofile.getCompanyProfile);
app.post('/company/:companyId/name', companyprofile.updateCompanyName);
app.post('/company/:companyId/overview', companyprofile.updateCompanyOverview);
app.post('/company/:companyId/url', companyprofile.updateCompanyURL);
app.post('/company/:companyId/logo', companyprofile.changeCompanyLogo);
app.post('/company/:companyId/followerids', companyprofile.getCompanyFollowers);
app.post('/company/:companyId/followers', companyprofile.addCompanyFollower);
app.post('/company/:companyId/status', companyprofile.updateCompanyStatus);
app.post('/company/autocompletelist', companyprofile.autoCompleteCompanySearch);
app.post('/company/companylist', companyprofile.companySearch);

app.post('/dataloader', companyprofile.loadcompanyIds);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
