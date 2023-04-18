import { addSelect, addTopping }  from "../../app-user/utils/utils";
import { margheritaWithSanMarzanoOrder, orderWithToppings, orderWithToppingsAndSelects, orderWithToppingsAndSelectsCleared, orderWithToppingsMinusBacon, simpleDoubleOrder, simpleOrder, simpleOrderPlusBacon } from "../../utils/fixtures";
import { removeOrderElement, validateSummary } from "../../utils/utils";
import { fakeOrder, loginAsStaff, removeAllOrders } from "../utils/utils";

describe('Edit order', () => {

    beforeEach(() => {
        cy.wrap(removeAllOrders())
        cy.session('login', () => loginAsStaff())
        cy.visit('/staff')

        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*').as('updateOrder')
    })

    it('Does not modify the order when close icon is clicked', () => {
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
    
    it('Remove element from order', () => {
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

    it('Changes select in order', () => {
        fakeOrder('order/request/margherita-with-san-marzano.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(margheritaWithSanMarzanoOrder, false)

        // Modify
        cy.get('.summary-element').click()
        addSelect({
            groupName: 'Baza',
            selectName: 'Pomidorowy'
        })
        cy.get('#add-button').click();
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order #edited').contains('Edited')
        cy.get('.pending-order').click();
        validateSummary(simpleOrder);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Removes topping from order', () => {
        fakeOrder('order/request/order-with-toppings.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(orderWithToppings, false)

        // Modify
        cy.get('.summary-element').click()
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order #edited').contains('Edited')
        cy.get('.pending-order').click();
        validateSummary(orderWithToppingsMinusBacon, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-minus-bacon.json').should('deep.equal', interception.request.body)
        })
    })

    it('Adds topping to order', () => {
        fakeOrder('order/request/simple-order.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(simpleOrder, false)

        // Modify
        cy.get('.summary-element').click()
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order #edited').contains('Edited')
        cy.get('.pending-order').click();
        validateSummary(simpleOrderPlusBacon, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-order-plus-bacon.json').should('deep.equal', interception.request.body)
        })
    })

    it('Change order option', () => {
        fakeOrder('order/request/order-with-toppings-and-selects.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(orderWithToppingsAndSelects, false)

        // Modify
        cy.get('.summary-element').click()
        cy.get('#item-select').click();
        cy.get('.cdk-overlay-pane mat-option').contains('Średnia').click()
        cy.get('#add-button').click();
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order #edited').contains('Edited')
        cy.get('.pending-order').click();
        validateSummary(orderWithToppingsAndSelectsCleared, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-and-selects-cleared.json').should('deep.equal', interception.request.body)
        })
    })

    it.only('Changes element count', () => {
        fakeOrder('order/request/simple-order.json')

        // Load
        cy.get('.pending-order').click();
        validateSummary(simpleOrder, false)

        // Modify
        cy.get('.summary-element').click()
        cy.get("#count-value-plus").click();
        cy.get('#add-button').click();
        cy.get('#subscribeButton').click();

        // Validate
        cy.get('.pending-order #edited').contains('Edited')
        cy.get('.pending-order').click();
        validateSummary(simpleDoubleOrder, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-double-order.json').should('deep.equal', interception.request.body)
        })
    })
})