const extend = require('extend');
const Session = require('../session/index');
const PIDFactory = require('../utils/PIDFactory');
const conf = require('../utils/tools').GetAppConfig();
const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    filter: function (req, res, next) {
        // 获取真实IP
        req.realIp = (function () {
            var forwarded = req.header('x-forwarded-for');
            var ip = '';

            if (forwarded) {
                ip = forwarded.split(',')[0];
            }
            else {
                ip = req.connection.remoteAddress;
            }
            return ip;
        })();

        PIDFactory.createPID(req,res);

        if (!res.locals) {
            res.locals = {};
        }
        extend(res.locals, {
            query: req.query,
            app: {
                staticPath: isDevMode ? conf.serverConfig.cdn : '',
                domainUrl: conf.serverConfig.domainUrl,
                version: conf.version,
                copyright: {
                    year: new Date().getFullYear()
                },
                devMode: isDevMode
            },
            session: Session.get(req, res)
        });

       next();
    }
};