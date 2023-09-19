import { acceptOrderAsAdmin } from "../../utils/utils";
import { fakeOrder, findActiveOrder, findAssignedToMeOrder, findPendingOrder, loginAsStaff, removeAllOrders } from "../utils/utils"

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
    
        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*/status').as('updateStatus')
    })

    it('Hides when accepted by other user', () => {
        cy.visit('/staff/active')

        fakeOrder('order/request/tab1-order.json', 'R0TAXI000000');
        fakeOrder('order/request/tab2-order.json', 'R0TAXI000000');

        fakeOrder('order/request/tab3-order.json', 'R0TAXI000000').then(e => {
            cy.get('.pending-order h3').contains('Table 3');
            acceptOrderAsAdmin(e)

            cy.get('.pending-order h3').contains('Table 3').should('not.exist');
        })
    })

    it('Moves to active when accepted by other user', () => {
        cy.visit('/admin/orders')

        fakeOrder('order/request/tab1-order.json', 'R0TAXI000000');
        fakeOrder('order/request/tab2-order.json', 'R0TAXI000000');

        fakeOrder('order/request/tab3-order.json', 'R0TAXI000000').then(e => {
            cy.get('.pending-order h3').contains('Table 3');
            acceptOrderAsAdmin(e)

            cy.get('.pending-order h3').eq(2).contains('Table 3');
        })
    })

    it('[Overdue] Reject staff', () => {
        cy.visit('/staff/active')
        
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

    it('[Overdue] Reject admin', () => {
        cy.visit('/admin/orders')
        
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

    it('[Overdue (trough details view)] Reject', () => {
        cy.visit('/staff/active')

        initOrders();

        cy.get('.pending-order h3').contains('Table 4').should('exist');
        findPendingOrder('Table 4').click();
        cy.get('.order-action-button').contains('Reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()

        cy.get('.pending-order h3').contains('Table 4').should('not.exist');

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/reject-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Reject', () => {
        cy.visit('/admin/orders')
        
        initOrders();

        cy.get('.pending-order h3').contains('Table 4').should('exist');
        findPendingOrder('Table 4').click();
        cy.get('.order-action-button').contains('Reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()

        cy.get('.pending-order h3').contains('Table 4').should('not.exist');

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/reject-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Serve -> Pay', () => {
        cy.visit('/staff/active')

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

    it('[Overdue] Accept -> Serve -> Pay', () => {
        cy.visit('/admin/orders')
        
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.done').click();
        findActiveOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.payed').click();
        cy.get('.pending-order h3').contains('Table 1').find('.order-action').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> Serve -> Pay', () => {
        cy.visit('/staff/active')
        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as served').click();
        
        findAssignedToMeOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as payed').click();
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> Serve -> Pay', () => {
        cy.visit('/admin/orders')
        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('h3').click();
        cy.get('.order-action-button').contains('Mark as served').click();
        
        findActiveOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as payed').click();
        cy.get('.pending-order h3').contains('Table 1').find('.order-action').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> PAY -> Serve', () => {
        cy.visit('/staff/active')

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

    it('[Overdue] Accept -> PAY -> Serve', () => {
        cy.visit('/admin/orders')

        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.payed').click();
        findActiveOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.done').click();
        cy.get('.pending-order h3').contains('Table 1').find('.order-action').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> PAY -> Serve', () => {
        cy.visit('/staff/active')
        
        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as payed').click();

        findAssignedToMeOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as served').click();

        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> PAY -> Serve', () => {
        cy.visit('/admin/orders')
        
        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('h3').click();
        cy.get('.order-action-button').contains('Mark as payed').click();

        findActiveOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').click();
        cy.get('.order-action-button').contains('Mark as served').click();

        cy.get('.pending-order h3').contains('Table 1').find('.order-action').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/serve-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Cancel', () => {
        cy.visit('/staff/active')

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

    it('[Overdue] Accept -> Cancel', () => {
        cy.visit('/admin/orders')
        
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> Cancel', () => {
        cy.visit('/staff/active')

        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findAssignedToMeOrder('Table 1').click();
        cy.get('.order-action-button').contains('Cancel').click();

        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue (trough details view)] Accept -> Cancel', () => {
        cy.visit('/admin/orders')
        
        initOrders()

        findPendingOrder('Table 1').click();
        cy.get('.order-action-button').contains('Accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('h3').click();
        cy.get('.order-action-button').contains('Cancel').click();

        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })

    it('[Overdue] Accept -> Pay -> Cancel', () => {
        cy.visit('/staff/active')

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

    it('[Overdue] Accept -> Pay -> Cancel', () => {
        cy.visit('/admin/orders')
        
        initOrders()

        findPendingOrder('Table 1').find('.order-action.accept').click();

        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/accept-order.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.payed').click();
        findActiveOrder('Table 1')
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/pay-offline.json').should('deep.equal', interception.request.body)
        })

        findActiveOrder('Table 1').find('.order-action.reject').click();
        cy.get('#dialog textarea').click().type('Sorry, the product is out of stock');
        cy.get('.button.reject').click()
        
        cy.get('.pending-order h3').contains('Table 1').should('not.exist');
        cy.wait('@updateStatus').then((interception) => {
            cy.fixture('order/update/cancel-order.json').should('deep.equal', interception.request.body)
        })
    })
})