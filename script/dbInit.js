'use strict';

require('app-module-path').addPath(__dirname.slice(0, -7));
const assert = require('assert');
const db = require('src/db');
const config = require('config/dev.json');

(async function () {
    try {
        const tableAccountCreation = await db.query('CREATE TABLE IF NOT EXISTS ' + config.account.tableName +
            '(\n' +
            '  account_id varchar(45) NOT NULL,  \n' +
            '  password varchar(450) NOT NULL,  \n' +
            '  enabled integer NOT NULL DEFAULT \'1\',  \n' +
            '  PRIMARY KEY (user_id)  \n' +
            ')');
        const tableCharacterCreation = await db.query('CREATE TABLE IF NOT EXISTS ' + config.character.tableName +
            '(\n' +
            '  character_id serial PRIMARY KEY,  \n' +
            '  password varchar(450) NOT NULL,  \n' +
            '  enabled integer NOT NULL DEFAULT \'1\',  \n' +
            ')');
        console.log(tableAccountCreation);
        console.log(tableCharacterCreation);
    } catch (err) {
        throw err;
    }
})();