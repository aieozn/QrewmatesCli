import { flushPizzaTaxi } from "../../app-staff/utils/utils"

describe('Register', () => {

    beforeEach(() => {
        flushPizzaTaxi()
    })

    it('Registration not found for invalid secret', () => {
        cy.visit('/login/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
        cy.location('pathname').should('eq', '/registration/not-found')
    })

    it('Assigns restaurant admin to existing user', () => {
        cy.visit('/login/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/login/select-organization')

        cy.get('.organization').should('have.length', 2)
        cy.get('.organization').contains('Pizza taxi na miasteczku').click()
        cy.location('pathname').should('eq', '/admin/statistics')
    })

    it('Assigns restaurant staff to existing user', () => {
        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/login/select-organization')

        cy.get('.organization').should('have.length', 2)
        cy.get('.organization').contains('Pizza taxi na miasteczku').click()
        cy.location('pathname').should('eq', '/staff/active')
    })

    it('Rejects invitation', () => {
        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#reject').click()

        cy.visit('login/select-organization')
        cy.get('.organization').should('have.length', 1)
        cy.get('.organization').should('have.text', 'Panda Ramen')

        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.location('pathname').should('eq', '/registration/not-found')
    })

    it('Upgrades privilages', () => {
        cy.visit('/login/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('taxi.staff@email.com')
        cy.get('#password-input').click().type('taxi.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/admin/statistics')
    })

})