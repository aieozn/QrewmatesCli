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
    .children('.menu-item-add').click()
}

export function openMenuItemGroupCardWithOption(name: string, optionName: string) {
    openMenuItemGroupCard(name);

    cy.get('#item-select mat-select').click();

    cy.get('.cdk-overlay-pane mat-option').contains(optionName).click()
}

export function addMenuItemToCart(name: string, optionName: string) {
    openMenuItemGroupCardWithOption(name, optionName);
    cy.get('#add-button').click();
}

export interface OrderDefinition {
    elements: {
        group: string,
        item: string
    }[],
    expectedPrice?: string
}

export function prepareOrder(order: OrderDefinition) {
    order.elements.forEach(e => addMenuItemToCart(e.group, e.item))

    if (order.expectedPrice !== undefined) {
        cy.get('#summary-value').contains(order.expectedPrice);
    }
}

export function createOrder(order: OrderDefinition) {
    prepareOrder(order);

    cy.get('#subscribeButton').click();
    cy.get('.full-width-dialog #subscribeButton').click();
}