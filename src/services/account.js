'use strict';

const assert = require('assert');
const accountModel = require('src/models/account');
const tools = require

class AccountService {
    
    constructor({config, db, tools}) {
        assert(config, 'expected env config');
        assert(db, 'expected db config');
        assert(tools, 'expected tools');
        this.tools = tools;
        this.model = new accountModel({config, db});
    }
    
    async getAccount(accountID) {
        try {
            return this.tools.restify(
                await this.model.getAccountByAccountID(accountID),
                AccountService.restifyAccount,
                {}
            );
        } catch (err) {
            throw err;
        }
    }
    
    async getAllAccounts() {
        try {
            return this.tools.restify(
                await this.model.getAllAccounts(),
                AccountService.restifyAccount,
                []
            );
        } catch (err) {
            throw err;
        }
    }
    
    async createAccount(name) {
        try {
            return this.tools.restify(
                await this.model.createAccount(name),
                AccountService.restifyAccount
            );
        } catch (err) {
            throw err;
        }
    }
    
    async deleteAccount(accountID) {
        try {
            return this.tools.restify(
                await this.model.deleteAccount(accountID),
                AccountService.restifyAccount
            );
        } catch (err) {
            throw err;
        }
    }
    
    static restifyAccount(accountData) {
        if(accountData.account_id) {
            accountData.accountID = accountData.account_id;
            delete accountData.account_id;
        }
        return accountData;
    }
    
}

module.exports = AccountService;
