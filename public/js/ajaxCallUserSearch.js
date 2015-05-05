

$(document).ready(function(){
	
	$('#usersearch').on("click",function(){
	
	$.ajax({
    type: "GET",
    url: "/searchuser/"+$("#uName").val(),
    crossDomain : true,
    contentType: "application/json; charset=UTF-8",
    dataType: 'json',
    success: function(d) {
    	
    	//alert(d.length);
    	var length = d.length;
    	//d = JSON.stringify(d);
    	//alert(d[0].firstname);

        var initial = " ";
        //initial += '<div class="col-md-12"><h2></h2></div>';
        initial += '<div class="col-md-12 col-sm-6">';
        initial += '<div class="panel panel-default" id = "panel">';
        initial += '<div class="panel-heading"><h4>Users</h4></div>';
        initial += '<div class="panel-body" id = "panel-body">';
        initial += '</div>';
        initial += '</div>';
        //initial += '</div>';

        //alert("after initial and before for");
        
        $('#initial').append($(initial));
    	
    	for(var i=0;i<length;i++){
    		//alert(d[i].firstname);
        	
		    	var html = " ";
		    	html += '<div class="well well-sm">';
		    	html += '<div class="media">';
		    	html += '<div class="media-body">';
		    	html += '<h4 class="media-heading"><a >'+d[i].firstname+' '+d[i].lastname+'</a></h4>';
		    	html += '<p> <button id="profile" value='+d[i].user_Id+' class="btn btn-xs btn-default"><!--<span class="glyphicon glyphicon-comment"></span>--> Go To Profile </button> </p>';
		    	html += '</div>';
		    	html += '</div>';
		    	html += '</div>';
		    	
		    	$('#panel-body').append($(html));
    	
    	}
    },
    error: function(d,status){
    	alert(d);
    	alert(status);
    }
	
    	   
    });
	return false;

    });
		$('body').on("click","#profile",function(){
			
		//	alert("hi");
			var userid = $(this).attr("value");
			sessionStorage.userid = userid;
			window.location='/portfolio';
			//alert(userid);
			
		});
	
    });

