import { createOrder, OrderDefinition } from "../../../support/commands";

const simpleOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała'
        },
    ],
    expectedPrice: '14.99 zł'
}

describe('Make order', () => {

    beforeEach(() => {
      cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
    })

    it('Makes simple order', () => {
        createOrder(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');
    })

    // TODO test with note
    // TODO testy invalid table ref
})