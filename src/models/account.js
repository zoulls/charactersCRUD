'use strict';

const assert = require('assert');

class AccountModel {
    
    constructor({config, db}) {
        assert(config, 'expected env config');
        assert(config.account, 'expected env account config');
        assert(db, 'expected db config');
        this.config = config.account;
        this.db = db;
    }
    
    async getAccountByAccountID(accountID) {
        try {
            const {rows} = await this.db.query('SELECT * FROM ' + this.config.tableName + ' WHERE accountID = $1', [accountID]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async getAllAccounts() {
        try {
            const {rows} = await this.db.query('SELECT * FROM ' + this.config.tableName );
            return rows;
        } catch (err) {
            throw err;
        }
    }
    
    async createAccount(name) {
        try {
            const {rows} = await this.db.query('INSERT INTO ' + this.config.tableName + '(accountID, name) ' +
                'values(default, $1) RETURNING *', [name]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async deleteAccount(accountID) {
        try {
            const {rows} = await this.db.query('DELETE FROM ' + this.config.tableName + ' WHERE accountID = $1 RETURNING *', [accountID]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = AccountModel;
