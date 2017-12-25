'use strict';

const jsonSchema = require('jsonschema').Validator;
const fs = require('fs');
const config = require('config/dev.json');
const tools = require('src/tools');
const db = require('src/db');

module.exports = {
    initContext: (req, res, next) => {
        req.context = {};
        if (req.customInitContext) {
            req.context = req.customInitContext;
            delete req.customInitContext;
        }
        req.context.config = config;
        req.context.db = db;
        req.context.tools = tools;
        next();
    },
    mockedResponse: (req, res, next) => {
        if (req.query.mock) {
            let result;
            if (req.context.mockListData && req.context.mockListData.data && req.context.mockListData.filter) {
                result = req.context.mockListData.data[req.context.mockListData.filter];
            } else {
                result = req.context.mockData;
            }
            return res.jsonp(result);
        } else {
            next();
        }
    },
    inputValidation: (req, res, next) => {
        let error;
        if (req.context.inputValidation && req.context.inputValidation.length > 0) {
            const jsonSchemaValidator = new jsonSchema();
            let errors = [];
            
            for (let input of req.context.inputValidation) {
                let jsonSchemaFile = 'src/validators/' + input.type + '/' + input.schema + '.json';
                if (req[input.type][input.name] && fs.existsSync(jsonSchemaFile)) {
                    let result = jsonSchemaValidator.validate(req[input.type][input.name], require(jsonSchemaFile));
                    if (result.errors.length > 0) {
                        errors.push(result.errors.join());
                    }
                } else {
                    errors.push('Input validation error for : ' + input.name + ' (' + input.type + ')');
                }
            }
            
            if (errors.length === 0) {
                next();
            } else {
                error = {code: 400, msg: errors.join()};
                return res.jsonp(error);
            }
        } else {
            error = {code: 503, msg: 'Context for input validation is missing'};
            return res.jsonp(error);
        }
    },
    handler: (req, res) => {
        return res.jsonp({result: true, data: req.context.result});
    }
};
