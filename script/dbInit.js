'use strict';

require('app-module-path').addPath(__dirname.slice(0, -7));
const db = require('src/db');
const config = require('config/dev.json');

(async function () {
    try {
        await db.query('CREATE TABLE IF NOT EXISTS ' + config.account.tableName +
            '( ' +
            'account_id serial PRIMARY KEY, ' +
            'name varchar(20) NOT NULL ' +
            ')');
        await db.query('CREATE TABLE IF NOT EXISTS ' + config.character.tableName +
            '( ' +
            'character_id serial PRIMARY KEY, ' +
            'account_id int REFERENCES account, ' +
            'name varchar(20) NOT NULL, ' +
            'xp int DEFAULT 0 ' +
            ')');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();