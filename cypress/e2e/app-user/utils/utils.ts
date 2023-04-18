import { MenuItemSelect, MenuItemTopping, OrderDefinition, OrderElement, validateSummary } from "../../utils/utils";

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
export function addSelect(select: MenuItemSelect) {
    cy.get("#order-menu-select h3")
        .contains(select.groupName)
        .parent()
        .find('mat-radio-button').contains(select.selectName).click();
}

// Requires open card
export function addTopping(topping: MenuItemTopping) {
    cy.get("#order-menu-topping h3")
        .contains(topping.groupName)
        .parent()
        .find('mat-checkbox').contains(topping.toppingName).click();
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
        cy.get('#order-menu-chief-note').contains('Leave a message')
        cy.get('#order-menu-chief-note textarea').click().type(order.comment);
    }

    validateSummary(order);
    cy.get('.full-width-dialog #subscribeButton').click();
}
