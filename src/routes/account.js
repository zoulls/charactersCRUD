'use strict';

const express = require('express');
const router = express.Router();

const commonController = require('src/controllers/common');
const accountController = require('src/controllers/account');
const characterController = require('src/controllers/character');

router.get('/',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => accountController.getAllAccounts(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.get('/:accountID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'accountID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => accountController.getAccount(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.post('/',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'body', name: 'name', schema: 'accountName'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => accountController.createAccount(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.delete('/:accountID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'accountID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.deleteAllCharacters(req, res, next),
    (req, res, next) => accountController.deleteAccount(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

module.exports = router;
