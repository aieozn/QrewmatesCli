import { prepareOrder } from "../utils/utils"
import { complexOrder, simpleOrder } from "../../utils/fixtures";
import { validateSummary } from "../../utils/utils";

function getItemGroupCard(name: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.menu-item .menu-item-name')
        .contains(name)
        .parent()
        .parent();
}

describe('Prepare cart', () => {
    beforeEach(() => {
        cy.visit('/menu/R0TAXI000000/TABLE0PT0001')
    })

    it('Order not allowed when no items has been added', () => {
        cy.get('#order-submit').should('not.exist');
    })

    it('Highlights selected items', () => {
        prepareOrder({
            elements: [
                {
                    group: 'Pizza Margherita',
                    item: 'Mała'
                },
                {
                    group: 'Pizza Capricciosa',
                    item: 'Średnia',
                    count: 2
                }
            ],
            expectedPrice: '(3) 64.97 zł'
        });

        
        getItemGroupCard('Pizza Margherita').should('have.class', 'selected');
        getItemGroupCard('Pizza Margherita').find('.menu-item-count p').contains('1')

        getItemGroupCard('Pizza Capricciosa').should('have.class', 'selected');
        getItemGroupCard('Pizza Capricciosa').find('.menu-item-count p').contains('2')
    })

    it('Removes order from cache after six hours', () => {
        prepareOrder(complexOrder);

        cy.clock(new Date().getTime() +(1000 * 60 * 60) * 7, ['Date']);

        //Buy some time for cloak
        cy.get('#subscribeButton').click();
        validateSummary(complexOrder);

        cy.get('#order-submit').should('exist');

        cy.reload();

        cy.get('#order-submit').should('not.exist');
    })

    it('Removes element from order', () => {
        prepareOrder(simpleOrder);

        throw new Error("not implemented yet")
    })
    
    // TODO odznaczanie elementów
})