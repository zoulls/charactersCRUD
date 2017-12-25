'use strict';

const characterService = require('src/services/character');
const debug = require('debug')('charactersCrud:character');

module.exports = {
    getCharactersByAccount: (req, res, next) => {
        debug('call getCharactersByAccount');
        let character = new characterService(req.context);
        character.getCharactersByAccount(req.params.accountID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with character'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    getCharacter: (req, res, next) => {
        debug('call getCharacter');
        let character = new characterService(req.context);
        character.getCharacter(req.params.characterID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with character'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    createCharacter: (req, res, next) => {
        debug('call createCharacter');
        let character = new characterService(req.context);
        character.createCharacter(req.params.accountID ,req.body.character)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with character'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    deleteCharacter: (req, res, next) => {
        debug('call deleteCharacter');
        let character = new characterService(req.context);
        character.deleteCharacter(req.params.characterID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with character'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    },
    deleteAllCharacters: (req, res, next) => {
        debug('call deleteAllCharacters');
        let character = new characterService(req.context);
        character.deleteAllCharacters(req.params.accountID)
            .then(result => {
                req.context.result = result;
                next();
            })
            .catch(err => {
                let defaultError = {code: 503, msg: 'Error with character'};
                let error = req.context.tools.errorFormat(err, defaultError);
                return res.jsonp(error);
            })
    }
};