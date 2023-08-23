import { flushKebebKing, getTableImage, loginAsKebabKingAdmin } from "../utils/utils";

describe('Edit allergens', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: customization', () => loginAsKebabKingAdmin())
        cy.visit('/admin/customization')
    })


    it('Selects background image', () => {
        cy.visit('/menu/R0KING000000/TABLE0KK0001')

        cy.get('#banner')
            .should('have.css', 'background-image')
            .and('include', 'none')

        cy.visit('/admin/customization')

        cy.get('#file-upload-background-photo').selectFile('cypress/fixtures/fries.jpeg', {force: true})
        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')


        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-image')
            .and('include', '/api/public/v1/restaurant/R0KING000000/multimedia/')
    })

    it('Selects qr theme', () => {
        getTableImage().then(response => {
            expect(response.headers).to.have.property('content-type', 'image/png')
            expect(response.body).to.have.length.gt(72400)
            expect(response.body).to.have.length.lt(72500)
        })

        cy.get('h3').contains('QR theme').parent().find('#sendFile').click()
        cy.get('#configs .config').eq(0).click();
        cy.get('.save-button').click()

        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')

        getTableImage().then(response => {
            expect(response.headers).to.have.property('content-type', 'image/png')
            expect(response.body).to.have.length.gt(28000)
            expect(response.body).to.have.length.lt(28100)
        })
    })

    it('Selects restaurant color', () => {
        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-color')
            .and('include', 'rgb(56, 165, 131)')

        cy.visit('/admin/customization')
        cy.get('h3').contains('Select theme main color').parent().find('#sendFile').click()
        cy.get('.color-picker.open .hex-text input').click().clear().type('#a59d38')
        cy.get('#personalization').click()

        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')

        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-color')
            .and('include', 'rgb(165, 157, 56)')
    })
});