import { removeOrderElement, validateSummary } from "../../utils/utils"
import { addSelect, addTopping, prepareOrder } from "../utils/utils"
import { margheritaWithSanMarzanoOrder, orderWithToppings, orderWithToppingsAndSelects, orderWithToppingsAndSelectsCleared, orderWithToppingsMinusBacon, simpleDoubleOrder, simpleOrder, simpleOrderPlusBacon } from "../../utils/fixtures"

describe('Prepare modify make order', () => {
    // test with removing

    beforeEach(() => {
        cy.visit('/table-order/R0TAXI000000/TABLE0PT0001')
        cy.intercept('POST', '/api/public/v1/restaurant/R0TAXI000000/order-instances').as('makeOrder')
    })

    it('Remove element from order', () => {
        // Create basic order
        prepareOrder(simpleDoubleOrder);
        cy.get('#subscribeButton').click();
        validateSummary(simpleDoubleOrder);

        // Modify
        removeOrderElement(1);
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

    it('Change select in order', () => {
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

    it('Remove topping from order', () => {
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

    it('Add topping to order', () => {
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
    
    it('Change order option', () => {
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

        // Modify
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

    it('Keep changes after dialog close', () => {
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

        // Close
        cy.get('#close-icon').click();
        cy.get('#subscribeButton').click();

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
})