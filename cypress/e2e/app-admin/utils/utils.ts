export function loginAsAdmin() {
    cy.visit('/admin')
    cy.get('#login-input').click().type('admin@email.com')
    cy.get('#password-input').click().type('admin')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/login/select-organization')

    cy.get('h2').contains('Empty').click()
}