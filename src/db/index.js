'use strict';

const assert = require('assert');
const config = require('config/dev.json');
const { Pool } = require('pg');

assert(config, 'expected env config');
assert(config.db, 'expected env db config');
const pool = new Pool(config.db);

module.exports = {
    query: (text, params) => pool.query(text, params)
};