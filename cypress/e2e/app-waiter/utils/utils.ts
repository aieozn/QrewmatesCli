import { getUserToken } from "../../utils/utils"

export function loginAsStaff() {
    cy.visit('/login')
    cy.get('#login-input').click().type('taxi.staff@email.com')
    cy.get('#password-input').click().type('taxi.staff')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/staff')
}

export async function removeAllOrders() {
    const token = await getUserToken('root@email.com', 'root');

    const response = await fetch("/api/staff/v1/restaurant/R0TAXI000000/order-instances", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        "method": "DELETE"
    });

    if (response.status !== 200) {
        throw 'Invalid response status'
    }
}

export function fakeOrder(file: string) : Cypress.Chainable<string> {
    return cy.fixture(file).then((fixture: string) => {
        return cy.request({
            method: 'POST',
            url: '/api/public/v1/restaurant/R0TAXI000000/order-instances',
            body: fixture,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(e => {
            return e.body.ref as string
        })
    })
}

export function findPendingOrder(table: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
        .get('app-menu-horizontal-element-wrapper[name="Pending orders"] .pending-order h3')
        .contains(table)
        .parents('.pending-order')
}

export function findAssignedToMeOrder(table: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
        .get('app-menu-horizontal-element-wrapper[name="Assigned to me"] .pending-order h3')
        .contains(table)
        .parents('.pending-order')
}