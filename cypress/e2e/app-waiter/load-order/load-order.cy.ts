import { simpleOrder } from "../../utils/fixtures";
import { validateSummary } from "../../utils/utils";
import { fakeOrder, loginAsStaff, removeAllOrders } from "../utils/utils";

describe('Load order', () => {
    before(() => {
        removeAllOrders();
        loginAsStaff();
    })

    it('Receives simple order', async () => {
        fakeOrder('order/request/simple-order.json')
        cy.get('.pending-order').should('have.length', 1)
        cy.get('.order-description h3').contains('Table 1')

        cy.get('.pending-order').click();
        cy.get('#generic-dialog-card-header').contains('Order summary')
        validateSummary(simpleOrder)
    })
})