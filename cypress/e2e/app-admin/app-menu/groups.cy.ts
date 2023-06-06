import { clearMenuForEmpty, createCategory, createGroup, loginAsAdmin } from "../utils/utils"

describe('Edit categories', () => {
    beforeEach(() => {
        clearMenuForEmpty()
        cy.session('login as admin: groups', () => loginAsAdmin())
        cy.visit('/admin/menu/categories')

        createCategory('New category', 'Category description')
        cy.get('.extend').click()
    })

    it('Creates group', () => {
        createGroup('New dish', 14.99, 'Dish description')
        cy.reload();

        cy.get('.menu-element-name').contains('New dish')
        cy.get('.menu-element-description').contains('Dish description')
    })

    
})