import { createToppingCollection, flushKebebKing, loginAsAdmin } from "../../utils/utils"

describe('Edit topping collections', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: topping collections', () => loginAsAdmin())
        cy.visit('/admin/menu/topping-collections')
    })

    it('List topping collections', () => {
        cy.get('#menu-elements-list .menu-element').should('have.length', 3)
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-name').should('have.text', 'Dodatki do kebaba')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba małego')
        cy.get('#menu-elements-list .menu-element').eq(1).find('.menu-element-name').should('have.text', 'Dodatki do kebaba')
        cy.get('#menu-elements-list .menu-element').eq(1).find('.menu-element-description').should('have.text', 'Dodatki do kebaba średniego')
        cy.get('#menu-elements-list .menu-element').eq(2).find('.menu-element-name').should('have.text', 'Dodatki do kebaba')
        cy.get('#menu-elements-list .menu-element').eq(2).find('.menu-element-description').should('have.text', 'Dodatki do kebaba dużego')
    })

    it('Create topping collection', () => {
        createToppingCollection('ZZ New collection', 'New colleciton description')

        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'ZZ New collection')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('have.text', 'New colleciton description')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'ZZ New collection')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('have.text', 'New colleciton description')
    })

    it('Create topping colelciton with valid order', () => {
        createToppingCollection('AA New collection', 'New colleciton description')

        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-name').should('have.text', 'AA New collection')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'New colleciton description')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-name').should('have.text', 'AA New collection')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'New colleciton description')
    })

    it('Empty name not allowed', () => {
        cy.get('.create-new').click()

        cy.get('.editor-box-title').contains('Collection description').parent().find('input').click().clear().type('New colleciton description');

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()

        cy.get('.editor-box-title').contains('Collection name').parent().find('mat-error').contains('Invalid value')
    })

    it('Empty description allowed', () => {
        createToppingCollection('New collection name', undefined)

        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'New collection name')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('be.empty')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'New collection name')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('be.empty')
    })

    it('Edit collection name', () => {
        createToppingCollection('New collection name', 'Collection description')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'New collection name')

        cy.get('#menu-elements-list .menu-element').eq(3).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Collection name').parent().find('input').click().clear().type('ZZ Updated collection name');
        cy.get('.save-button').click();

        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'ZZ Updated collection name')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'ZZ Updated collection name')
    })

    it('Edit collection empty name not allowed', () => {
        createToppingCollection('New collection name', 'Collection description')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'New collection name')

        cy.get('#menu-elements-list .menu-element').eq(3).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Collection name').parent().find('input').click().clear();
        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click();
        cy.get('.editor-box-title').contains('Collection name').parent().find('mat-error').contains('Invalid value')
    })

    it('Edit collection description', () => {
        createToppingCollection('New collection name', 'Collection description')
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-name').should('have.text', 'New collection name')

        cy.get('#menu-elements-list .menu-element').eq(3).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Collection description').parent().find('input').click().clear().type('Updated description');
        cy.get('.save-button').click();

        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('have.text', 'Updated description')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(3).find('.menu-element-description').should('have.text', 'Updated description')
    })

    it('Reload editor', () => {
        createToppingCollection('Absolutly new collection 1', 'Collection description 1')
        createToppingCollection('Absolutly new collection 2', 'Collection description 2')
        createToppingCollection('Absolutly new collection 3', 'Collection description 3')

        cy.get('#menu-elements-list .menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Collection name').parent().find('input').should('have.value', 'Absolutly new collection 1')
        cy.get('.editor-box-title').contains('Collection description').parent().find('input').should('have.value', 'Collection description 1')

        cy.get('#menu-elements-list .menu-element').eq(1).find('.settings-icon').click({force: true});
        cy.get('.editor-box-title').contains('Collection name').parent().find('input').should('have.value', 'Absolutly new collection 2')
        cy.get('.editor-box-title').contains('Collection description').parent().find('input').should('have.value', 'Collection description 2')

        cy.get('#menu-elements-list .menu-element').eq(2).find('.settings-icon').click({force: true});
        cy.get('.editor-box-title').contains('Collection name').parent().find('input').should('have.value', 'Absolutly new collection 3')
        cy.get('.editor-box-title').contains('Collection description').parent().find('input').should('have.value', 'Collection description 3')
    })

    it('Deletes colleciton', () => {
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba małego')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.settings-icon').click()

        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)

        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba średniego')
        cy.reload()
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba średniego')
    })
})