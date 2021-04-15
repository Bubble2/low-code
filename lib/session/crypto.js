/**
 * AES 加密模块
 */

const extend = require('extend');
const Constants = require('../constants');
const crypto = require('crypto');
const conf = require('../utils/tools').GetAppConfig();

const Crypto = function(secretKey, encoding) {
    this.encoding = encoding || 'hex';
};

extend(Crypto.prototype, {
    /**
     * 加密
     *
     * @param data
     * @returns {*}
     */
    encrypt: function(data) {
        const cipher = crypto.createCipher('aes-128-ecb', Constants.SECRETKEY);
        return cipher.update(data, 'utf8', this.encoding) + cipher.final(this.encoding);
    },
    /**
     * 解密
     *
     * @param data
     * @returns {*}
     */
    decrypt: function(data) {
        const cipher = crypto.createDecipher('aes-128-ecb', Constants.SECRETKEY);
        return cipher.update(data, this.encoding, 'utf8') + cipher.final('utf8');
    }
});

const instance = new Crypto(Constants.SECRETKEY, conf.serverConfig.encoding);
module.exports = instance;