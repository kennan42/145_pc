var MEAP=require("meap");
var path = require("path");

function run(Param,Robot,Request,Response,IF)
{
    var arg = JSON.parse(Param.body.toString());
    var option={
        wsdl:path.join(__dirname.replace(IF.name,""),global.wsdl,"zhrws_read_fkber.xml"),
        func:"ZHRWS_READ_FKBER.ZHRWS_READ_FKBER.ZHRWS_READ_FKBER",
        Params:arg,
        BasicAuth:global.TXSOAPAuth,
        agent:false
    };

    visitLogObj.module = "zhrws";
    visitLogObj.name = "zhrws_read_fkber";
    visitLogObj.queryParam = JSON.stringify(option);
    visitLogObj.beforeTime = new Date().getTime();
    MEAP.SOAP.Runner(option,function(err,res,data){
        visitLogObj.afterTime = new Date().getTime();
        Response.setHeader("Content-type","text/json;charset=utf-8");
        if(!err)
        {
            visitLogObj.status = 0;
            Response.end(JSON.stringify(data));
        }
        else
        {
            visitLogObj.status = 1;
            Response.end(JSON.stringify({status:'-1',message:'Error'}));
        }
        saveVisitLog();
    });
}

//******** debug start ********
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var visitLogObj = {
    type: "webService", // 接口类型
    module: "",// 接口模块
    name: "", // 接口名称
    status: "", // 接口请求状态 0：成功 1：失败
    beforeTime: 0, // 进入接口前时间戳
    afterTime: 0, // 接口返回的时间戳
    queryParam: ""// 查询参数
};
//记录页面访问量(analy_page_visit_log)
var webServiceLogSchema = new Schema({
    type: String, // 接口类型
    module: String,// 接口模块
    name: String, // 接口名称
    status: Number, // 接口请求状态 0：成功 1：失败
    beforeTime: Number, // 进入接口前时间戳
    afterTime: Number, // 接口返回的时间戳
    queryTime: Number, // 接口
    queryParam: String, // 查询参数
    createTime: Number//创建时间
});

function saveVisitLog() {
    var conn = mongoose.createConnection(global.mongodbURL);
    var webServiceLogModel = conn.model("web_service_log", webServiceLogSchema);
    // Schema有相关说明
    var webServiceLog = new webServiceLogModel({
        type: visitLogObj.type, // 接口类型
        module: visitLogObj.module,// 接口模块
        name: visitLogObj.name, // 接口名称
        status: visitLogObj.status, // 接口请求状态 0：成功 1：失败
        beforeTime: visitLogObj.beforeTime, // 进入接口前时间戳
        afterTime: visitLogObj.afterTime, // 接口返回的时间戳
        queryTime: visitLogObj.afterTime - visitLogObj.beforeTime, // 接口
        queryParam: visitLogObj.queryParam, // 查询参数
        createTime: new Date().getTime()//创建时间
    });
    webServiceLog.save(function (err, data) {
        conn.close();
    });
}
//******** debug end ********

exports.Runner = run;
