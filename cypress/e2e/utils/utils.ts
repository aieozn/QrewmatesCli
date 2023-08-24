export interface OrderDefinition {
    elements: OrderElement[];
    expectedPrice: string;
    comment?: string;
}

export interface OrderElement {
    group: string;
    item?: string;
    count?: number;
    selects?: MenuItemSelect[];
    toppings?: MenuItemTopping[];
    comment?: string;
}

export interface MenuItemSelect {
    groupName: string;
    selectName: string;
}

export interface MenuItemTopping {
    groupName: string;
    toppingName: string;
}

export function removeOrderElement(num: number) {
    cy.get(".summary-element").eq(num).click();
    cy.get('#count-value-minus').click();
    // cy.get('#generic-dialog-card-header #close-icon').click();
}

function validateElementLoosely(element: OrderElement) {
    if (element.item) {
        cy.get('#order-summary .summary-element')
            .find('.summary-element-name')
            .contains(`${element.group} (${element.item})`);
    } else {
        cy.get('#order-summary .summary-element')
            .find('.summary-element-name')
            .contains(`${element.group}`);
    }
    
    if (element.selects) {
        for (const select of element.selects) {
            cy.get('#order-summary .summary-element')
                .find('.summary-element-option')
                .contains(select.selectName);
        }
    }

    if (element.toppings) {
        for (const topping of element.toppings) {
            cy.get('#order-summary .summary-element')
                .find('.summary-element-option')
                .contains(topping.toppingName)
        }
    }

    if (element.comment) {
        cy.get('#order-summary .summary-element')
            .find('.summary-element-option')
            .contains(`Comment: ${element.comment}`)
    }
}

function validateElementStrictly(element: OrderElement, elementPosition: number) {
    if (element.item) {
        cy.get('#order-summary .summary-element').eq(elementPosition)
            .find('.summary-element-name')
            .contains(`${element.group} (${element.item})`);
    } else {
        cy.get('#order-summary .summary-element').eq(elementPosition)
            .find('.summary-element-name')
            .contains(`${element.group}`);
    }
    

    let summaryElementNumber = 0;
    if (element.selects) {
        for (const select of element.selects) {
            cy.get('#order-summary .summary-element').eq(elementPosition)
                .find('.summary-element-option').eq(summaryElementNumber)
                .contains(select.selectName);

            summaryElementNumber ++;
        }
    }

    if (element.toppings) {
        for (const topping of element.toppings) {
            cy.get('#order-summary .summary-element').eq(elementPosition)
                .find('.summary-element-option').eq(summaryElementNumber)
                .contains(topping.toppingName)

            summaryElementNumber ++;
        }
    }

    if (element.comment) {
        cy.get('#order-summary .summary-element').eq(elementPosition)
            .find('.summary-element-option').eq(summaryElementNumber)
            .contains(`Comment: ${element.comment}`)

        summaryElementNumber ++;
    }

    cy.get('#order-summary .summary-element')
        .eq(elementPosition)
        .find('.summary-element-option')
        .should('have.length', summaryElementNumber);
}

export function validateDetails(order: OrderDefinition, strict = true) {
    // Elements without count value
    const elementsFlat: OrderElement[] = [];

    for (const element of order.elements) {
        const count = element.count ? element.count : 1;

        for (let i = 0; i < count; i++) {
            elementsFlat.push({
                ...element,
                count: 1
            })
        }
    }

    cy.get('#order-summary .summary-element').should('have.length', elementsFlat.length);

    for (let i = 0; i < elementsFlat.length; i++) {
        if (strict) {
            validateElementStrictly(elementsFlat[i], i);
        } else {
            validateElementLoosely(elementsFlat[i]);
        }
    }

    cy.get('.attribute .key').contains('Total').parent().find('.value').should('have.text', order.expectedPrice)

    if (order.comment) {
        cy.get('.attribute .key').contains('Comment').parent().find('.value').should('have.text', order.comment)
    }
}

export function validateSummary(order: OrderDefinition, strict = true) {
    // Elements without count value
    const elementsFlat: OrderElement[] = [];

    for (const element of order.elements) {
        const count = element.count ? element.count : 1;

        for (let i = 0; i < count; i++) {
            elementsFlat.push({
                ...element,
                count: 1
            })
        }
    }

    cy.get('#order-summary .summary-element').should('have.length', elementsFlat.length);

    for (let i = 0; i < elementsFlat.length; i++) {
        if (strict) {
            validateElementStrictly(elementsFlat[i], i);
        } else {
            validateElementLoosely(elementsFlat[i]);
        }
    }

    cy.get('#order-summary #summary-value').contains(order.expectedPrice)

    if (order.comment) {
        cy.get('#order-menu-chief-note textarea').should('have.value', order.comment)
    }
}

export function getUserToken(email: string, password: string) : Cypress.Chainable<string> {
    return cy.request({
        method: 'POST',
        url: `/api/public/v1/account/login/local`,
        body: {
            email: email,
            password: password
        },
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.body.token as string)
}

export function acceptOrder(ref: string) {
    getUserToken('taxi.staff@email.com', 'taxi.staff').then((token) => doAction('order/update/accept-order.json', ref, token))
}

export function serveOrder(ref: string) {
    getUserToken('taxi.staff@email.com', 'taxi.staff').then((token) => doAction('order/update/serve-order.json', ref, token))
}

export function cancelOrder(ref: string) {
    getUserToken('taxi.staff@email.com', 'taxi.staff').then((token) => doAction('order/update/cancel-order.json', ref, token))
}

export function rejectOrder(ref: string) {
    getUserToken('taxi.staff@email.com', 'taxi.staff').then((token) => doAction('order/update/reject-order.json', ref, token))
}

export async function acceptOrderAsAdmin(ref: string) {
    getUserToken('taxi.admin@email.com', 'taxi.admin').then((token) => doAction('order/update/accept-order.json', ref, token))
}

export function doAction(actionFile: string, ref: string, token: string) {
    cy.fixture(actionFile).then((actionFileContent: string) =>
        cy.request({
            method: 'PUT',
            url: `/api/staff/v1/restaurant/R0TAXI000000/order-instances/${ref}/status`,
            body: actionFileContent,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })
    );
}