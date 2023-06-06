import { clearMenuForEmpty, createCategory, createGroup, loginAsAdmin } from "../../utils/utils"

describe('Edit categories', () => {
    beforeEach(() => {
        clearMenuForEmpty()
        cy.session('login as admin: groups a', () => loginAsAdmin())
        cy.visit('/admin/menu/categories')

        createCategory('New category', 'Category description')
        cy.get('.extend').click()
    })

    it('Creates group', () => {
        createGroup('New dish', 14.99, 'Dish description')
        cy.reload();

        cy.get('.menu-element-name').contains('New dish')
        cy.get('.menu-element-description').contains('Dish description')
    })

    it('Creates group without description', () => {
        createGroup('New dish', 14.99, undefined)
        cy.reload();

        cy.get('.menu-element-name').contains('New dish')
        cy.get('.menu-element-description').should('be.empty')
    })

    it('Save button is disabled by default', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Empty name not allowed', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled').click()
        cy.get('.editor-box-title').contains('Dish name').parent().find('mat-error').contains('Invalid name')

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('11.70')
        cy.get('.save-button').should('have.class', 'disabled')

        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('name')
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Empty price not allowed', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled').click()
        cy.get('.editor-box-title').contains('Item price').parent().find('mat-error').contains('Invalid price')

        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('name')
        cy.get('.save-button').should('have.class', 'disabled')

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('11.70')
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Creates group with allergen', () => {
        cy.get('.create-new').click()
        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('Dish name');
        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('17.77');

        cy.get('#item-tabs span').contains('Allergens').parent().click()

        cy.get('.allergen').contains('Jaja').click()
        cy.get('.save-button').click()
        
        cy.url().should('match', new RegExp('.*/category/.{12}$'))
        cy.reload();

        
        cy.get('.settings-icon').click()
        cy.get('#item-tabs span').contains('Allergens').parent().click()
        cy.get('.allergen').contains('Jaja').parents('.allergen').find('input').should('be.checked')
    })

    it('Creates group with select', () => {
        cy.get('.create-new').click()
        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('Dish name');
        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('17.77');

        cy.get('#item-tabs span').contains('Selects').parent().click()
        cy.get('.collection').contains('Mięso').parent().find('mat-checkbox').click()
        cy.get('.collection').contains('Sos').parent().find('mat-checkbox').click()

        cy.get('.save-button').click()
        cy.url().should('match', new RegExp('.*/category/.{12}$'))
        cy.reload();

        cy.get('.settings-icon').click()
        cy.get('#item-tabs span').contains('Selects').parent().click()

        cy.get('.collection').contains('Mięso').parent().find('mat-checkbox input').should('be.checked')
        cy.get('.collection').contains('Sos').parent().find('mat-checkbox input').should('be.checked')
    })
    
    it.only('Creates group with toppings', () => {
        cy.get('.create-new').click()
        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('Dish name');
        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('17.77');

        cy.get('#item-tabs span').contains('Toppings').parent().click()
        cy.get('.collection').contains('Dodatki do kebaba małego').parent().find('mat-checkbox').click()

        cy.get('.save-button').click()
        cy.url().should('match', new RegExp('.*/category/.{12}$'))
        cy.reload();

        cy.get('.settings-icon').click()
        cy.get('#item-tabs span').contains('Toppings').parent().click()
        cy.get('.collection').contains('Dodatki do kebaba małego').parent().find('mat-checkbox input').should('be.checked')
    })
})