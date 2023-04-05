import { doOrderAndValidate, OrderDefinition } from "../../../support/commands";

const simpleOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }]
        },
    ],
    expectedPrice: '14.99 zł'
}

const orderWithSelect : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Średnia',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy (+7.99 zł)'
            }]
        },
    ],
    expectedPrice: '36.98 zł'
}

const orderWithToppings : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Duża',
            selects: [
                {
                    groupName: 'Brzegi ciasta',
                    selectName: 'Ze serem'
                },
                {
                    groupName: 'Baza',
                    selectName: 'Pomidorowy'
                }
            ],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'boczek (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kiełbasa wiejska (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kabanosowe boczki (+7.99 zł)',
                }
            ]
        },
    ],
    expectedPrice: '64.96 zł'
}

const orderWithComment : OrderDefinition = {
    ...simpleOrder,
    comment: 'I\'m sooo hungry!'
}

const orderWithOrderElementComment : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Funghi',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            comment: 'Please remove dough from pizza'
        },
    ],
    expectedPrice: '19.99 zł'
}

describe('Make order', () => {

    beforeEach(() => {
      cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
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

    // TODO testy invalid table ref
    // TODO test with removing
    // TODO testy odświeżenia strony
    // TODO kila elementów
    // TODO kilka elementów z +
    // TODO zamówienie złożone
    // TODO edycja w trybie edycji
})