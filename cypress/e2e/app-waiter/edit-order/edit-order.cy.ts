import { simpleDoubleOrder, simpleOrder } from "../../utils/fixtures";
import { removeOrderElement, validateSummary } from "../../utils/utils";
import { fakeOrder, loginAsStaff, removeAllOrders } from "../utils/utils";

describe('Edit order', () => {

    beforeEach(() => {
        cy.wrap(removeAllOrders())
        cy.session('login', () => loginAsStaff())
        cy.visit('/staff')

        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*').as('updateOrder')
    })
    
    it('Removes element from order', () => {
        fakeOrder('order/request/simple-double-order.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(simpleDoubleOrder, false)

        // Modify
        removeOrderElement(1);
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order').click();
        validateSummary(simpleOrder);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/update/remove-element.json').should('deep.equal', interception.request.body)
        })
    })

    it.only('Does not modifies order when close icon clicked', () => {
        fakeOrder('order/request/simple-double-order.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(simpleDoubleOrder, false)

        // Modify
        removeOrderElement(1);
        cy.get('#close-icon').click();

        // Validate
        cy.get('.pending-order').click();
        validateSummary(simpleDoubleOrder);
    })
})