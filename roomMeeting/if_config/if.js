var MEAP=require("meap");


global.TXSOAPAuth = {username:"hrws",password:"*#!cttqszm"};
global.wsdl = "wsdl_pro";
global.ntlm_url = "http://10.10.1.149:11130/ntlm/check.jsp";
global.mongodbURL =  "mongodb://10.10.1.147:27017,10.10.1.148:27017,10.10.1.149:27017/mobile";
global.nginxURL = "http://ai.cttq.com:8888/";
global.pushURL = "http://ai.cttq.com:8080/push/msg/sendSingleMessage";
global.appId = "10000003";
global.redisHost = "10.10.1.147";
global.redisPort = 6379;
global.baseURL = "http://ai.cttq.com:808";
global.liveTime=864000;

//IT服务天知道
global.its = "http://10.10.1.150:40002";
global.Detail = "http://saperp.cttq.com:8022";
function run(Param, Robot, Request, Response, IF)
{
    
    Response.end();
}
global.zabbix={
    user:"zabbix",
    password: "zabbix.1234",
    url :"http://10.10.1.218/api_jsonrpc.php"
    
}
exports.Runner = run;


                                

    

