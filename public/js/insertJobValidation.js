$(document).ready(function()
{

   $("#btnPostJob").click(function () 
              {    
              
              var jobTitle =  $("#jobTitle").val(); 
              jobTitle = $.trim(jobTitle);
              if(jobTitle == null || jobTitle == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Job title should not be blank."); 
                $("#jobTitle").focus();
                return false;
              }


              var jobDesc =  $("#jobDesc").val();
              jobDesc = $.trim(jobDesc);
              if(jobDesc == null || jobDesc == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Job Description should not be blank."); 
                $("#jobDesc").focus();
                return false;
              }
              else if(jobDesc.length < 20 )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Enter minimum 20 characters for Job Description."); 
                $("#jobDesc").focus();
                return false;
              }
              
              
              var jobLocation =  $("#jobLocation").val(); 
              jobLocation = $.trim(jobLocation);
              if(jobLocation == null || jobLocation == ""  )
              {
                $("#msginfo").addClass("alert alert-danger"); 
                $("#msginfo").text("Job Location should not be blank."); 
                $("#jobLocation").focus();
                return false;
              }
                      
    });
   
   $('#dp3').datepicker({
	   "setDate": new Date(),
       "autoclose": true
   });

});