import { validateSummary } from "../../utils/utils";
import { doOrderAndValidate, prepareOrder } from "../utils/utils";
import { complexOrder, orderWithComment, orderWithMultipleElements, orderWithMultipliedComplexElement, orderWithMultipliedElement, orderWithOrderElementComment, orderWithSelect, orderWithToppings, simpleOrder } from "../../utils/fixtures";

describe('Prepare make order', () => {

    beforeEach(() => {
      cy.visit('/table-order/R0TAXI000000/TABLE0PT0001')
      cy.intercept('POST', '/api/public/v1/restaurant/R0TAXI000000/order-instances').as('makeOrder')
    })

    it('Makes simple order', () => {
        doOrderAndValidate(simpleOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/simple-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with select', () => {
        doOrderAndValidate(orderWithSelect);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-select.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with topping', () => {
        doOrderAndValidate(orderWithToppings);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-toppings.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with comment', () => {
        doOrderAndValidate(orderWithComment);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-comment.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with order element comment', () => {
        doOrderAndValidate(orderWithOrderElementComment);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-order-element-comment.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with multiple elements', () => {
        doOrderAndValidate(orderWithMultipleElements);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-multiple-elements.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with multiplied element', () => {
        doOrderAndValidate(orderWithMultipliedElement);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-multiplied-element.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes order with multiplied complex element', () => {
        doOrderAndValidate(orderWithMultipliedComplexElement);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/order-with-multiplied-complex-element.json').should('deep.equal', interception.request.body)
        })
    })

    it('Makes complex order', () => {
        doOrderAndValidate(complexOrder);

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/complex-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('Keeps order in cache', () => {
        prepareOrder(complexOrder);

        cy.reload();

        cy.get('#subscribeButton').click();
        validateSummary(complexOrder);
        cy.get('.full-width-dialog #subscribeButton').click();

        cy.get('#dialog #thanks').contains('Order confirmation is in progress');
        cy.get('#dialog .message').contains('Wait for the restaurant to confirm your order');

        cy.wait('@makeOrder').then((interception) => {
            cy.fixture('order/request/complex-order.json').should('deep.equal', interception.request.body)
        })
    })
})