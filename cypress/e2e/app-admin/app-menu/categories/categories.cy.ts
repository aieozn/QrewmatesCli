import { clearMenuForEmpty, createCategory, loginAsAdmin } from "../../utils/utils";

describe('Edit categories', () => {
    beforeEach(() => {
        clearMenuForEmpty()
        cy.session('login as admin: categories', () => loginAsAdmin())
        cy.visit('/admin/menu/categories')
    })

    it('Contains help text when there is no categories', () => {
        cy.get(".help").contains('In this window, add new categories and products to your menu')
    })

    it('Does not contains help text when there is are some categories', () => {
        createCategory('New category', 'Category description')
        cy.get(".help").should('not.exist')
    })

    it('Creates category', () => {
        createCategory('New category', 'Category description')

        cy.visit('/admin/menu/categories')

        cy.get('.category-pane').should('have.length', 1)
        cy.get('.menu-element-name').contains('New category')
        cy.get('.menu-element-description').contains('Category description')
    })

    it('Creates category without description', () => {
        createCategory('New category', undefined)

        cy.visit('/admin/menu/categories')

        cy.get('.category-pane').should('have.length', 1)
        cy.get('.menu-element-name').contains('New category')
        cy.get('.menu-element-description').should('be.empty')
    })

    it('Save not allowed for empty name', () => {
        cy.get('.create-new').click()

        // Not edited
        cy.get('.save-button').should('have.class', 'disabled')
        cy.get('.editor-box-title').contains('Category name').parent().find('mat-error').should('not.exist')
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Category name').parent().find('mat-error').contains('Invalid name')
    
        // Empty after edit
        cy.get('.editor-box-title').contains('Category name').parent().find('input').click().type('abc')
        cy.get('.editor-box-title').contains('Category name').parent().find('mat-error').should('not.exist')
        cy.get('.editor-box-title').contains('Category name').parent().find('input').click().clear()
        cy.get('.editor-box-title').contains('Category name').parent().find('mat-error').contains('Invalid name')
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Deletes category', () => {
        createCategory('New category', 'Category description')

        cy.visit('/admin/menu/categories')
        cy.get('.category-pane').should('have.length', 1)
        cy.get('.right.clickable').click()
        cy.get('.remove-button').click();

        cy.on('window:confirm', () => true)
        cy.visit('/admin/menu/categories')
        cy.get('.category-pane').should('have.length', 0)
    })

    it('Edit category name', () => {
        createCategory('New category', 'Category description')

        cy.visit('/admin/menu/categories')
        cy.get('.category-pane').should('have.length', 1)
        cy.get('.right.clickable').click()
        cy.get('.editor-box-title').contains('Category name').parent().find('input').click().clear().type('Updated category');
        cy.get('.save-button').click();

        cy.visit('/admin/menu/categories')
        cy.get('.menu-element-name').contains('Updated category')
    })

    it('Edit save disabled by default', () => {
        createCategory('New category', 'Category description')

        cy.visit('/admin/menu/categories')
        cy.get('.category-pane').should('have.length', 1)
        cy.get('.right.clickable').click()
        cy.get('.save-button').should('have.class', 'disabled')

        cy.get('.editor-box-title').contains('Category name').parent().find('input').click().type(' :)');
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Edit category description', () => {
        createCategory('New category', 'Category description')

        cy.visit('/admin/menu/categories')
        cy.get('.category-pane').should('have.length', 1)
        cy.get('.right.clickable').click()
        cy.get('.editor-box-title').contains('Category description').parent().find('input').click().clear().type('Updated description');
        cy.get('.save-button').click();

        cy.visit('/admin/menu/categories')
        cy.get('.menu-element-description').contains('Updated description')
    })

    it('Move category up', () => {
        createCategory('New category 1', 'Category description')
        createCategory('New category 2', 'Category description')
        createCategory('New category 3', 'Category description')
        createCategory('New category 4', 'Category description')

        cy.get('.menu-element-name').eq(0).contains('New category 1')
        cy.get('.menu-element-name').eq(1).contains('New category 2')
        cy.get('.menu-element-name').eq(2).contains('New category 3')
        cy.get('.menu-element-name').eq(3).contains('New category 4')

        cy.get('.menu-element-name').contains('New category 1').parents('.menu-element-details').find('.drag-box .bottom').click()
        cy.visit('/admin/menu/categories')

        cy.get('.menu-element-name').eq(0).contains('New category 2')
        cy.get('.menu-element-name').eq(1).contains('New category 1')
        cy.get('.menu-element-name').eq(2).contains('New category 3')
        cy.get('.menu-element-name').eq(3).contains('New category 4')
    })

    it('Move category down', () => {
        createCategory('New category 1', 'Category description')
        createCategory('New category 2', 'Category description')
        createCategory('New category 3', 'Category description')
        createCategory('New category 4', 'Category description')

        cy.get('.menu-element-name').eq(0).contains('New category 1')
        cy.get('.menu-element-name').eq(1).contains('New category 2')
        cy.get('.menu-element-name').eq(2).contains('New category 3')
        cy.get('.menu-element-name').eq(3).contains('New category 4')

        cy.get('.menu-element-name').contains('New category 3').parents('.menu-element-details').find('.drag-box .top').click()
        cy.visit('/admin/menu/categories')

        cy.get('.menu-element-name').eq(0).contains('New category 1')
        cy.get('.menu-element-name').eq(1).contains('New category 3')
        cy.get('.menu-element-name').eq(2).contains('New category 2')
        cy.get('.menu-element-name').eq(3).contains('New category 4')
    })

    it('Reload editor', () => {
        createCategory('New category 1', 'Category description 1')
        createCategory('New category 2', undefined)
        
        cy.get('.menu-element-name').contains('New category 1').parents('.menu-element-details').find('.right.clickable').click()
        cy.get('.editor-box-title').contains('Category name').parent().find('input').should('have.value', 'New category 1')
        cy.get('.editor-box-title').contains('Category description').parent().find('input').should('have.value', 'Category description 1')
        cy.get('.cancel-button').click()

        cy.get('.menu-element-name').contains('New category 2').parents('.menu-element-details').find('.right.clickable').click()
        cy.get('.editor-box-title').contains('Category name').parent().find('input').should('have.value', 'New category 2')
        cy.get('.editor-box-title').contains('Category description').parent().find('input').should('have.value', '')
        cy.get('.cancel-button').click()
    })

    it('Go to details', () => {
        createCategory('New category 1', 'Category description 1')
        cy.get('.extend').click()
        cy.get('h1').contains('Category: New category 1')
    })
});