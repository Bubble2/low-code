/**
 * @author qiumingsheng
 * 判断链接是否需要登录
 */

const Session = require('../session');
const Constants = require('../constants');
const tools = require('../utils/tools');
const conf = require('../utils/tools').GetAppConfig();
const logger = require('../logger').getLogger();

const loginUrlReg = /^\/(login)/;

module.exports = {
    filter: function (req, res, next) {
        const notMatchWhitelist = !tools.MatchSome(req.url, Constants.WHITE_LIST);
        const session = Session.get(req, res);
        const ajax = req.body.ajax;
        const logined = session && session.userIdEnc;
        const host =  req.headers.host;

        if(host.indexOf(conf.serverConfig.domainUrl) >= 0){
            if(logined && loginUrlReg.test(req.url)){
                res.redirect('/');
            }else{
                if (notMatchWhitelist && !logined) {
                    if (ajax) {
                        const json = {
                            timeOutUrl: '/login/?from='+encodeURIComponent(req.body.pathName)
                        };
                        res.send(JSON.stringify(json));
                    } else {
                        let fromPos = req.url.indexOf('?');
                        if(fromPos === -1){
                            res.redirect('/login/?from=' + encodeURIComponent(req.url));
                        } else {
                            res.redirect('/login/?from=' + encodeURIComponent(req.url.slice(0, fromPos)) + '&'+ req.url.slice(fromPos + 1));
                        }
                    }
                }else {
                    next();
                }
            }

        }
    }
};