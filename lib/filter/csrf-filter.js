/**
 * @author guozhaodong
 * 判断链接是否通过csrfToken校验
 */

const Session = require('../session/index');
const Constants = require('../constants');
const tools = require('../utils/tools');

module.exports = {
    filter: function (req, res, next) {
        const notMatchWhitelist = !tools.MatchSome(req.url, Constants.WHITE_LIST);
        const session =  Session.get(req, res);
        const xCsrfToken = req.header('x-csrf-token') || req.body['x-csrf-token'] || req.query['x-csrf-token'];

        if(notMatchWhitelist && !(req.method === 'GET') && !(xCsrfToken && decodeURIComponent(xCsrfToken) === session.csrfToken)){
            res.send({
                retCode: '-1',
                retMsg: '非法操作！'
            });
        }else{
            next();
        }

    }
};