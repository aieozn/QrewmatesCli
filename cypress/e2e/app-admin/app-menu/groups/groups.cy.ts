import { assertGroupOrder, clearMenuForEmpty, createCategory, createGroupAggregate, extendAggregate, goToSelects, goToToppings, listOfGroupsElementContains, loginAsAdmin, moveGroupDown, moveGroupUp, moveItemCollectionDown, moveItemCollectionUp, openGroupSettings, saveAndReloadGroupAggregate, updateGroupAggregate, verifyAggregate } from "../../utils/utils"

describe('Edit categories', () => {
    beforeEach(() => {
        clearMenuForEmpty()
        cy.session('login as admin: groups', () => loginAsAdmin())
        cy.visit('/admin/menu/categories')

        createCategory('New category', 'Category description')

        // Go to catgegory details
        cy.get('.extend').click()
    })

    it('Create group aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        listOfGroupsElementContains('New dish', 'Dish description', false)

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])
    })

    it('Create group aggregate with image', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', 'cypress/fixtures/fries.jpeg', [], [], [])
        listOfGroupsElementContains('New dish', 'Dish description', true)
    })

    it('Create group aggregate without description', () => {
        createGroupAggregate('New dish', 14.99, undefined, undefined, [], [], [])

        listOfGroupsElementContains('New dish', undefined, false)

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, undefined, undefined, [], [], [])
    })

    it('Save button is disabled by default', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled')
    })

    it('Empty name not allowed', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled').click()
        cy.get('.editor-box-title').contains('Dish name').parent().find('mat-error').contains('Invalid name')

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('11.70')
        cy.get('.save-button').should('have.class', 'disabled')

        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('name')
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Empty price not allowed', () => {
        cy.get('.create-new').click()
        cy.get('.save-button').should('have.class', 'disabled').click()
        cy.get('.editor-box-title').contains('Item price').parent().find('mat-error').contains('Invalid price')

        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().type('name')
        cy.get('.save-button').should('have.class', 'disabled')

        cy.get('.editor-box-title').contains('Item price').parent().find('input').click().type('11.70')
        cy.get('.save-button').should('not.have.class', 'disabled')
    })

    it('Create group aggregate with allergen', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja'], [], [])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja'], [], [])
    })

    it('Create group aggregate with select', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])
    })
    
    it('Create group aggregate with toppings', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego'])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego'])
    })

    it('move down', () => {
        createGroupAggregate('New dish 1', 14.99, 'Dish description 1', undefined, [], [], [])
        createGroupAggregate('New dish 2', 24.99, 'Dish description 2', undefined, [], [], [])
        createGroupAggregate('New dish 3', 34.99, 'Dish description 3', undefined, [], [], [])
        createGroupAggregate('New dish 4', 44.99, 'Dish description 4', undefined, [], [], [])

        assertGroupOrder('New dish 1', 0);
        assertGroupOrder('New dish 2', 1);
        assertGroupOrder('New dish 3', 2);
        assertGroupOrder('New dish 4', 3);

        moveGroupDown('New dish 1')
        cy.reload();

        assertGroupOrder('New dish 1', 1);
        assertGroupOrder('New dish 2', 0);
        assertGroupOrder('New dish 3', 2);
        assertGroupOrder('New dish 4', 3);
    })

    it('move up', () => {
        createGroupAggregate('New dish 1', 14.99, 'Dish description 1', undefined, [], [], [])
        createGroupAggregate('New dish 2', 24.99, 'Dish description 2', undefined, [], [], [])
        createGroupAggregate('New dish 3', 34.99, 'Dish description 3', undefined, [], [], [])
        createGroupAggregate('New dish 4', 44.99, 'Dish description 4', undefined, [], [], [])

        assertGroupOrder('New dish 1', 0);
        assertGroupOrder('New dish 2', 1);
        assertGroupOrder('New dish 3', 2);
        assertGroupOrder('New dish 4', 3);

        moveGroupUp('New dish 3')
        assertGroupOrder('New dish 2', 2)
        moveGroupUp('New dish 3')
        cy.reload();

        assertGroupOrder('New dish 3', 0);
        assertGroupOrder('New dish 1', 1);
        assertGroupOrder('New dish 2', 2);
        assertGroupOrder('New dish 4', 3);
    })

    it.only('delete group', () => {
        createGroupAggregate('New dish 1', 14.99, 'Dish description 1', undefined, [], [], [])
        createGroupAggregate('New dish 2', 24.99, 'Dish description 2', undefined, [], [], [])
        createGroupAggregate('New dish 3', 34.99, 'Dish description 3', undefined, [], [], [])

        openGroupSettings('New dish 1')
        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)
        cy.reload();

        assertGroupOrder('New dish 2', 0);
        assertGroupOrder('New dish 3', 1);
    })

    it('Add allergen to aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja'], [], [])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])
        
        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])
    })

    it('Remove allergen from aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, ['Ryby', 'Mleko', 'Mięczaki'], [], [])
        
        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, ['Jaja', 'Gorczyca'], [], [])
    })

    it('Add select to aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso'], [])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Sos'], [])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])
    })

    it('Remove select from aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Sos'], [])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso'], [])
    })

    it('Move aggregate selects', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])

        openGroupSettings('New dish')
        goToSelects()
        moveItemCollectionDown('Mięso')
        saveAndReloadGroupAggregate()

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], ['Sos', 'Mięso'], [])
    })


    it('Add topping to aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego'])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba średniego'])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])
    })

    it('Remove topping from aggregate', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])

        openGroupSettings('New dish')
        updateGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba średniego'])

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego'])
    })

    it('Move aggregate toppings', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [
            'Dodatki do kebaba małego',
            'Dodatki do kebaba średniego',
            'Dodatki do kebaba dużego'
        ])

        openGroupSettings('New dish')
        goToToppings()
        moveItemCollectionUp('Dodatki do kebaba dużego')
        saveAndReloadGroupAggregate()

        openGroupSettings('New dish')
        verifyAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [
            'Dodatki do kebaba małego',
            'Dodatki do kebaba dużego',
            'Dodatki do kebaba średniego'
        ])
    })

    it('Edit simple group: remove description', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option', 14.99, [], [], [])

        openGroupSettings('New dish')
        cy.get('.editor-box-title').contains('Dish description').parent().find('input').click({force: true}).clear();
        saveAndReloadGroupAggregate()

        listOfGroupsElementContains('New dish', undefined, false)
    })

    it('Edit simple group: empty name not allowed', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option', 14.99, [], [], [])

        openGroupSettings('New dish')
        cy.get('.editor-box-title').contains('Dish name').parent().find('input').click().clear();
        cy.get('.save-button').should('have.class', 'disabled')
        cy.get('.save-button').click();
        cy.get('.editor-box-title').contains('Dish name').parent().find('mat-error').contains('Invalid name')
    })

    it('Edit simple group: update image', () => {
        createGroupAggregate('New dish', 14.99, 'Dish description', undefined, [], [], [])

        extendAggregate('New dish', 'New option', 14.99, [], [], [])

        openGroupSettings('New dish')
        cy.get('input[type=file]').selectFile('cypress/fixtures/fries.jpeg', {force: true})

        cy.get('#logo-replacement').should('not.exist')
        saveAndReloadGroupAggregate()

        listOfGroupsElementContains('New dish', 'Dish description', true)
    })

    it('Reloads editor', () => {
        createGroupAggregate('New dish 1', 14.99, 'Dish description', undefined, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], [])
        createGroupAggregate('New dish 2', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], [])
        createGroupAggregate('New dish 3', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])

        openGroupSettings('New dish 1')
        verifyAggregate('New dish 1', 14.99, 'Dish description', undefined, ['Jaja', 'Ryby', 'Gorczyca', 'Mleko', 'Mięczaki'], [], []);
        cy.get('.cancel-button').click();

        openGroupSettings('New dish 2')
        verifyAggregate('New dish 2', 14.99, 'Dish description', undefined, [], ['Mięso', 'Sos'], []);
        cy.get('.cancel-button').click();

        openGroupSettings('New dish 3')
        verifyAggregate('New dish 3', 14.99, 'Dish description', undefined, [], [], ['Dodatki do kebaba małego', 'Dodatki do kebaba średniego'])
        cy.get('.cancel-button').click();
    })
})