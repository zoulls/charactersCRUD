'use strict';

const debug = require('debug')('charactersCrud:error');

module.exports = {
    
    errorFormat: (err, defaultError) => {
        let error = {code: 503, msg: 'Internal error'};
        
        if (typeof err.code !== 'undefined') {
            if (typeof err.msg !== 'undefined') {
                error = err;
            } else {
                error.code = err.code;
                if (typeof err.message !== 'undefined') {
                    error.msg = err.message;
                } else {
                    debug(err);
                }
            }
        } else if (typeof err.errorCode !== 'undefined' && typeof err.errorDescription !== 'undefined') {
            error.code = err.errorCode;
            if (error.code === 0) {
                error.code = defaultError.code;
            }
            error.msg = err.errorDescription;
        } else {
            debug(err);
            error = defaultError;
        }
        return error;
    },
    restify: (data, customRestify, defaultValue = null) => {
        let restData = data;
        if (data) {
            if(typeof data === 'object' && data.length > 0) {
                restData = data.map(value => customRestify(value));
            } else {
                restData = customRestify(restData);
            }
        } else if (defaultValue) {
            restData = defaultValue;
        }
        return restData;
    }
};
