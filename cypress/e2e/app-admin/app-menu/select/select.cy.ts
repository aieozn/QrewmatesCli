import { createSelect, flushKebebKing, loginAsKebabKingAdmin, verifySelect } from "../../utils/utils"

describe('Edit select', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: select', () => loginAsKebabKingAdmin())
        cy.visit('/admin/menu/select-collections')
    })

    it('List selects', () => {
        cy.get('#menu-elements-list .menu-element').should('have.length', 2)
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-name').should('have.text', 'Mięso')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.extend').click();

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-price').should('have.text', '0 zł')

        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-price').should('have.text', '0 zł')

        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Mięso mieszane')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-price').should('have.text', '0 zł')
    })

    it('Keeps selects open after reload', () => {
        cy.get('#menu-elements-list .menu-element').should('have.length', 2)
        cy.get('#menu-elements-list .menu-element').eq(0).find('.menu-element-name').should('have.text', 'Mięso')

        cy.get('.selects').should('not.exist')
        cy.get('#menu-elements-list .menu-element').eq(0).find('.extend').click();
        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')

        cy.reload();
        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')
    })

    it('Creates new select', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')
        
        createSelect('New select name', 'New select description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-name').should('have.text', 'New select name')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-description').should('have.text', 'New select description')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-price').should('have.text', '77 zł')
        cy.reload()
        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-name').should('have.text', 'New select name')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-description').should('have.text', 'New select description')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(3).find('.menu-element-price').should('have.text', '77 zł')

        cy.get('.selects').find('.menu-element').eq(3).find('.settings-icon').click();
        verifySelect('New select name', 'New select description', '77', ['Jaja', 'Ryby', 'Mięczaki'])
    })
    
    it('Creates new select - empty name not allowed', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')
        cy.get('.selects .create-new').click()

        cy.get('.editor-box-title').contains('Select description').parent().find('input').click().clear().type('New select description');
        cy.get('.editor-box-title').contains('Select price').parent().find('input').click().clear().type('77');

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Select name').parent().find('mat-error').contains('Invalid value')
    })

    it('Creates new select - invalid price not allowed', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')
        cy.get('.selects .create-new').click()

        cy.get('.editor-box-title').contains('Select name').parent().find('input').click().clear().type('New select name');
        cy.get('.editor-box-title').contains('Select description').parent().find('input').click().clear().type('New select description');
        cy.get('.editor-box-title').contains('Select price').parent().find('input').click().clear().type('77aaa');

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Select price').parent().find('mat-error').contains('Invalid price')
    })

    it('Delete select', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        
        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)

        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.reload()
        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Wołowina')
    })

    it('Edit select name', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select name').parent().find('input').clear().type('Updated select name')
        cy.get('.save-button').click();

        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Updated select name')
        cy.reload();
        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-name').should('have.text', 'Updated select name')
    })

    it('Edit select - empty name not allowed', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select name').parent().find('input').clear()
        cy.get('.save-button').click();

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Select name').parent().find('mat-error').contains('Invalid value')
    })

    it('Edit select - empty price not allowed', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select price').parent().find('input').clear();
        cy.get('.save-button').click();

        cy.get('.save-button').should('have.class', 'disabled');
        cy.get('.save-button').click()
        cy.get('.editor-box-title').contains('Select price').parent().find('mat-error').contains('Invalid price')
    })

    it('Edit select description', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select description').parent().find('input').clear().type('Updated select description')
        cy.get('.save-button').click();

        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-description').should('have.text', 'Updated select description')
        cy.reload();
        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-description').should('have.text', 'Updated select description')
    })

    it('Edit select price', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select price').parent().find('input').clear().type('17.68')
        cy.get('.save-button').click();

        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-price').should('have.text', '17.68 zł')
        cy.reload();
        cy.get('.selects').find('.menu-element').eq(0).find('.menu-element-price').should('have.text', '17.68 zł')
    })

    it('Edit select allergens', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')
    
        createSelect('ZZ new select name', 'New select description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.reload()

        cy.get('.selects').find('.menu-element').eq(3).find('.menu-element-name').should('have.text', 'ZZ new select name')
        cy.get('.selects').find('.menu-element').eq(3).find('.settings-icon').click();

        createSelect('ZZ new select name', undefined, '77', ['Jaja', 'Pszenica', 'Soja', 'Orzechy'])

        cy.get('.selects').find('.menu-element').eq(3).find('.settings-icon').click();
        verifySelect('ZZ new select name', 'New select description', '77', ['Pszenica', 'Soja', 'Orzechy', 'Ryby', 'Mięczaki'])
        cy.get('.cancel-button').click()

        cy.reload();

        cy.get('.selects').find('.menu-element').eq(3).find('.settings-icon').click();
        verifySelect('ZZ new select name', 'New select description', '77', ['Pszenica', 'Soja', 'Orzechy', 'Ryby', 'Mięczaki'])
    })

    it('Edit select order up', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Mięso mieszane')
    
        cy.get('.selects').find('.menu-element').eq(0).find('.bottom').click()
        cy.get('.selects').find('.menu-element').eq(1).find('.bottom').click()

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Mięso mieszane')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Kurczak')

        cy.reload();

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Mięso mieszane')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Kurczak')
    })

    it('Edit select order down', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000')

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Wołowina')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Mięso mieszane')
    
        cy.get('.selects').find('.menu-element').eq(2).find('.top').click()
        cy.get('.selects').find('.menu-element').eq(1).find('.top').click()

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Mięso mieszane')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Wołowina')

        cy.reload();

        cy.get('.selects').eq(0).find('.menu-element-details').eq(0).find('.menu-element-name').should('have.text', 'Mięso mieszane')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(1).find('.menu-element-name').should('have.text', 'Kurczak')
        cy.get('.selects').eq(0).find('.menu-element-details').eq(2).find('.menu-element-name').should('have.text', 'Wołowina')
    })

    it('Reload editor', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')

        createSelect('ZZ new select name', 'New select description', '77', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select name').parent().find('input').should('have.value', 'Kurczak')

        cy.get('.selects').find('.menu-element').eq(1).find('.settings-icon').click({force: true})
        cy.get('.editor-box-title').contains('Select name').parent().find('input').should('have.value', 'Wołowina')

        cy.get('.selects').find('.menu-element').eq(3).find('.settings-icon').click({force: true})
        verifySelect('ZZ new select name', 'New select description', '77', ['Jaja', 'Ryby', 'Mięczaki'])
    })

    it('Zero price is zero', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')

        createSelect('ZZ new select name', 'New select description', '0', ['Jaja', 'Ryby', 'Mięczaki'])

        cy.get('.selects').find('.menu-element').eq(0).find('.settings-icon').click();
        cy.get('.editor-box-title').contains('Select price').parent().find('input').should('have.value', '0')
    })

    it('Empty price is empty', () => {
        cy.visit('/admin/menu/select-collections/SC0KK0000000/select/create/settings')
        cy.get('.editor-box-title').contains('Select price').parent().find('input').should('have.value', '')
    })
})