describe('Prepare modify make order', () => {
    // test with removing

    beforeEach(() => {
        cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
        cy.intercept('POST', '/api/public/v1/restaurant/R0TAXI000000/order-instances').as('makeOrder')
    })
})