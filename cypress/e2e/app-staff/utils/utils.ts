import { getUserToken } from "../../utils/utils"

export function loginAsStaff() {
    cy.visit('/login')
    cy.get('#login-input').click().type('taxi.staff@email.com')
    cy.get('#password-input').click().type('taxi.staff')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/staff/active')
}

export function loginAsAdmin() {
    cy.visit('/login')
    cy.get('#login-input').click().type('taxi.admin@email.com')
    cy.get('#password-input').click().type('taxi.admin')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/admin/statistics')
}

export function deleteGroup(ref: string) {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
        method: 'DELETE',
        url: '/api/staff/v1/restaurant/R0TAXI000000/menu-item-groups/' + ref,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Authorization": "Bearer " + token
        }
        })
    )
}

export function removeAllOrders() {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
            method: 'DELETE',
            url: '/api/staff/v1/restaurant/R0TAXI000000/order-instances',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": "Bearer " + token
            }
        })
    )
}

export function flushPizzaTaxi() {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
            method: 'DELETE',
            url: '/api/staff/v1/restaurant/R0TAXI000000/menu',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": "Bearer " + token
            }
        })
    )
}

export function fakeOrder(file: string, restaurantId: string) : Cypress.Chainable<string> {
    return cy.fixture(file).then((fixture: string) => cy.request({
            method: 'POST',
            url: '/api/public/v1/restaurant/' + restaurantId + '/order-instances',
            body: fixture,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(e => {
            return e.body.ref as string
        })
    )
}

export function goToOrderEdit(number: number) {
    cy.get('.pending-order').eq(number).click();
    cy.get('.order-action-button').contains('Edit').click()
    cy.get('#subscribeButton').click()
}

export function findPendingOrder(table: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h2').contains("Pending orders").parent().find('.pending-order h3')
        .contains(table)
        .parents('.pending-order')
}

export function findActiveOrder(table: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h2').contains("Active orders").parent().find('.pending-order h3')
        .contains(table)
        .parents('.pending-order')
}

export function findAssignedToMeOrder(table: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
        .get('app-menu-horizontal-element-wrapper[name="Assigned to me"] .pending-order h3')
        .contains(table)
        .parents('.pending-order')
}