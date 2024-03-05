import { addSelect, addTopping }  from "../../app-user/utils/utils";
import { margheritaWithSanMarzanoOrder, orderWithComment, orderWithToppings, orderWithToppingsAndSelects, orderWithToppingsAndSelectsCleared, orderWithToppingsMinusBacon, simpleDoubleOrder, simpleOrder, simpleOrderPlusBacon } from "../../utils/fixtures";
import { removeOrderElement, validateSummary } from "../../utils/utils";
import { fakeOrder, goToOrderEdit, loginAsStaff, removeAllOrders } from "../utils/utils";

const initialConditions = [
    { url: '/staff/active' },
    { url: '/admin/orders' },
];

initialConditions.forEach(condition => {

describe('Edit order', () => {

    beforeEach(() => {
        removeAllOrders()
        cy.session('login as staff 1', () => loginAsStaff())
        cy.visit(condition.url)

        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*').as('updateOrder')
    })

    it('Does not modify the order when close icon is clicked', () => {
        fakeOrder('order/request/simple-double-order.json', 'R0TAXI000000')

        // Load
        cy.get('.pending-order').click();
        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()
        validateSummary(simpleDoubleOrder, false)

        // Modify
        removeOrderElement(1);
        cy.get('#close-icon').click();

        cy.reload();

        // Validate
        cy.get('#subscribeButton').click()
        validateSummary(simpleDoubleOrder);
    })
    
    it('Remove element from order', () => {
        fakeOrder('order/request/simple-double-order.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(simpleDoubleOrder, false)

        // Modify
        removeOrderElement(1);
        cy.get('#order-summary .summary-element').should('have.length', 1);
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 14.99 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(simpleOrder);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/update/remove-element.json').should('deep.equal', interception.request.body)
        })
    })

    it('Changes select in order', () => {
        fakeOrder('order/request/margherita-with-san-marzano.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(margheritaWithSanMarzanoOrder, false)

        // Modify
        cy.get('.summary-element').click()
        addSelect({
            groupName: 'Baza',
            selectName: 'Pomidorowy'
        })
        cy.get('#add-button').click();
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 14.99 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(simpleOrder);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Removes topping from order', () => {
        fakeOrder('order/request/order-with-toppings.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(orderWithToppings, false)

        // Modify
        cy.get('.summary-element').click()
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 56.97 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(orderWithToppingsMinusBacon, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-minus-bacon.json').should('deep.equal', interception.request.body)
        })
    })

    it('Adds topping to order', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(simpleOrder, false)

        // Modify
        cy.get('.summary-element').click()
        addTopping({
            groupName: 'Dodatki do pizzy',
            toppingName: 'boczek'
        })
        cy.get('#add-button').click();
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 19.98 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(simpleOrderPlusBacon, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-order-plus-bacon.json').should('deep.equal', interception.request.body)
        })
    })

    it('Change order option', () => {
        fakeOrder('order/request/order-with-toppings-and-selects.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(orderWithToppingsAndSelects, false)

        // Modify
        cy.get('.summary-element').click()
        cy.get('#item-select').click();
        cy.get('.cdk-overlay-pane mat-option').contains('Średnia').click()
        cy.get('#add-button').click();
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 28.99 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(orderWithToppingsAndSelectsCleared, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings-and-selects-cleared.json').should('deep.equal', interception.request.body)
        })
    })

    it('Changes element count', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')

        // Load
        goToOrderEdit(0)
        validateSummary(simpleOrder, false)

        // Modify
        cy.get('.summary-element').click()
        cy.get("#count-value-plus").click();
        cy.get('#add-button').click();
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 14.99 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(simpleDoubleOrder, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/simple-double-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Changes order comment', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')


        // Load
        goToOrderEdit(0)

        cy.get('mat-radio-button').eq(0).find('input').should('be.focused');

        cy.get('#order-menu-chief-note').contains('Leave a message')
        cy.get('mat-radio-button').eq(0).find('input').should('be.focused');

        // Modify
        cy.get('#order-menu-chief-note textarea').focus().type("I'm sooo hungry!");
        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#summary-value').should('have.text', '(1) 14.99 zł')
        cy.get('#save-changes').click()

        // Validate
        cy.get('.pending-order').contains('Edited')
        goToOrderEdit(0)
        validateSummary(orderWithComment, false);

        // Check request
        cy.wait('@updateOrder').then((interception) => {
            cy.fixture('order/request/order-with-comment.json').should('deep.equal', interception.request.body)
        })
    })
})

})