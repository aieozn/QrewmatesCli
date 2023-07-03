import { createTopping, flushKebebKing, loginAsAdmin, verifyTopping } from "../../utils/utils"

describe('Edit topping', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: topping', () => loginAsAdmin())
        cy.visit('/admin/menu/topping-collections')
    })

    it('List toppings', () => {
        cy.get('#menu-elements-list .menu-element').should('have.length', 3)
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba małego')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.extend').click();

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-price').should('have.text', '4.99 zł')

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-price').should('have.text', '8.99 zł')
    })

    it('Keeps toppings open after reload', () => {
        cy.get('#menu-elements-list .menu-element').should('have.length', 3)
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-description').should('have.text', 'Dodatki do kebaba małego')

        cy.get('.toppings').should('not.exist')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.extend').click();
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')

        cy.reload();
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
    })

    it('Creates new toppping', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')
        
        createTopping('New topping name', 'New topping description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'New topping name')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-description').should('have.text', 'New topping description')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-price').should('have.text', '77 zł')
        cy.reload()
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'New topping name')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-description').should('have.text', 'New topping description')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(2).find('.menu-element-price').should('have.text', '77 zł')

        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click();
        verifyTopping('New topping name', 'New topping description', '77', ['Jaja', 'Ryby', 'Mięczaki'])
    })
    
    it('Creates new topping - empty name not allowed', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')
        cy.get('.toppings .create-new').click()

        cy.get('.editor-box-title').contains('Topping description').parent().find('input').click().clear().type('New topping description');
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').click().clear().type('77');

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Topping name').parent().find('mat-error').contains('Invalid value')
    })

    it('Creates new topping - invalid price not allowed', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')
        cy.get('.toppings .create-new').click()

        cy.get('.editor-box-title').contains('Topping name').parent().find('input').click().clear().type('New topping name');
        cy.get('.editor-box-title').contains('Topping description').parent().find('input').click().clear().type('New topping description');
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').click().clear().type('77aaa');

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Topping price').parent().find('mat-error').contains('Invalid price')
    })

    it('Delete topping', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        
        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)

        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.reload()
        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
    })

    it('Edit topping name', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping name').parent().find('input').clear().type('Updated topping name')
        cy.get('.save-button').click();

        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Updated topping name')
        cy.reload();
        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Updated topping name')
    })

    it('Edit topping - empty name not allowed', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping name').parent().find('input').clear()
        cy.get('.save-button').click();

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Topping name').parent().find('mat-error').contains('Invalid value')
    })

    it('Edit topping - empty price not allowed', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').clear();
        cy.get('.save-button').click();

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Topping price').parent().find('mat-error').contains('Invalid price')
    })

    it('Edit topping description', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping description').parent().find('input').clear().type('Updated topping description')
        cy.get('.save-button').click();

        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-description').should('have.text', 'Updated topping description')
        cy.reload();
        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-description').should('have.text', 'Updated topping description')
    })

    it('Edit topping price', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').clear().type('17.68')
        cy.get('.save-button').click();

        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-price').should('have.text', '17.68 zł')
        cy.reload();
        cy.get('.toppings').find('.menu-element').eq(0).find('.menu-element-price').should('have.text', '17.68 zł')
    })

    it('Edit topping allergens', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')
    
        createTopping('ZZ new topping name', 'New topping description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.reload()

        cy.get('.toppings').find('.menu-element').eq(2).find('.menu-element-name').should('have.text', 'ZZ new topping name')
        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click();

        createTopping('ZZ new topping name', undefined, '77', ['Jaja', 'Pszenica', 'Soja', 'Orzechy'])

        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click();
        verifyTopping('ZZ new topping name', 'New topping description', '77', ['Pszenica', 'Soja', 'Orzechy', 'Ryby', 'Mięczaki'])
        cy.get('.cancel-button').click()

        cy.reload();

        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click();
        verifyTopping('ZZ new topping name', 'New topping description', '77', ['Pszenica', 'Soja', 'Orzechy', 'Ryby', 'Mięczaki'])
    })

    it('Edit topping order up', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
    
        cy.get('.toppings').find('.menu-element').eq(0).find('.bottom').click()

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')

        cy.reload();

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
    })

    it('Edit select order down', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000')

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
    
        cy.get('.toppings').find('.menu-element').eq(1).find('.top').click()

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')

        cy.reload();

        cy.get('.toppings').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Dodatkowy ser')
        cy.get('.toppings').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Dodatkowe mięso')
    })

    it('Reload editor', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')

        createTopping('ZZ new topping name', 'New topping description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.toppings').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping name').parent().find('input').should('have.value', 'Dodatkowe mięso')

        cy.get('.toppings').find('.menu-element').eq(1).find('.settings-icon').click({force: true})
        cy.get('.editor-box-title').contains('Topping name').parent().find('input').should('have.value', 'Dodatkowy ser')

        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click({force: true})
        verifyTopping('ZZ new topping name', 'New topping description', '77', ['Jaja', 'Ryby', 'Mięczaki'])
    })

    it('Zero price is zero', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')

        createTopping('ZZ new topping name', 'New topping description', '0', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.toppings').find('.menu-element').eq(2).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').should('have.value', '0')
    })

    it('Empty price is empty', () => {
        cy.visit('/admin/menu/topping-collections/TC0KK0000000/topping/create/settings')
        cy.get('.editor-box-title').contains('Topping price').parent().find('input').should('have.value', '')
    })
})