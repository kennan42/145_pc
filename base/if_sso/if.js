var MEAP = require("meap");

function run(Param, Robot, Request, Response, IF){
	
	
	console.log("---------------sso-------");
	//Response.end(JSON.stringify({status:-1, message:"test"})); 
	var username=Param.params.username;
	var token=Param.params.token;
	var redir = Param.params.redir;
	var module = Param.params.module;
		
		        Robot.Set("username",  username);
			   	var cookies = Response.getHeader("Set-Cookie") || [];
			
				cookies.push("userid=" + username + ";path=/");
				Response.setHeader("Set-Cookie", cookies);
				if(module === "meet"){
				    Response.setHeader("Location", "/roomMeeting/MeetingReservation/" + redir);
				}else{
				    Response.setHeader("Location", "/web/" + redir);
				}
		        Response.statusCode = 302;
		        Response.end();  
	
	
	
	
}

exports.Runner = run;




