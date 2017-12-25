'use strict';

const assert = require('assert');

class CharacterModel {
    
    constructor({config, db}) {
        assert(config, 'expected env config');
        assert(config.character, 'expected env character config');
        assert(db, 'expected db config');
        this.config = config.character;
        this.db = db;
    }
    
    async getCharactersByAccountID(accountID) {
        try {
            const {rows} = await this.db.query('SELECT * FROM ' + this.config.tableName + ' WHERE account_id = $1', [accountID]);
            return rows;
        } catch (err) {
            throw err;
        }
    }
    
    async getCharacterByCharacterID(characterID) {
        try {
            const {rows} = await this.db.query('SELECT * FROM ' + this.config.tableName + ' WHERE character_id = $1', [characterID]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async createCharacter(accountID, name, xp) {
        try {
            const {rows} = await this.db.query('INSERT INTO ' + this.config.tableName + '(character_id, account_id, name, xp) ' +
                'values(default, $1, $2, $3) RETURNING *',
                [accountID, name, xp]
            );
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async deleteCharacter(accountID) {
        try {
            const {rows} = await this.db.query('DELETE FROM ' + this.config.tableName + ' WHERE character_id = $1 RETURNING *', [accountID]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async deleteAllCharactersByAccountID(accountID) {
        try {
            const {rows} = await this.db.query('DELETE FROM ' + this.config.tableName + ' WHERE account_id = $1 RETURNING *', [accountID]);
            return rows;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = CharacterModel;
