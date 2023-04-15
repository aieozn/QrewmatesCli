import { addSelect, addTopping, prepareOrder, removeOrderElement, validateSummary } from "../../../support/commands"
import { margheritaWithSanMarzanoOrder, orderWithToppings, orderWithToppingsAndSelects, orderWithToppingsAndSelectsCleared, orderWithToppingsMinusBacon, simpleDoubleOrder, simpleOrder, simpleOrderPlusBacon } from "./fixtures"

describe('Prepare modify make order', () => {
    // test with removing

    beforeEach(() => {
        cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
        cy.intercept('POST', '/api/public/v1/restaurant/R0TAXI000000/order-instances').as('makeOrder')
    })

    it('Removes element from order', () => {
        // Create basic order
        prepareOrder(simpleDoubleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleDoubleOrder);

        // Modify
        removeOrderElement(1);
        cy.get('#subscribeButton').click();
        validateSummary(simpleOrder);
        
        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Add element to order', () => {
        // Create basic order
        prepareOrder(simpleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleOrder);

        // Modify
        cy.get('#generic-dialog-card-header #close-icon').click();
        prepareOrder(simpleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleDoubleOrder);

        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-double-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Changes select in order', () => {
        // Create basic order
        prepareOrder(margheritaWithSanMarzanoOrder);
        cy.get('#subscribeButton').click();
        validateSummary(margheritaWithSanMarzanoOrder);

        // Modify
        cy.get("#order-summary .summary-element").click();
        addSelect({
            groupName: 'Baza',
            selectName: 'Pomidorowy'
        })
        cy.get('#add-button').click();
        validateSummary(simpleOrder);

        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Removes topping from order', () => {
        // Create basic order
        prepareOrder(orderWithToppings);
        cy.get('#subscribeButton').click();
        validateSummary(orderWithToppings);

        // Modify
        cy.get("#order-summary .summary-element").click();
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        validateSummary(orderWithToppingsMinusBacon);

        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-minus-bacon.json')
            .should('deep.equal', interception.request.body)
        })
    })

    it('Adds topping to order', () => {
        // Create basic order
        prepareOrder(simpleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleOrder);

        // Modify
        cy.get("#order-summary .summary-element").click();
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        validateSummary(simpleOrderPlusBacon);

        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-order-plus-bacon.json')
            .should('deep.equal', interception.request.body)
        })
    })
    
    it('Changes order option', () => {
        // Create basic order
        prepareOrder(orderWithToppingsAndSelects);
        cy.get('#subscribeButton').click();
        validateSummary(orderWithToppingsAndSelects);

        // Modify
        cy.get("#order-summary .summary-element").click();
        cy.get('#item-select').click();
        cy.get('.cdk-overlay-pane mat-option').contains('Średnia').click()
        cy.get('#add-button').click();
        validateSummary(orderWithToppingsAndSelectsCleared);

        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-and-selects-cleared.json')
            .should('deep.equal', interception.request.body)
        })
    })

    it('Changes elements count', () => {
        // Create basic order
        prepareOrder(simpleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleOrder);

        // // Modify
        cy.get("#order-summary .summary-element").click();
        cy.get("#count-value-plus").click();
        cy.get('#add-button').click();
        validateSummary(simpleDoubleOrder);
        
        // Subscribe
        cy.get('.full-width-dialog #subscribeButton').click();
        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        // Expect
        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-double-order.json').should('deep.equal', interception.request.body)
        })
    })
})