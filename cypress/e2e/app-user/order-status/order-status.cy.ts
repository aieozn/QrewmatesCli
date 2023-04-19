import { simpleOrder } from "../../utils/fixtures";
import { acceptOrder, cancelOrder, rejectOrder, serveOrder } from "../../utils/utils";
import { doOrderAndValidate } from "../utils/utils";

describe('Order status', () => {
    beforeEach(() => {
        cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
        cy.intercept('POST', '/api/public/v1/restaurant/R0TAXI000000/order-instances').as('makeOrder')
    })

    it('[Overdue] Reject', () => {
        doOrderAndValidate(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').its('response.body').then(e => {
            const ref = e.ref as string
            rejectOrder(ref)

            cy.get('#dialog #thanks').contains('Order rejected');
            cy.get('#dialog .message').contains('Your order has been rejected');
            cy.get('#dialog .comment').contains('Sorry, the product is out of stock');
        })
    })

    it('[Overdue] Keeps order state', () => {
        doOrderAndValidate(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').its('response.body').then(e => {
            const ref = e.ref as string
            rejectOrder(ref)

            cy.get('#dialog #thanks').contains('Order rejected');
            cy.get('#dialog .message').contains('Your order has been rejected');
            cy.get('#dialog .comment').contains('Sorry, the product is out of stock');

            cy.visit('/menu/R0TAXI000000/TABLE0PT0001')

            cy.get('#dialog #thanks').contains('Order rejected');
            cy.get('#dialog .message').contains('Your order has been rejected');
            cy.get('#dialog .comment').contains('Sorry, the product is out of stock');

            cy.get('#return-button').click();
            cy.get('#dialog #thanks').should('not.exist')

            cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
            cy.get('#dialog #thanks').should('not.exist')
        })
    })
    
    it('[Overdue] Accept -> Serve', () => {
        doOrderAndValidate(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').its('response.body').then(e => {
            const ref = e.ref as string

            acceptOrder(ref)
            cy.get('#dialog #thanks').contains('Thank you for your order');
            cy.get('#dialog .message').contains('Your order has been approved and is being prepared');

            serveOrder(ref)
            cy.get('#dialog #thanks').contains('The order has been delivered');
            cy.get('#dialog .message').contains('Enjoy your meal');
        })
    })

    it('[Overdue] Accept -> Cancel', () => {
        doOrderAndValidate(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').its('response.body').then(e => {
            const ref = e.ref as string

            acceptOrder(ref)
            cy.get('#dialog #thanks').contains('Thank you for your order');
            cy.get('#dialog .message').contains('Your order has been approved and is being prepared');

            cancelOrder(ref)
            cy.get('#dialog #thanks').contains('Order cancelled');
            cy.get('#dialog .message').contains('Your order has been cancelled');
            cy.get('#dialog .comment').contains('Sorry, the product is out of stock');
        })
    })
})