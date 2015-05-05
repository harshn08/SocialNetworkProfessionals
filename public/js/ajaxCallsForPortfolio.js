

$.ajax({
    type: "GET",
    //url: "/profile/"+$("#userid").val(),
    url: "/profile/"+sessionStorage.userid,
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    async : false,
    success: function(d) {
       //var d = JSON.stringify(d);
       //alert(d);
       $("#bio").val(d.Item.bio.S);
       $("#status").val(d.Item.status.S);
             
       var username = getName(sessionStorage.userid);
       //alert(username);
       $('#username').html(username);
       if(d.Item.college){
	       var length_of_college = d.Item.college.SS.length;
	       
	       for(var i=0;i<length_of_college;i++)
		   {
		   		var html = '<li class="list-group-item">'+d.Item.college.SS[i]+'</li>';
		   		$('#listForCollege').append($(html));
		   }
       }
       if(d.Item.skill){
	       var length_of_skill = d.Item.skill.SS.length;
	       
	       for(var i=0;i<length_of_skill;i++)
		   {
		   		var html = '<li class="list-group-item">'+d.Item.skill.SS[i]+'</li>';
		   		$('#listForSkill').append($(html));
		   }
       }
       if(d.Item.certification){
    	   var length_of_certificate = d.Item.certification.SS.length;
           
           for(var i=0;i<length_of_certificate;i++)
    	   {
    	   		var html = '<li class="list-group-item">'+d.Item.certification.SS[i]+'</li>';
    	   		$('#listForCertificate').append($(html));
    	   }  
       }
       
       
       if(d.Item.company_followed)
    	   {
       var length_of_company = d.Item.company_followed.SS.length;
       
       for(var i=0;i<length_of_company;i++)
	   {
	   		var html = '<li class="list-group-item">'+d.Item.company_followed.SS[i]+'</li>';
	   		$('#listForCompany').append($(html));
	   }
    	   }
       
       if(d.Item.user_followed)
       {var length_of_user_followed = d.Item.user_followed.SS.length;
       
       for(var i=0;i<length_of_user_followed;i++)
    	   {
    	   		var usernameid = getName(d.Item.user_followed.SS[i]);
    	   		var html = '<li class="list-group-item">'+usernameid+'</li>';
    	   		$('#listForUser').append($(html));
    	   }
       }
       //$("#overviewText").val(d.data[0].overview);
       //$("#urlText").val(d.data[0].url);
    }
});

$(document).ready(function(){
	$('button.followButton').on('click', function(e){
    e.preventDefault();
    $button = $(this);
    if($button.hasClass('following')){
        
        //$.ajax(); Do Unfollow
    	$button.css('color','black');
        $button.removeClass('following');
        $button.removeClass('unfollow');
        $button.text('Follow');
    } else {
        
        // $.ajax(); Do Follow
    	//alert('else');
        $button.css('color','green');
        $button.addClass('following');
        $button.text('Following');
        
        var user = new Array();
        user.push(sessionStorage.userid);
        console.log(sessionStorage.userid);
        var user_followed = {
        		user_followed : user
        };
        $.ajax({
          type: "POST",
          url: "/user_followed",
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify(user_followed),
          crossDomain : true,
          success: function( d ) {
             console.log(d);
          }
        });
    }
});

$('button.followButton').hover(function(){
     $button = $(this);
    if($button.hasClass('following')){
        $button.addClass('unfollow');
        $button.text('Unfollow');
    }
}, function(){
    if($button.hasClass('following')){
        $button.removeClass('unfollow');
        $button.text('Following');
    }
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
	    	
	    	name = d[0].firstname;
	    
	    	//return false;
	    }
	
	});
	
	return name;
}
