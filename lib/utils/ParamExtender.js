const extend = require('extend');
const Session = require('../../lib/session');
const conf = require('./tools').GetAppConfig();

ParamExtender = function(){

};

extend(ParamExtender, {
    wrap(original, external){
        return extend(original,external);
    },
    wrapIdentify(params, req, res){
        if(typeof req == "undefined"){
            return params;
        }else{
            let session = Session.get(req, res);
            if(typeof params == "undefined"){
                params = {};
            }
            if(typeof params.headers == "undefined"){
                params.headers = {};
            }
            params.headers["user-agent"] = req.headers['user-agent'];
            params.headers["X-Forwarded-For"] = req.realIp;
            params.headers["X-Token"] = params.headers['X-Token'] || session.xtoken;
            params.headers["X-ClientVersion"] = conf.version;
            params.headers["X-ClientType"] = params.headers['X-ClientType'] || conf.serverConfig.clientType;
            params.headers["X-TIMESTAMP"] = new Date();
            params.headers["X-M-ID"] = session.mainUserIdEnc;
            params.headers["X-S-ID"] = session.subUserIdEnc;
            params.headers["X-M-NAME"] = session.mainUserName;
            params.headers["X-S-NAME"] = session.subUserName;

            return extend(params,{
                sessionId: session.id,
                userIdEnc:session.userIdEnc
            });
        }
    }
});
module.exports = ParamExtender;