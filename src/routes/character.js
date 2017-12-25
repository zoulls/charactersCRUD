'use strict';

const express = require('express');
const router = express.Router();

const commonController = require('src/controllers/common');
const characterController = require('src/controllers/character');

router.get('/account/:accountID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'accountID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.getCharactersByAccount(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.get('/:characterID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'characterID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.getCharacter(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.post('/account/:accountID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [
            {type: 'params', name: 'accountID', schema: 'ID'},
            {type: 'body', name: 'character', schema: 'character'}
        ];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.createCharacter(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.delete('/:characterID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'characterID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.deleteCharacter(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

router.delete('/account/:accountID',
    (req, res, next) => commonController.initContext(req, res, next),
    (req, res, next) => {
        req.context.inputValidation = [{type: 'params', name: 'accountID', schema: 'ID'}];
        commonController.inputValidation(req, res, next);
    },
    (req, res, next) => characterController.deleteAllCharacters(req, res, next),
    (req, res, next) => commonController.handler(req, res)
);

module.exports = router;
