$("#savename").hide();
$("#saveoverview").hide();
$("#saveurl").hide();

$(document).ready(function(){
      
      $( "#editname" ).click(function() {
        $("#editname").hide();
        $("#savename").show();
        $("#name").prop('disabled', false);
      });

      $( "#savename" ).click(function() {
        var name = $("#name").val();
          var nameObj = {
          name : name
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/name",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(nameObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#savename").hide();
        $("#editname").show();
        $("#name").prop('disabled', true);
      });

      $( "#editoverview" ).click(function() {
          $("#editoverview").hide();
          $("#saveoverview").show();
          $("#overviewText").prop('disabled', false);
       });
      
      $( "#saveoverview" ).click(function() {
        var overview = document.getElementById('overviewText').value;
          var overviewObj = {
          overview : overview
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/overview",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(overviewObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#saveoverview").hide();
        $("#editoverview").show();
        $("#overviewText").prop('disabled', true);
      });
      
      $( "#editurl" ).click(function() {
          $("#editurl").hide();
          $("#saveurl").show();
          $("#urlText").prop('disabled', false);
       });
      
      $( "#saveurl" ).click(function() {
        var urlO = document.getElementById('urlText').value;
          var urlObj = {
          urlO : urlO
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/url",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(urlObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
        $("#saveurl").hide();
        $("#editurl").show();
        $("#urlText").prop('disabled', true);
      });
      
      $( "#editLogo" ).click(function() {
          $("#editLogo").hide();
          var html = '';
          html += '<form id = "abcupdateLogoForm" enctype = "multipart/form-data" action = "/company/'+document.getElementById("companyId").value+'/logo" method = "post">';
          html += '<input type="file" id="companyLogo" name="logo"/>';
          html += '<input type="text" id="cId" name="cId" value="update" hidden/>';
          html += ' <button id="abcLogo" class="btn btn-success pull-right" type="submit" name="submit">Upload Logo</button><ul class="list-inline"><li></li></ul><br>';
          html += '</form>';
          
          $('#up').append(html);
      });
      $( "#abcLogo" ).click(function() { 
	      $('#abcupdateLogoForm').submit(function() {
	          $(this).ajaxSubmit({
	              error: function(xhr) {
	                      status('Error: ' + xhr.status);
	              },
	
	              success: function(response) {
	                        console.log(response);
	              }
	          });
	          $("#changeL").hide();
	          return false;
	      });
      });
      
      $( "#postStatus" ).click(function() {
        var status = document.getElementById('statusText').value;
          var statusObj = {
          status : status
        };

        $.ajax({
          type: "POST",
          url: "/company/"+$("#companyId").val()+"/status",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(statusObj),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
             $("#statusText").val("");
          }
        });
      });
      
      $( "#companyProfile" ).click(function() {
    	  var id = document.getElementById('companyId').value;
          var name = document.getElementById('name').value;
          var overviewText = document.getElementById('overviewText').value;
          var urlText = document.getElementById('urlText').value;
          var profileObj = {
        	  id : id,
        	  name : name,
        	  overviewText : overviewText,
        	  urlText : urlText
          };

          $.ajax({
            type: "POST",
            url: "/company",
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            data: JSON.stringify(profileObj),
            crossDomain : true,
            success: function( d ) {
               console.log("id  "+d.companyId);
               var html = '';
               html += '<div class="form-group" name="up">';
               html += '<form id = "uploadForm" enctype = "multipart/form-data" action = "/company/'+d.companyId+'/logo" method = "post">';
               html += '<label for="companyLogo" name="labLogo">Company Logo</label>';
               html += '<input type="file" id="companyLogo" name="logo"/>';
               html += '<input type="text" id="cId" name="cId" value="insert" hidden/>';
               html += ' <button id="cLogo" class="btn btn-success pull-right" type="submit" name="submit">Upload Logo</button><ul class="list-inline"><li></li></ul>';
               html += '</form></div>';
               
               $('#cprofile').append(html);
               $('#cform').hide();
               $("#cId").val(d.companyId);
            }
          });
       });
      
      $('#uploadForm').submit(function() {
          $(this).ajaxSubmit({
              error: function(xhr) {
                      status('Error: ' + xhr.status);
              },

              success: function(response) {
                        console.log(response);
              }
          });
          return false;
      });
      
      $("#followCompany").click(function(){
    	  $.get("/getUserFromSession", function(user) {
    			console.log("USer from session_______"+user);
    			var userId = user;
    			var companyName = $("#name").val();
    			console.log("Company Name____"+companyName);
    			var url = "/company_followed/"+userId;
    			console.log("User "+userId+" Started Following company "+companyName);
    			 var comp = new Array();
    			 comp.push(companyName);
    	        var company_followed = {
    	        		company_followed : comp
    	        };
    	        
    	        $.ajax({
    	            type: "POST",
    	            url: url,
    	            contentType: "application/json; charset=UTF-8",
    	            dataType: 'json',
    	            data: JSON.stringify(company_followed),
    	            crossDomain : true,
    	            success: function( d ) {
    	               console.log(d);
    	            }
    	        });
    	        var userArr=[];
    	        userArr.push(user);
    	        var userObj = {
        	        id : userArr,
        	    };
    	       
    	        $.ajax({
  			      type: "POST",
  			      url: "/company/"+$("#companyId").val()+"/followers",
  			      contentType: "application/json; charset=UTF-8",
  			      dataType: 'json',
  			      data: JSON.stringify(userObj),
  			      crossDomain : true,
  			      success: function( d ) {
  			         console.log(d);
  			         $("#followCompany").hide();
  			         $("#unFollowCompany").show();
  			      }
  			    });
    	  });	
      });
      
      $("#unFollowCompany").click(function(){
    	  $("#unFollowCompany").hide();
    	  $("#followCompany").show();
      });

      $("#postJob").click(function(){
     	 var companyName = $("#name").val();
     	 console.log("Company Name____"+companyName);
     	 var url = "/insertJobDetailsPage/"+companyName; 
     	 window.location = url;
     	  
       });
       
       $("#viewJobs").click(function(){
      	 var url = "/showJobsByCompany"; 
      	 window.location = url;
      	  
        });
});


        