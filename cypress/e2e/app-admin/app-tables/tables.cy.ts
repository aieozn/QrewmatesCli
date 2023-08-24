import { getUserToken } from "../../utils/utils"
import { flushKebebKing, loginAsKebabKingAdmin } from "../utils/utils"

describe('Edit tables', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: tables', () => loginAsKebabKingAdmin())
        cy.visit('/admin/tables')
    })

    it('Creates table', () => {
        cy.get('#create').click()

        cy.get('.editor-box-title').contains('Table name')
            .parent().find('input').click().clear().type('New table name');

        cy.get('.save-button').click()
        cy.url().should('match', new RegExp('/admin/tables/table/.{12}$'))
    })

    it('Removes table', () => {
        getTable('TABLE0KK0002').then(response => {
            expect(response.status).to.be.equal(200)
        })

        cy.visit('/admin/tables/table/TABLE0KK0002')
        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)

        getTable('TABLE0KK0002').then(response => {
            expect(response.status).to.be.equal(404)
        })
    })

    it('Edit name', () => {
        cy.visit('/admin/tables/table/TABLE0KK0002')

        cy.get('.editor-box-title').contains('Table name')
            .parent().find('input').click().clear().type('Updated table name');

        cy.get('.save-button').click()
        cy.visit('/admin/tables/table/TABLE0KK0002')

        cy.get('.editor-box-title').contains('Table name')
            .parent().find('input').should('have.value', 'Updated table name')
    })

    it('Empty name not allowed', () => {
        cy.visit('/admin/tables/table/TABLE0KK0002')

        cy.get('.editor-box-title').contains('Table name')
            .parent().find('input').click().clear();

        cy.get('.save-button').should('have.class', 'disabled')
        cy.get('.save-button').click()

        cy.get('.editor-box-title').contains('Table name').parent().find('mat-error').contains('Invalid value')
    })

    function getTable(id: string) {
        return getUserToken('root@email.com', 'root',).then(token => cy.request({
            method: 'GET',
            url: '/api/public/v1/restaurant/R0KING000000/tables/' + id,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": "Bearer " + token
            },
            failOnStatusCode: false
        }))
    }
})