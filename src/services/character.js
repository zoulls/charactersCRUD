'use strict';

const assert = require('assert');
const characterModel = require('src/models/character');

class CharacterService {
    
    constructor({config, db, tools}) {
        assert(config, 'expected env config');
        assert(db, 'expected db config');
        assert(tools, 'expected tools');
        this.tools = tools;
        this.model = new characterModel({config, db});
    }
    
    async getCharactersByAccount(accountID) {
        try {
            return this.tools.restify(
                await this.model.getCharactersByAccountID(accountID),
                CharacterService.restifyCharacter,
                []
            );
        } catch (err) {
            throw err;
        }
    }
    
    async getCharacter(characterID) {
        try {
            return this.tools.restify(
                await this.model.getCharacterByCharacterID(characterID),
                CharacterService.restifyCharacter,
                {}
            );
        } catch (err) {
            throw err;
        }
    }
    
    async createCharacter(accountID, {name, xp = 0}) {
        try {
            return this.tools.restify(
                await this.model.createCharacter(accountID, name, xp),
                CharacterService.restifyCharacter,
            );
        } catch (err) {
            throw err;
        }
    }
    
    async deleteCharacter(characterID) {
        try {
            return this.tools.restify(
                await this.model.deleteCharacter(characterID),
                CharacterService.restifyCharacter,
            );
        } catch (err) {
            throw err;
        }
    }
    
    async deleteAllCharacters(accountID) {
        try {
            return this.tools.restify(
                await this.model.deleteAllCharactersByAccountID(accountID),
                CharacterService.restifyCharacter,
            );
        } catch (err) {
            throw err;
        }
    }
    
    static restifyCharacter(characterData) {
        if(characterData.account_id) {
            characterData.accountID = characterData.account_id;
            delete characterData.account_id;
        }
        if (characterData.character_id) {
            characterData.characterID = characterData.character_id;
            delete characterData.character_id
        }
        return characterData;
    }
    
}

module.exports = CharacterService;
