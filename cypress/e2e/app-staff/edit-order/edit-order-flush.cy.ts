import { editGroupItem, openGroupItem } from "../../app-admin/utils/utils";
import { orderWithMultipleMargheritaDeleted, orderWithSelect, orderWithToppings, simpleOrder } from "../../utils/fixtures";
import { validateDetails, validateSummary } from "../../utils/utils";
import { deleteGroup, fakeOrder, flushPizzaTaxi, loginAsAdmin } from "../utils/utils";

const initialConditions = [
    { url: '/staff/active' },
    { url: '/admin/orders' },
];

initialConditions.forEach(condition => {

describe('Edit order flush', () => {

    beforeEach(() => {
        flushPizzaTaxi()
        cy.session('login as staff (v2)', () => loginAsAdmin())
        
        cy.visit(condition.url)
        cy.intercept('PUT', '/api/staff/v1/restaurant/R0TAXI000000/order-instances/*').as('updateOrder')
    })

    after(() => {
        flushPizzaTaxi()
    })

    it('Order element is modifable by default', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')

        cy.get('.pending-order').eq(13).click();
        validateDetails(simpleOrder, false);
        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()
        validateSummary(simpleOrder, false)
        cy.get('.summary-element').eq(0).parent().find('.modified-warning').should('not.exist')
    })

    it('Has element assigned when group is deleted', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')

        cy.get('.pending-order').eq(13).click();
        validateDetails(simpleOrder, false);

        deleteGroup('IG0PT0000000').then(() => {
            cy.visit(condition.url)
            cy.get('.pending-order').eq(13).click();
            validateDetails(simpleOrder, false);

            cy.get('.order-action-button').contains('Edit').click()
            cy.get('#subscribeButton').click()

            validateSummary(simpleOrder, false)

            cy.get('.summary-element').eq(0).parent().find('.modified-warning').contains('Dish definition has changed, so you can only remove it')
        })
    })

    it('Has element assigned when item name is modified', () => {
        fakeOrder('order/request/simple-order.json', 'R0TAXI000000')

        // Modify item
        cy.visit('/admin/menu/category/C0PT00000000/group/IG0PT0000000')
        editGroupItem('Pizza Margherita', 'Mała', 'Bardzo mała', 15.99, [], [], [])

        cy.visit(condition.url)
        cy.get('.pending-order').eq(13).click();
        validateDetails(simpleOrder, false);

        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()

        validateSummary(simpleOrder, false)
        cy.get('.summary-element').eq(0).parent().find('.modified-warning').contains('Dish definition has changed, so you can only remove it')
    })

    it('Has element assigned when item toppings modified', () => {
        fakeOrder('order/request/order-with-toppings.json', 'R0TAXI000000')

        // Modify item
        cy.visit('/admin/menu/category/C0PT00000003/group/IG0PT0000013')
        openGroupItem('Pizza Barbecue Bonanza', 'Duża');
        cy.get('.editor-box-title').contains('Item name').parent().find('input').should('have.value', 'Duża')
        cy.get('#tabs span').contains('Toppings').parent().click()

        cy.get('.collection').eq(0).parent().find('mat-checkbox').click()
        cy.get('.save-button').should('not.have.class', 'disabled').click();

        cy.url().should('match', new RegExp('.*/category/.{12}/group/.{12}$'))
        cy.visit(condition.url)

        cy.get('.pending-order').eq(13).click();
        validateDetails(orderWithToppings, false);

        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()

        validateSummary(orderWithToppings, false)
        cy.get('.summary-element').eq(0).parent().find('.modified-warning').contains('Dish definition has changed, so you can only remove it')
    })

    it('Has element assigned when item selects modified', () => {
        fakeOrder('order/request/order-with-select.json', 'R0TAXI000000')

        // Modify item
        cy.visit('/admin/menu/category/C0PT00000003/group/IG0PT0000013')
        openGroupItem('Pizza Barbecue Bonanza', 'Średnia');

        cy.get('.editor-box-title').contains('Item name').parent().find('input').should('have.value', 'Średnia')

        cy.get('#tabs span').contains('Selects').parent().click()

        cy.get('.collection').eq(0).parent().find('mat-checkbox').click()
        cy.get('.save-button').should('not.have.class', 'disabled').click();

        cy.url().should('match', new RegExp('.*/category/.{12}/group/.{12}$'))
        cy.visit(condition.url)

        cy.get('.pending-order').eq(13).click();
        validateDetails(orderWithSelect, false);

        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()

        validateSummary(orderWithSelect, false)
        cy.get('.summary-element').eq(0).parent().find('.modified-warning').contains('Dish definition has changed, so you can only remove it')
    })

    it('Deletes not modifable element from order', () => {
        fakeOrder('order/request/order-with-multiple-elements.json', 'R0TAXI000000')

        deleteGroup('IG0PT0000000');
        cy.visit(condition.url)

        cy.get('.pending-order').eq(13).click();
        cy.get('.order-action-button').contains('Edit').click()
        cy.get('#subscribeButton').click()

        cy.get('.summary-element').eq(3).find('.summary-element-name').should('have.text', 'Pizza Margherita (Mała)');

        cy.get('.summary-element').eq(3).parent().find('.modified-warning').contains('Dish definition has changed, so you can only remove it')
        cy.get('.remove-element').eq(0).click();

        cy.get('.summary-element').should('have.length', 3);

        cy.get('#order-submit #subscribeButton').contains('Save').click();
        cy.get('#save-changes').click()

        cy.get('.pending-order').eq(13).click();
        validateDetails(orderWithMultipleMargheritaDeleted, false)
    })

})

})