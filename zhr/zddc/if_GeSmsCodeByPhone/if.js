var MEAP=require("meap");
var path = require("path");

function run(Param,Robot,Request,Response,IF)
{
	var arg = JSON.parse(Param.body.toString());
	var option={
		//wsdl:"http://192.168.2.48/AdService/AdWebService.asmx?wsdl",
		wsdl:path.join(__dirname.replace(IF.name,""),global.wsdl,"AdWebService.xml"),
		func:"AdWebService.AdWebServiceSoap.GeSmsCodeByPhone",
		Params:'<cttq:GeSmsCodeByPhone>'
	         +'<cttq:guid>'+arg.guid+'</cttq:guid>'
	         +'<cttq:phoneNo>'+arg.phoneNo+'</cttq:phoneNo>'
	         +'<cttq:invokeUser>'+arg.invokeUser+'</cttq:invokeUser>'
	         +'<cttq:invokePassword>'+arg.invokePassword+'</cttq:invokePassword>'
	         +'<cttq:invokeApp>'+arg.invokeApp+'</cttq:invokeApp>'
			 +'</cttq:GeSmsCodeByPhone>',
		BasicAuth:global.TXSOAPAuth 
	};
	
	MEAP.SOAP.Runner(option,function(err,res,data){
		Response.setHeader("Content-type","text/json;charset=utf-8");
		if(!err)
		{
			Response.end(JSON.stringify(data));
		}
		else
		{
			Response.end(JSON.stringify({status:'-1',message:'Error'}));
		}
	});
}

exports.Runner = run;
