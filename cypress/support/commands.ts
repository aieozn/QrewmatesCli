// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


export function openMenuItemGroupCard(name: string) {
    cy.get('.menu-item-details .menu-item-name')
    .contains(name).parent()
    .find('.menu-item-add').click()
}

export function openMenuItemGroupCardWithOption(element: OrderElement) {
    openMenuItemGroupCard(element.group);

    if (element.item !== undefined) {
        cy.get('#item-select').click();
        cy.get('.cdk-overlay-pane mat-option').contains(element.item).click()
    } else {
        cy.get('#item-select').should('not.exist')
    }
}

export function addMenuItemToCart(element: OrderElement) {
    openMenuItemGroupCardWithOption(element);

    if (element.count && element.count > 1) {
        for (let i = 1; i < element.count; i++) cy.get('#count-value-plus').click();
    }

    if (element.selects) {
        for (const select of element.selects) {
            addSelect(select)
        }
    }
    
    if (element.toppings) {
        for (const topping of element.toppings) {
            addTopping(topping);
        }
    }

    if (element.comment) {
        cy.get('#order-menu-chief-note textarea').click().type(element.comment)
    }
    
    cy.get('#add-button').click();
}

// Requires open card
function addSelect(select: MenuItemSelect) {
    cy.get("#order-menu-select h3")
        .contains(select.groupName)
        .parent()
        .find('mat-radio-button').contains(select.selectName).click();
}

// Requires open card
function addTopping(topping: MenuItemTopping) {
    cy.get("#order-menu-topping h3")
        .contains(topping.groupName)
        .parent()
        .find('mat-checkbox').contains(topping.toppingName).click();
}

export interface OrderDefinition {
    elements: OrderElement[];
    expectedPrice?: string;
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

export function prepareOrder(order: OrderDefinition) {
    order.elements.forEach(e => addMenuItemToCart(e))

    if (order.expectedPrice !== undefined) {
        cy.get('#summary-value').contains(order.expectedPrice);
    }
}

export function doOrderAndValidate(order: OrderDefinition) {
    prepareOrder(order);

    cy.get('#subscribeButton').click();

    if (order.comment) {
        cy.get('#order-menu-chief-note textarea').click().type(order.comment);
    }

    validateSummary(order);
    cy.get('.full-width-dialog #subscribeButton').click();
}

function valudateElement(element: OrderElement, elementPosition: number) {
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

export function validateSummary(order: OrderDefinition) {
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
        valudateElement(elementsFlat[i], i);
    }

    if (order.comment) {
        cy.get('#order-menu-chief-note textarea').should('have.value', order.comment)
    }
}