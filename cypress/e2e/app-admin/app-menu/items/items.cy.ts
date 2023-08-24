import { assertItemOrder, flushKebebKing, createCategory, createGroupAggregate, createGroupOption, editGroupItem, extendAggregate, getGroupByName, goToSelects, goToToppings, groupContainsVariant, loginAsKebabKingAdmin, moveItemCollectionDown, moveItemCollectionUp, moveItemDown, moveItemUp, openGroupItem, openItemSettings, verifyItem } from "../../utils/utils"

describe('Edit categories', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: items', () => loginAsKebabKingAdmin())
        cy.visit('/admin/menu/categories')

        createCategory('New category', 'Category description')
        cy.get('.extend').click()
    })

    it('Create variant', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option', 14.99, [], [], [])
        groupContainsVariant('New dish', 'New dish: New option', '14.99')
    })

    it('Delete variant', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option', 14.99, [], [], [])

        getGroupByName('New dish').find('.extend').contains('Collapse variants')

        openGroupItem('New dish', 'New option')

        cy.get('.remove-button').click()

        cy.on('window:confirm', () => true)
        cy.reload();

        getGroupByName('New dish').find('.extend').contains('Create a variant')
    })

    it('Delete variant when more than two', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option 1', 14.99, [], [], [])
        createGroupOption('New dish', 'New item 2', 15.99, [], [], [])

        openGroupItem('New dish', 'New item 2')
        cy.get('.menu-element.item').should('have.length', 3)

        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)
        cy.reload();

        cy.get('.menu-element.item').should('have.length', 2)
    })

    it('Variant is copy of group', () => {
        createGroupAggregate('New dish', 14.99,
            'Dish description',
            undefined,
            ['Soja', 'Orzechy', 'Jaja', 'Seler'],
            ['Mięso', 'Sos'],
            ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego']
        )

        extendAggregate('New dish', 'New option', 14.99, [], [], [])
        openGroupItem('New dish', 'New option')

        verifyItem(
            'New option', 14.99,
            ['Soja', 'Orzechy', 'Jaja', 'Seler'],
            ['Mięso', 'Sos'],
            ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego']
        )
    })

    it('Save disabled by default', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        cy.get('.extend').click()
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Invalid name not allowed', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        cy.get('.extend').click()
        cy.get('.save-button').should('have.class', 'disabled').click()

        cy.get('.editor-box-title').contains('Item name').parent().find('mat-error').contains('Invalid value')
        cy.get('.editor-box-title').contains('Item name').parent().find('input').click().type('New option');
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Invalid price not allowed', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        cy.get('.extend').click()
        cy.get('.editor-box-title').contains('Item name').parent().find('input').click().type('New option');

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().clear();
        cy.get('.save-button').should('have.class', 'disabled').click()
        cy.get('.editor-box-title').contains('Item price').parent().find('mat-error').contains('Invalid price')

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('12')
        cy.get('.save-button').should('not.have.class', 'disabled');

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('aaa')
        cy.get('.save-button').should('have.class', 'disabled').click()

        cy.get('.editor-box-title').contains('Item price').parent().find('mat-error').contains('Invalid price')
    })

    it('Move item up', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New item 1', 15.99, [], [], [])
        createGroupOption('New dish', 'New item 2', 15.99, [], [], [])

        moveItemUp('New dish', 'New item 1')

        assertItemOrder('New dish: New item 1', 0)
        assertItemOrder('New dish: ', 1)
        assertItemOrder('New dish: New item 2', 2)
    })

    it('Move item down', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New item 1', 15.99, [], [], [])
        createGroupOption('New dish', 'New item 2', 15.99, [], [], [])

        moveItemDown('New dish', 'New item 1')
        
        assertItemOrder('New dish: ', 0)
        assertItemOrder('New dish: New item 2', 1)
        assertItemOrder('New dish: New item 1', 2)
    })

    it('Edit item name', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New item 1', 15.99, [], [], [])
        editGroupItem('New dish', 'New item 1', 'Updated item name', 15.99, [], [], [])

        openGroupItem('New dish', 'Updated item name')
        verifyItem('Updated item name', 15.99, [], [], [])
    })

    it('Edit item price', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New item 1', 15.99, [], [], [])
        editGroupItem('New dish', 'New item 1', 'New item 1', 777, [], [], [])

        openGroupItem('New dish', 'New item 1')
        verifyItem('New item 1', 777, [], [], [])
    })

    it('Create variant with allergens', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New item 1', 15.99, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])

        openGroupItem('New dish', 'New item 1')

        verifyItem('New item 1', 15.99, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])
    })

    it('Update variant allergens', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Ryby'], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], [], [])
        editGroupItem('New dish', 'New Item 1', 'New Item 1', 15.99, ['Jaja', 'Ryby', 'Mięczaki'], [], [])

        openGroupItem('New dish', 'New Item 1')
        verifyItem('New Item 1', 15.99, ['Jaja', 'Mięczaki'], [], [])
    })

    it('Create variant with selects', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], ['Mięso', 'Sos'], [])

        openGroupItem('New dish', 'New Item 1')

        verifyItem('New Item 1', 15.99, [], ['Mięso', 'Sos'], [])
    })

    it('Update variant selects', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], ['Sos'], [])
        editGroupItem('New dish', 'New Item 1', 'New Item 1', 15.99, [], ['Mięso', 'Sos'], [])

        openGroupItem('New dish', 'New Item 1')
        verifyItem('New Item 1', 15.99, [], ['Mięso'], [])
    })

    it('Update variant selects order down', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], ['Mięso', 'Sos'], [])

        openGroupItem('New dish', 'New Item 1')
        goToSelects()
        moveItemCollectionDown('Mięso')
        cy.get('.save-button').click();

        openItemSettings('New Item 1')
        verifyItem('New Item 1', 15.99, [], ['Sos', 'Mięso'], [])
    })

    it('Update variant selects order up', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], ['Mięso', 'Sos'], [])

        openGroupItem('New dish', 'New Item 1')
        goToSelects()
        moveItemCollectionUp('Sos')
        cy.get('.save-button').click();

        openItemSettings('New Item 1')
        verifyItem('New Item 1', 15.99, [], ['Sos', 'Mięso'], [])
    })

    it('Create variant with toppings', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])

        openGroupItem('New dish', 'New Item 1')

        verifyItem('New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])
    })

    it('Update variant toppings', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])
        editGroupItem('New dish', 'New Item 1', 'New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba dużego'])

        openGroupItem('New dish', 'New Item 1')
        verifyItem('New Item 1', 15.99, [], [], ['Dodatki do kebaba średniego', 'Dodatki do kebaba dużego'])
    })

    it('Update variant toppings order down', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego', 'Dodatki do kebaba dużego'])

        openGroupItem('New dish', 'New Item 1')
        goToToppings()
        moveItemCollectionDown('Dodatki do kebaba średniego')
        cy.get('.save-button').click();


        openItemSettings('New Item 1')
        verifyItem('New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba dużego', 'Dodatki do kebaba średniego'])
    })

    it('Update variant toppings order up', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 15.99, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego', 'Dodatki do kebaba dużego'])

        openGroupItem('New dish', 'New Item 1')
        goToToppings()
        moveItemCollectionUp('Dodatki do kebaba średniego')
        cy.get('.save-button').click();


        openItemSettings('New Item 1')
        verifyItem('New Item 1', 15.99, [], [], ['Dodatki do kebaba średniego', 'Dodatki do kebaba małego', 'Dodatki do kebaba dużego'])
    })

    it('Items: Zero price is zero', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New Item 1', 0, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego', 'Dodatki do kebaba dużego'])
        openGroupItem('New dish', 'New Item 1')
        cy.get('.editor-box-title').contains('Item price').parent().find('input').should('have.value', '0')
    })

    it('Empty price is empty', () => {
        cy.get('.create-new').click()
        cy.get('.editor-box-title').contains('Item price').parent().find('input').should('have.value', '')
    })
})