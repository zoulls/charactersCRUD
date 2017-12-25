'use strict';

const accountService = require('src/services/account');
const debug = require('debug')('charactersCrud:account');

module.exports = {
    getAccount: (req, res, next) => {
        debug('call getAccount');
        let account = new accountService(req.context);
        account.getAccount(req.params.accountID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with account'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    getAllAccounts: (req, res, next) => {
        debug('call getAllAccounts');
        let account = new accountService(req.context);
        account.getAllAccounts()
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with account'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    createAccount: (req, res, next) => {
        debug('call createAccount');
        let account = new accountService(req.context);
        account.createAccount(req.body.name)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with account'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    deleteAccount: (req, res, next) => {
        debug('call deleteAccount');
        let account = new accountService(req.context);
        account.deleteAccount(req.params.accountID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with account'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    }
};