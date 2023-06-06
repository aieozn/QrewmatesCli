import { getUserToken } from "../../utils/utils"

export function loginAsAdmin() {
    cy.visit('/admin')
    cy.get('#login-input').click().type('admin@email.com')
    cy.get('#password-input').click().type('admin')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/login/select-organization')

    cy.get('h2').contains('Empty').click()
}

export function clearMenuForEmpty() {
    return getUserToken('root@email.com', 'root').then(token => cy.request({
            method: 'DELETE',
            url: '/api/staff/v1/restaurant/R0EMPTY00000/menu',
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

export function createGroup(name: string, price: number, description: string | undefined) {
    cy.get('.create-new').click()
    cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type(name);
    cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type(price.toString());

    if (description) {
        cy.get('.editor-box-title').contains('Dish description').parent().find('input').click({force: true}).type(description);
    }
    
    cy.get('.save-button').click();
}