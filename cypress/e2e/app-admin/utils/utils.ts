import { getUserToken } from "../../utils/utils"

export function loginAsAdmin() {
    cy.visit('/admin')
    cy.get('#login-input').click().type('admin@email.com')
    cy.get('#password-input').click().type('admin')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/login/select-organization')

    cy.get('h2').contains('Kebab King').click()
}

export function flushKebebKing() {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
            method: 'DELETE',
            url: '/api/staff/v1/restaurant/R0KING000000/menu',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": "Bearer " + token
            }
        })
    )
}

export function clearAllergensForEmpty() {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
            method: 'DELETE',
            url: '/api/staff/v1/restaurant/R0KING000000/allergens',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": "Bearer " + token
            }
        })
    )
}

export function createCategory(name: string, description: string | undefined) {
    cy.visit('/admin/menu/categories')
    cy.get('.create-new').click()
    cy.get('.editor-box-title').contains('Category name').parent().find('input').click().type(name);

    if (description) {
        cy.get('.editor-box-title').contains('Category description').parent().find('input').click({force: true}).type(description);
    }
    
    cy.get('.save-button').click();
}

export function createAllergen(name: string, description: string) {
    cy.visit('/admin/menu/allergens')
    cy.get('.create').click()
    cy.get('.editor-box-title').contains('Allergen name').parent().find('input').click().type(name);
    cy.get('.editor-box-title').contains('Allergen description').parent().find('input').click({force: true}).type(description);
    cy.get('.save-button').click();
}

export function createGroupAggregate(
    name: string,
    price: number,
    description: string | undefined,
    image: string | undefined,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    cy.get('.create-new').click()
    updateGroupAggregate(
        name,
        price,
        description,
        image,
        allergens,
        selects,
        toppings
    )
}

export function updateGroupAggregate(
    name: string,
    price: number,
    description: string | undefined,
    image: string | undefined,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().clear().type(name);
    cy.get('.editor-box-title').contains('Item price').parent().find('input').click().clear().type(price.toString());

    if (description) {
        cy.get('.editor-box-title').contains('Dish description').parent().find('input').click({force: true}).clear().type(description);
    }

    if (image) {
        cy.get('input[type=file]').selectFile(image, {force: true})
    }

    if (allergens) {
        cy.get('#item-tabs span').contains('Allergens').parent().click()

        for (const allergen of allergens) {
            cy.get('.allergen').contains(allergen).click()
        }
    }

    if (selects) {
        cy.get('#item-tabs span').contains('Selects').parent().click()

        for (const select of selects) {
            cy.get('.collection').contains(select).parent().find('mat-checkbox').click()
        }
    }

    if (toppings) {
        cy.get('#item-tabs span').contains('Toppings').parent().click()

        for (const topping of toppings) {
            cy.get('.collection').contains(topping).parent().find('mat-checkbox').click()
        }
    }
    
    cy.get('.save-button').should('not.have.class', 'disabled');
    cy.get('.save-button').click()

    cy.url().should('match', new RegExp('.*/category/.{12}$'))
}

export function createVariant(
    name: string,
    price: number,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    cy.get('.editor-box-title').contains('Item name').parent().find('input').click().clear().type(name);
    cy.get('.editor-box-title').contains('Item price').parent().find('input').click().clear().type(price.toString());

    if (allergens) {
        cy.get('#item-tabs span').contains('Allergens').parent().click()

        for (const allergen of allergens) {
            cy.get('.allergen').contains(allergen).click()
        }
    }

    if (selects) {
        cy.get('#item-tabs span').contains('Selects').parent().click()

        for (const select of selects) {
            cy.get('.collection').contains(select).parent().find('mat-checkbox').click()
        }
    }

    if (toppings) {
        cy.get('#item-tabs span').contains('Toppings').parent().click()

        for (const topping of toppings) {
            cy.get('.collection').contains(topping).parent().find('mat-checkbox').click()
        }
    }
    
    
    cy.get('.save-button').click();

    cy.url().should('match', new RegExp('.*/category/.{12}$'))
    cy.reload();
}


export function verifyAggregate(
    name: string,
    price: number,
    description: string | undefined,
    image: string | undefined,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    cy.get('.editor-box-title').contains('Dish name').parent().find('input').should('have.value', name);
    cy.get('.editor-box-title').contains('Item price').parent().find('input').should('have.value', price.toString());

    if (description) {
        cy.get('.editor-box-title').contains('Dish description').parent().find('input').should('have.value', description);
    }

    if (allergens) {
        cy.get('#item-tabs span').contains('Allergens').parent().click()

        for (const allergen of allergens) {
            cy.get('.allergen').contains(allergen).parents('.allergen').find('input').should('be.checked')
        }
    }
    cy.get('.allergen .mdc-checkbox--selected').should('have.length', allergens.length)

    if (selects) {
        cy.get('#item-tabs span').contains('Selects').parent().click()

        for (const [index, select] of selects.entries()) {
            cy.get('.collection').eq(index).contains(select).parent().find('mat-checkbox input').should('be.checked')
        }
    }
    cy.get('.collection .mdc-checkbox--selected').should('have.length', selects.length)

    if (toppings) {
        cy.get('#item-tabs span').contains('Toppings').parent().click()

        for (const [index, topping] of toppings.entries()) {
            cy.get('.collection').eq(index).contains(topping).parent().find('mat-checkbox input').should('be.checked')
        }
    }
    cy.get('.collection .mdc-checkbox--selected').should('have.length', toppings.length)
}

export function verifyItem(
    name: string,
    price: number,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    cy.get('.editor-box-title').contains('Item name').parent().find('input').should('have.value', name);
    cy.get('.editor-box-title').contains('Item price').parent().find('input').should('have.value', price.toString());

    if (allergens) {
        cy.get('#item-tabs span').contains('Allergens').parent().click()

        for (const allergen of allergens) {
            cy.get('.allergen').contains(allergen).parents('.allergen').find('input').should('be.checked')
        }
    }
    cy.get('.allergen .mdc-checkbox--selected').should('have.length', allergens.length)

    if (selects) {
        cy.get('#item-tabs span').contains('Selects').parent().click()

        for (const [index, select] of selects.entries()) {
            cy.get('.collection').eq(index).contains(select).parent().find('mat-checkbox input').should('be.checked')
        }
    }
    cy.get('.collection .mdc-checkbox--selected').should('have.length', selects.length)

    if (toppings) {
        cy.get('#item-tabs span').contains('Toppings').parent().click()

        for (const [index, topping] of toppings.entries()) {
            cy.get('.collection').eq(index).contains(topping).parent().find('mat-checkbox input').should('be.checked')
        }
    }
    cy.get('.collection .mdc-checkbox--selected').should('have.length', toppings.length)
}

export function openGroupSettings(name: string) {
    cy.get('.menu-element-name').contains(name).parents('.menu-element.group').find('.settings-icon').click();
}

export function getGroupByName(name: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.menu-element.group > .menu-element-details > .left > .menu-element-details-content > .menu-element-name')
        .contains(name).parents('.menu-element.group')
}

export function getGroupByOrder(order: number) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.menu-element.group').eq(order);
}

export function listOfGroupsElementContains(name: string, description: string | undefined, hasImage: boolean) {
    if (description) {
        getGroupByName(name).find('.menu-element-description').contains(description);
    } else {
        getGroupByName(name).find('.menu-element-description').should('be.empty')
    }
    

    if (hasImage) {
        getGroupByName(name).find('.menu-element-details-image').find('img').should('be.visible')
    } else {
        getGroupByName(name).find('.menu-element-details-image').should('not.exist')
    }
}

export function assertGroupOrder(name: string, order: number) {
    getGroupByOrder(order).children('.menu-element-details').children('.left')
        .children('.menu-element-details-content')
        .children('.menu-element-name').should('have.text', name)
}

export function moveGroupDown(name: string) {
    getGroupByName(name).find('.drag-box .bottom').click()
}

export function moveGroupUp(name: string) {
    getGroupByName(name).find('.drag-box .top').click()
}

export function goToSelects() {
    cy.get('#item-tabs span').contains('Selects').parent().click()
}

export function goToToppings() {
    cy.get('#item-tabs span').contains('Toppings').parent().click()
}

export function moveItemCollectionDown(name: string) {
    cy.get('.collection').contains(name).parents('.container').find('.drag-box .bottom').click()
}

export function moveItemCollectionUp(name: string) {
    cy.get('.collection').contains(name).parents('.container').find('.drag-box .top').click()
}

export function saveAndReloadGroupAggregate() {
    cy.get('.save-button').click();
    cy.url().should('match', new RegExp('.*/category/.{12}$'))
    cy.reload();
}

export function extendAggregate(
    groupName: string,
    name: string,
    price: number,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    getGroupByName(groupName).find('.extend').click()
    createVariant(name, price, allergens, selects, toppings)
}

export function createGroupOption(
    groupName: string,
    name: string,
    price: number,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    getGroupByName(groupName).find('.extend').contains('Expand variants').click()
    cy.get('.create-new').contains('Add new option').click()
    createVariant(name, price, allergens, selects, toppings)
}

export function groupContainsVariant(groupName: string, variantName: string, variantPrice: string) {
    getGroupByName(groupName).find('.extend').contains('Expand variants').click()
    cy.get('.menu-element-name').contains(variantName);
    cy.get('.menu-element.item .menu-element-name').contains(variantName).parent().children('.menu-element-price').contains(variantPrice)
}

export function getGroupItem(name: string) : Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.menu-element.item .menu-element-name').contains(name).parent().parent().parent()
}

export function openGroupItem(
    groupName: string,
    name: string
) {
    getGroupByName(groupName).find('.extend').click()
    getGroupItem(name).find('.settings-icon').click();
}

export function openItemSettings(
    name: string
) {
    getGroupItem(name).find('.settings-icon').click();
}

export function moveItemUp(
    groupName: string,
    name: string
) {
    getGroupByName(groupName).find('.extend').click()
    getGroupItem(name).find('.drag-box .top').click();
}

export function moveItemDown(
    groupName: string,
    name: string
) {
    getGroupByName(groupName).find('.extend').click()
    getGroupItem(name).find('.drag-box .bottom').click();
}

export function assertItemOrder(
    name: string,
    order: number
) {
    cy.get('.menu-element.item .menu-element-name').eq(order).should('have.text', name)
}

export function editGroupItem(
    groupName: string,
    name: string,
    updatedName: string,
    price: number,
    allergens: string[],
    selects: string[],
    toppings: string[]
) {
    openGroupItem(groupName, name);
    createVariant(updatedName, price, allergens, selects, toppings);
}
