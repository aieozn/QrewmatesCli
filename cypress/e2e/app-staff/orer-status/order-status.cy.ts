import { acceptOrderAsAdmin } from "../../utils/utils";
import { fakeOrder, findAssignedToMeOrder, findPendingOrder, loginAsStaff, removeAllOrders } from "../utils/utils"

function initOrders() {
    fakeOrder('order/request/tab1-order.json', 'R0TAXI000000');
    fakeOrder('order/request/tab2-order.json', 'R0TAXI000000');
    fakeOrder('order/request/tab3-order.json', 'R0TAXI000000');
    fakeOrder('order/request/tab4-order.json', 'R0TAXI000000');
    fakeOrder('order/request/tab5-order.json', 'R0TAXI000000');
}


describe('Order status', () => {
    beforeEach(() => {
        removeAllOrders()
        cy.session('login as staff 3', () => loginAsStaff())
        cy.visit('/staff')

        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*/status').as('updateStatus')
    })

    it('Hides when accepted by other user', () => {
        fakeOrder('order/request/tab1-order.json', 'R0TAXI000000');
        fakeOrder('order/request/tab2-order.json', 'R0TAXI000000');

        fakeOrder('order/request/tab3-order.json', 'R0TAXI000000').then(e => {
            cy.get('.pending-order h3').contains('Table 3');
            acceptOrderAsAdmin(e)
            cy.get('.pending-order h3').contains('Table 3').should('not.exist');
        })
    })

    it('[Overdue] Reject', () => {
        initOrders();

        cy.get('.pending-order h3').contains('Table 4').should('exist');
        findPendingOrder('Table 4').find('.order-action.reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()

        cy.get('.pending-order h3').contains('Table 4').should('not.exist');

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/reject-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Serve -> Pay', () => {
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.done').click();
        findAssignedToMeOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.payed').click();
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> PAY -> Serve', () => {
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.payed').click();
        findAssignedToMeOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.done').click();
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Cancel', () => {
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Pay -> Cancel', () => {
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.payed').click();
        findAssignedToMeOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').find('.order-action.reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })
})