$.ajax({
	type : "GET",
	url : "/user/"+$("#userid").val()+"/companynewsfeed",
	crossDomain : true,
	success : function(d) {
		var jsonObj = JSON.parse(d);
		var html = "";
		for(i=0;i<jsonObj.length;i++){
			var temp = JSON.parse(escapeSpecialChars(jsonObj[i]));
			console.log(temp.key+"  "+temp.value);
	    	html += '<div class="well well-sm">';
	    	html += '<div class="media">';
	    	html += '<div class="media-body">';
	    	html += '<h4 class="media-heading"> </h4>';
	    	html += '<p>'+ temp.key +' posted this:</p>';
	    	html += '<p>'+ temp.value +'</p>';
	    	html += '</div>';
	    	html += '</div>';
	    	html += '</div>';
		}
		$('#company-body').append($(html));
	}
});

function escapeSpecialChars(jsonString) {

    return jsonString.replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f");

}


$.ajax({
    type: "GET",
    url: "/profile/"+$('#userid').val(),
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
   
    success: function(d) {
       //var d = JSON.stringify(d);
       //alert(d);
     // $("#bio").val(d.Item.bio.S);
    //   $("#status").val(d.Item.status.S);
       if(d.Item.user_followed){
    	   var length_of_user_followed = d.Item.user_followed.SS.length;
           
           for(var i=0;i<length_of_user_followed && i<3 ;i++)
    	   {
    	   		//var html = '<li class="list-group-item">'+d.Item.user_followed.SS[i]+'</li>';
    	   		//$('#listForUser').append($(html));
    	  
    	   appendNewsFeed(d.Item.user_followed.SS[i]);
    	   		
    	   }   
       }       
    }
});

function appendNewsFeed(id)
{
	
	$.ajax({
	    type: "GET",
	    url: "/profile/"+id,
	    crossDomain : true,
	    contentType: "application/json; charset=UTF-8",
	    dataType: 'json',
	    success: function( d ) {
	       //var d = JSON.stringify(d);
	       //alert(d);
	       //$("#bio").val(d.Item.bio.S);
	       //$("#status").val(d.Item.status.S);
	    	
	    //   alert(name1);
	    	// var name1 = getName(id);
	    	  // alert(name1);
	    	var username = getName(id);
	    	
	    	
	    	//alert(name);
	       if(d.Item.post){
	       var length_of_post = d.Item.post.SS.length;
	       
	       for(var i=0;i<length_of_post && i<1 ;i++)
	    	   {
	    	   		//var html = '<li class="list-group-item">'+d.Item.user_followed.SS[i]+'</li>';
	    	   		//$('#listForUser').append($(html));
	    	   			
	    	   //append news feed here in respective div tags
	    	   	
	    	   var html = " ";
		    	html += '<div class="well well-sm">';
		    	html += '<div class="media">';
		    	html += '<div class="media-body">';
		    	html += '<h4 class="media-heading"> </h4>';
		    	html += '<p>'+ username +' posted this:</p>';
		    	html += '<p>'+ d.Item.post.SS[i] +'</p>';
		    	html += '</div>';
		    	html += '</div>';
		    	html += '</div>';
		    	//name = "";
		    	$('#panel-body').append($(html));
	    	   }
	       //delete name1;
	       }
	    }
	});
}

$.ajax({
    type: "GET",
    url: "/userrec/"+$("#userid").val(),
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    success: function( d ) {
       
       if(d.Item.recommended_user){
    	   var userfollowed = getFollowedUser($("#userid").val());
    	  // console.log("TESTING VALIDATION: " + userfollowed[1]);
    	   if(userfollowed){
    	   var userfollowedlength = userfollowed.length;
    	   }
    	   var length_of_user_recommended = d.Item.recommended_user.NS.length;
           
           for(var i=0;i<length_of_user_recommended;i++)
    	   {
        	   var followinguser = false;
   	   			var recuser = getName(d.Item.recommended_user.NS[i]);
   	   			for(j=0; j<userfollowedlength; j++){
   	   				if(userfollowed[j] == d.Item.recommended_user.NS[i]){
   	   					followinguser = true;
   	   					break;
   	   				}
   	   			}
   	   			if(!followinguser){
	    	   		var html = '<li class="list-group-item">'+recuser+'</li>';
	    	   		$('#userrec-body').append($(html));
   	   			}	
    	   }    
       }
    }
});

$.ajax({
    type: "GET",
    url: "/jobrec/"+$("#userid").val(),
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    success: function( d ) {
       
       if(d.Item.recommended_job){
    	   var jobapplied = getJobApplied($("#userid").val());
       	   //console.log("TESTEING JOB REC VALIDATION :::: " + jobapplied.length);
    	   if(jobapplied){
       	   var jobappliedlength = jobapplied.length;
    	   }
	       var length_of_job_recommended = d.Item.recommended_job.SS.length;
	       
	       
	       for(var i=0;i<length_of_job_recommended;i++)
		   {
	    	   var appliedforjob = false;
	    	    var recjob = getJobDetails(d.Item.recommended_job.SS[i]);
	    	    console.log('recjob:' +JSON.stringify(recjob));
	    	    for(var j=0; j<jobappliedlength; j++){
	    	    	if(jobapplied[j].job_id == recjob.jobid){
	    	    		appliedforjob = true;
	    	    		break;
	    	    	}
	    	    }
		   		if(!appliedforjob){
		   		var html = '<li class="list-group-item">Company: '+recjob.company+'<br><br> Position: '+recjob.position+'</li>';
		   		$('#jobrec-body').append($(html));
		   		}
		   } 
       }
      
    }
});
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

function getJobDetails(id){
	
	var data;
	
	
	$.ajax({
	    type: "GET",
	    url: "/showJobDetailsPageAJAX/"+id,
	    crossDomain : true,
	    contentType: "application/json; charset=UTF-8",
	    dataType: 'json',
	    async : false,
	    success: function( d ) {
	    	console.log("Printing D inside getJobDetails" + JSON.stringify(d));
	    	data = {
	    			position: d.jobTitle,
	    			jobid: d.jobId,
	    			description: d.jobDescription,
	    			company: d.companyName
	    	};
	    	//name = d[0].firstname + " " + d[0].lastname;
	    
	    	//return data;
	    }, error: function(e){
	    	console.log("Inside AJAX ERROR::::::::"+JSON.stringify(e));
	    }
	
	});
	
	return data;
}

function getFollowedUser(id){
	
	var userfollowed;
	
	$.ajax({
	    type: "GET",
	    url: "/profile/"+id,
	    crossDomain : true,
	    contentType: "application/json; charset=UTF-8",
	    dataType: 'json',
	    async : false,
	    success: function( d ) {
	    	
	    	if(d.Item.user_followed)
		    {
			    var length_of_user_followed = d.Item.user_followed.SS.length;
			   
			    for(var i=0;i<length_of_user_followed;i++){

			
			    		userfollowed =  d.Item.user_followed.SS;

			    }
		    
		    	//return false;
		    }
	    }
	});
	
	return userfollowed;
}

function getJobApplied(id){
	
	var jobappdata;
	
	$.ajax({
	    type: "GET",
	    url: "/userapplicationAJAX/"+id,
	    crossDomain : true,
	    contentType: "application/json; charset=UTF-8",
	    dataType: 'json',
	    async : false,
	    success: function( d ) {
	    	
	    	if(d)
		    {
			    jobappdata = d;
		    
		    	//return false;
		    }
	    }
	});
	
	return jobappdata;
}

$(document).ready(function(){
	var username = getName($('#userid').val());
	$('#name').html(username);
	$('#profile').click(function(){
		
			window.location = "/userprofile";
});
	$('#job').click(function(){
		window.location = '/showJobs';
	})
	
	$('#search').click(function(){
		window.location =  '/searchPage';
	})
});