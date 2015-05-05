$("#saveBio").hide();
$("#saveStatus").hide();
$('#saveCollege').hide();
$('#saveSkill').hide();
$('#saveCertification').hide();
$('#saveDegree').hide();
$('#saveCname').hide();
$('#saveTitle').hide();
$('#saveLocation').hide();
//$("#saveurl").hide();

$.ajax({
    type: "GET",
    url: "/profile/"+$("#userid").val(),
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    success: function( d ) {
       //var d = JSON.stringify(d);
       //alert(d);
       $("#bio").val(d.Item.bio.S);
       $("#status").val(d.Item.status.S);
       
       
       if(d.Item.college){
    	   $("#college").val(d.Item.college.SS[0]);
       }
       if(d.Item.location){
    	   $("#location").val(d.Item.location.SS[0]);
       }
       if(d.Item.job_title){
    	   $("#title").val(d.Item.job_title.SS[0]);
       }
       if(d.Item.degree){
    	   $("#degree").val(d.Item.degree.SS[0]);
       }
       if(d.Item.company){
    	   $("#cname").val(d.Item.company.SS[0]);
       }
       if(d.Item.skill){
    	   $("#skill").val(d.Item.skill.SS[0]); 
       }
       if(d.Item.certification){
    	   $("#certification").val(d.Item.certification.SS[0]);
       }
       if(d.Item.user_followed){
    	   var length_of_user_followed = d.Item.user_followed.SS.length;
    	   for(var i=0;i<length_of_user_followed;i++)
    	   {
    	   		var usernameid = getName(d.Item.user_followed.SS[i]);
    	   		var html = '<li class="list-group-item">'+usernameid+'</li>';
    	   		$('#listForUser').append($(html));
    	   }
       }
       
       if(d.Item.company_followed){
    	   var length_of_company = d.Item.company_followed.SS.length;
           
           for(var i=0;i<length_of_company;i++)
    	   {
    	   		var html = '<li class="list-group-item">'+d.Item.company_followed.SS[i]+'</li>';
    	   		$('#listForCompany').append($(html));
    	   }  
       }
       //$("#overviewText").val(d.data[0].overview);
       //$("#urlText").val(d.data[0].url);
    }
});
/*$.ajax({
    type: "GET",
    url: "/profile/002",
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    success: function(d) {
       //var d = JSON.stringify(d);
       //alert(d);
       $("#bio").val(d.Item.bio.S);
       $("#status").val(d.Item.status.S);
             
       var length_of_user_followed = d.Item.user_followed.SS.length;
       
       for(var i=0;i<length_of_user_followed;i++)
    	   {
    	   		var html = '<li class="list-group-item">'+d.Item.user_followed.SS[i]+'</li>';
    	   		$('#listForUser').append($(html));
    	   }
       
       var length_of_college = d.Item.college.SS.length;
       
       for(var i=0;i<length_of_college;i++)
	   {
	   		var html = '<li class="list-group-item">'+d.Item.college.SS[i]+'</li>';
	   		$('#listForCollege').append($(html));
	   }
       
       var length_of_skill = d.Item.skill.SS.length;
       
       for(var i=0;i<length_of_skill;i++)
	   {
	   		var html = '<li class="list-group-item">'+d.Item.skill.SS[i]+'</li>';
	   		$('#listForSkill').append($(html));
	   }
       
       var length_of_certificate = d.Item.certification.SS.length;
       
       for(var i=0;i<length_of_certificate;i++)
	   {
	   		var html = '<li class="list-group-item">'+d.Item.certification.SS[i]+'</li>';
	   		$('#listForCertificate').append($(html));
	   }
     
       var length_of_company = d.Item.company_followed.SS.length;
       
       for(var i=0;i<length_of_company;i++)
	   {
	   		var html = '<li class="list-group-item">'+d.Item.company_followed.SS[i]+'</li>';
	   		$('#listForCompany').append($(html));
	   }
       //$("#overviewText").val(d.data[0].overview);
       //$("#urlText").val(d.data[0].url);
    }
});
*/
$(document).ready(function(){
		
		$('#profile').click(function(){
		
				window.location = "/userprofile";
	
			})
			
		$('#jobapp').click(function(){
		
				window.location = "/userapplication/"+$("#userid").val();
	
			})
			
		$('#job').click(function(){
				window.location = '/showJobs';
			})

		$('#search').click(function(){
				window.location =  '/searchPage';
			})
		var username = getName($('#userid').val());
		$('#uname').html(username);
		 $( "#editBio" ).click(function() {
		        $("#editBio").hide();
		        $("#saveBio").show();
		        $("#bio").prop('disabled', false);
		      });

		      $( "#saveBio" ).click(function() {
		        var bio = $("#bio").val();
		          
		        var bioObj = {
		        		bio : bio
		        }
		        $.ajax({
		          type: "POST",
		          url: "/bio/"+$("#userid").val(),
		          contentType: "application/json; charset=UTF-8",
		          dataType: 'json',
		          data: JSON.stringify(bioObj),
		          crossDomain : true,
		          success: function( d ) {
		             console.log(d);
		          }
		        });
		        $("#saveBio").hide();
		        $("#editBio").show();
		        $("#bio").prop('disabled', true);
		      });
		      
		    //-------------edit bio ends ----------------------------------
		      
		      $( "#editStatus" ).click(function() {
			        $("#editStatus").hide();
			        $("#saveStatus").show();
			        $("#status").prop('disabled', false);
			      });

			      $( "#saveStatus" ).click(function() {
			        var status = $("#status").val();
			          
			        var statusObj = {
			        		status : status
			        }
			        $.ajax({
			          type: "POST",
			          url: "/status/"+$("#userid").val(),
			          contentType: "application/json; charset=UTF-8",
			          dataType: 'json',
			          data: JSON.stringify(statusObj),
			          crossDomain : true,
			          success: function( d ) {
			             console.log(d);
			          }
			        });
			        $("#saveStatus").hide();
			        $("#editStatus").show();
			        $("#status").prop('disabled', true);
			      });
			     
			      //-------------edit status ends ----------------------------------
			      
			      $( "#addCollege" ).click(function() {
				        $("#addCollege").hide();
				        $("#saveCollege").show();
				        $("#college").prop('disabled', false);
				      });

				      $( "#saveCollege" ).click(function() {
				        var college = $("#college").val();
				        var university = new Array();
				        university.push(college);
				        
				        var collegeObj = {
				        		college : university
				        };
				        $.ajax({
				          type: "POST",
				          url: "/college/"+$("#userid").val(),
				          contentType: "application/json; charset=UTF-8",
				          dataType: 'json',
				          data: JSON.stringify(collegeObj),
				          crossDomain : true,
				          success: function( d ) {
				             console.log(d);
				          }
				        });
				        $("#saveCollege").hide();
				        $("#addCollege").show();
				        $("#college").prop('disabled', true);
				      });
				      
				      //---------------------add college ends-----------------------

				      $( "#editCname" ).click(function() {
				        $("#editCname").hide();
				        $("#saveCname").show();
				        $("#cname").prop('disabled', false);
				      });

				      $( "#saveCname" ).click(function() {
				        var company = $("#cname").val();
				        var obj = new Array();
				        obj.push(company);
				        
				        var companyObj = {
				        		company : obj
				        };
				        $.ajax({
				          type: "POST",
				          url: "/companyone/"+$("#userid").val(),
				          contentType: "application/json; charset=UTF-8",
				          dataType: 'json',
				          data: JSON.stringify(companyObj),
				          crossDomain : true,
				          success: function( d ) {
				             console.log(d);
				          }
				        });
				        $("#saveCname").hide();
				        $("#editCname").show();
				        $("#cname").prop('disabled', true);
				      });
				      
				      //---------------------add company ends-----------------------  
				      
				      $( "#editTitle" ).click(function() {
				        $("#editTitle").hide();
				        $("#saveTitle").show();
				        $("#title").prop('disabled', false);
				      });

				      $( "#saveTitle" ).click(function() {
				        var job_title = $("#title").val();
				        var obj = new Array();
				        obj.push(job_title);
				        
				        var titleObj = {
				        		job_title : obj
				        };
				        $.ajax({
				          type: "POST",
				          url: "/job_title/"+$("#userid").val(),
				          contentType: "application/json; charset=UTF-8",
				          dataType: 'json',
				          data: JSON.stringify(titleObj),
				          crossDomain : true,
				          success: function( d ) {
				             console.log(d);
				          }
				        });
				        $("#saveTitle").hide();
				        $("#editTitle").show();
				        $("#title").prop('disabled', true);
				      });
				      
				      //---------------------add job title ends----------------------- 
				      
				      $( "#editLocation" ).click(function() {
				        $("#editLocation").hide();
				        $("#saveLocation").show();
				        $("#location").prop('disabled', false);
				      });

				      $( "#saveLocation" ).click(function() {
				        var location = $("#location").val();
				        var obj = new Array();
				        obj.push(location);
				        
				        var locationObj = {
				        		location : obj
				        };
				        $.ajax({
				          type: "POST",
				          url: "/location/"+$("#userid").val(),
				          contentType: "application/json; charset=UTF-8",
				          dataType: 'json',
				          data: JSON.stringify(locationObj),
				          crossDomain : true,
				          success: function( d ) {
				             console.log(d);
				          }
				        });
				        $("#saveLocation").hide();
				        $("#editLocation").show();
				        $("#location").prop('disabled', true);
				      });
				      
				      //---------------------add location ends----------------------- 
				      
				      $( "#addDegree" ).click(function() {
				        $("#addDegree").hide();
				        $("#saveDegree").show();
				        $("#degree").prop('disabled', false);
				      });

				      $( "#saveDegree" ).click(function() {
				        var degree = $("#degree").val();
				        var obj = new Array();
				        obj.push(degree);
				        
				        var degreeObj = {
				        		degree : obj
				        };
				        $.ajax({
				          type: "POST",
				          url: "/degree/"+$("#userid").val(),
				          contentType: "application/json; charset=UTF-8",
				          dataType: 'json',
				          data: JSON.stringify(degreeObj),
				          crossDomain : true,
				          success: function( d ) {
				             console.log(d);
				          }
				        });
				        $("#saveDegree").hide();
				        $("#addDegree").show();
				        $("#degree").prop('disabled', true);
				      });
				      
				      //---------------------add degree ends-----------------------
				      
				      $( "#addSkill" ).click(function() {
					        $("#addSkill").hide();
					        $("#saveSkill").show();
					        $("#skill").prop('disabled', false);
					      });

					      $( "#saveSkill" ).click(function() {
					        var skill = $("#skill").val();
					        var skills = new Array();
					        skills.push(skill);
					        
					        var skillObj = {
					        		skill : skills
					        };
					        $.ajax({
					          type: "POST",
					          url: "/skill/"+$("#userid").val(),
					          contentType: "application/json; charset=UTF-8",
					          dataType: 'json',
					          data: JSON.stringify(skillObj),
					          crossDomain : true,
					          success: function( d ) {
					             console.log(d);
					          }
					        });
					        $("#saveSkill").hide();
					        $("#addSkill").show();
					        $("#skill").prop('disabled', true);
					      });
				      
			      	//---------------skill ends here---------------------------------
					      
					      $( "#addCertification" ).click(function() {
						        $("#addCertification").hide();
						        $("#saveCertification").show();
						        $("#certification").prop('disabled', false);
						      });

						      $( "#saveCertification" ).click(function() {
						        var certi = $("#certification").val();
						        var certification = new Array();
						        certification.push(certi);
						        
						        var CertificationObj = {
						        		certification : certification
						        };
						        $.ajax({
						          type: "POST",
						          url: "/certification/"+$("#userid").val(),
						          contentType: "application/json; charset=UTF-8",
						          dataType: 'json',
						          data: JSON.stringify(CertificationObj),
						          crossDomain : true,
						          success: function( d ) {
						             console.log(d);
						          }
						        });
						        $("#saveCertification").hide();
						        $("#addCertification").show();
						        $("#certification").prop('disabled', true);
						      });
						      
						      // ------------edit certification ends here-------
						      
						      $( "#postStatus" ).click(function() {
							        var status = $("#statusText").val();
							        var postStatus = new Array();
							        postStatus.push(status);
							        
							        var postObject = {
							        		post : postStatus
							        };
							        
							        $.ajax({
							          type: "POST",
							          url: "/posts",
							          contentType: "application/json; charset=UTF-8",
							          dataType: 'json',
							          data: JSON.stringify(postObject),
							          crossDomain : true,
							          success: function( d ) {
							             console.log(d);
							          }
							        });
							        $('#statusText').val('');
							        //$("#saveCertification").hide();
							        //$("#addCertification").show();
							        //$("#certification").prop('disabled', true);
							      });
})

function getName(id){
	
	var name;
	
	$.ajax({
	    type: "GET",
	    url: "/getName/"+id,
	    crossDomain : true,
	    contentType: "application/json; charset=UTF-8",
	    dataType: 'json',
	    async : false,
	    success: function( d ) {
	    	
	    	name = d[0].firstname + " " + d[0].lastname;
	    
	    	//return false;
	    }
	
	});
	
	return name;
}
