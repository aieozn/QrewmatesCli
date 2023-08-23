import { flushKebebKing, createAllergen, loginAsKebabKingAdmin, clearAllergensForEmpty } from "../../utils/utils"

describe('Edit allergens', () => {
    beforeEach(() => {
        flushKebebKing()
        clearAllergensForEmpty()
        cy.session('login as admin: allergens', () => loginAsKebabKingAdmin())
        cy.visit('/admin/menu/allergens')
    })


    it('Creates allergen', () => {
        createAllergen('New allergen', 'Allergen description');
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'New allergen')
        cy.get('#allergens .allergen').eq(0).find('.description').should('have.text', 'Allergen description')
        cy.reload()
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'New allergen')
        cy.get('#allergens .allergen').eq(0).find('.description').should('have.text', 'Allergen description')
    })

    it('Remove allergen', () => {
        createAllergen('New allergen 1', 'Allergen description');
        createAllergen('New allergen 2', 'Allergen description');
        createAllergen('New allergen 3', 'Allergen description');

        cy.get('#allergens .allergen').eq(1).find('.name').should('have.text', 'New allergen 2')

        cy.get('#allergens .allergen').eq(1).find('.icon').click()
        cy.get('.remove-button').click();
        cy.on('window:confirm', () => true)

        cy.get('#allergens .allergen').eq(1).find('.name').should('have.text', 'New allergen 3')
        cy.reload()
        cy.get('#allergens .allergen').eq(1).find('.name').should('have.text', 'New allergen 3')
    })

    it('Edit allergen name', () => {
        createAllergen('New allergen', 'Allergen description');
        cy.reload()

        cy.get('#allergens .allergen').eq(0).find('.icon').click()
        cy.get('.editor-box-title').contains('Allergen name').parent().find('input').click().clear().type('Updated name');
        cy.get('.save-button').click();

        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Updated name')
        cy.reload()
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Updated name')
    })

    it('Edit allergen description', () => {
        createAllergen('New allergen', 'Allergen description');
        cy.reload()

        cy.get('#allergens .allergen').eq(0).find('.icon').click()
        cy.get('.editor-box-title').contains('Allergen description').parent().find('input').click({force: true}).clear().type('Updated description');
        cy.get('.save-button').click();

        cy.get('#allergens .allergen').eq(0).find('.description').should('have.text', 'Updated description')
        cy.reload()
        cy.get('#allergens .allergen').eq(0).find('.description').should('have.text', 'Updated description')
    })

    it('Empty name not allowed', () => {
        cy.get('.create').click()
        cy.get('.editor-box-title').contains('Allergen name').parent().find('input').click();
        cy.get('.editor-box-title').contains('Allergen description').parent().find('input').click().type('Description');

        cy.get('.editor-box-title').contains('Allergen name').parent().find('mat-error').contains('Invalid value')
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Empty description not allowed', () => {
        cy.get('.create').click()
        cy.get('.editor-box-title').contains('Allergen description').parent().find('input').click()
        cy.get('.editor-box-title').contains('Allergen name').parent().find('input').click().type('Name');

        cy.get('.editor-box-title').contains('Allergen description').parent().find('mat-error').contains('Invalid value')
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Adds allergens in valid order', () => {
        createAllergen('New allergen C', 'Allergen description');
        createAllergen('New allergen D', 'Allergen description');
        createAllergen('New allergen A', 'Allergen description');
        createAllergen('New allergen B', 'Allergen description');

        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'New allergen A')
        cy.get('#allergens .allergen').eq(1).find('.name').should('have.text', 'New allergen B')
        cy.get('#allergens .allergen').eq(2).find('.name').should('have.text', 'New allergen C')
        cy.get('#allergens .allergen').eq(3).find('.name').should('have.text', 'New allergen D')

        cy.reload();

        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'New allergen A')
        cy.get('#allergens .allergen').eq(1).find('.name').should('have.text', 'New allergen B')
        cy.get('#allergens .allergen').eq(2).find('.name').should('have.text', 'New allergen C')
        cy.get('#allergens .allergen').eq(3).find('.name').should('have.text', 'New allergen D')
    })
})