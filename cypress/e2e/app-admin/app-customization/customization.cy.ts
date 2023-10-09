import { flushKebebKing, getTableImage, loginAsKebabKingAdmin } from "../utils/utils";

describe('Edit allergens', () => {
    beforeEach(() => {
        flushKebebKing()
        cy.session('login as admin: customization', () => loginAsKebabKingAdmin())
        cy.visit('/admin/customization')
    })


    it('Selects background image', () => {
        cy.visit('/menu/R0KING000000/TABLE0KK0001')

        cy.get('#banner')
            .should('have.css', 'background-image')
            .and('include', 'none')

        cy.visit('/admin/customization')

        cy.get('#file-upload-background-photo').selectFile('cypress/fixtures/fries.jpeg', {force: true})
        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')


        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-image')
            .and('include', '/api/public/v1/restaurant/R0KING000000/multimedia/')
    })

    it('Selects qr theme', () => {
        getTableImage().then(response => {
            expect(response.headers).to.have.property('content-type', 'image/png')
            expect(response.body).to.have.length.gt(72400)
            expect(response.body).to.have.length.lt(72500)
        })

        cy.get('h3').contains('QR theme').parent().find('#sendFile').click()
        cy.get('#configs .config').eq(0).click();
        cy.get('.save-button').click()

        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')

        getTableImage().then(response => {
            expect(response.headers).to.have.property('content-type', 'image/png')
            expect(response.body).to.have.length.gt(28000)
            expect(response.body).to.have.length.lt(28100)
        })
    })

    it('Selects restaurant color', () => {
        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-color')
            .and('include', 'rgb(56, 165, 131)')

        cy.visit('/admin/customization')
        cy.get('h3').contains('Select theme main color').parent().find('#sendFile').click()
        cy.get('.color-picker.open .hex-text input').click().clear().type('#a59d38')
        cy.get('#personalization').click()

        cy.get('#submit-changes').click()
        cy.get('#submit-changes').should('not.exist')

        cy.visit('/menu/R0KING000000/TABLE0KK0001')
        cy.get('#banner')
            .should('have.css', 'background-color')
            .and('include', 'rgb(165, 157, 56)')
    })

    it('Switch Manage table orders', () => {
        const group = 'Order to table configuration';
        const property = 'Manage table orders';

        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch order to table online payment', () => {
        const group = 'Order to table configuration';
        const property = 'Online payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch order to table offline payment', () => {
        const group = 'Order to table configuration';
        const property = 'Offline payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch order to table call waiter', () => {
        const group = 'Order to table configuration';
        const property = 'Call waiter';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch Manage on site orders', () => {
        const group = 'Order on site configuration';
        const property = 'Manage on site orders';

        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch on site online payment', () => {
        const group = 'Order on site configuration';
        const property = 'Online payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch on site offline payment', () => {
        const group = 'Order on site configuration';
        const property = 'Offline payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch Manage on site orders', () => {
        const group = 'Online order configuration';
        const property = 'Manage online orders';

        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch on site online payment', () => {
        const group = 'Online order configuration';
        const property = 'Online payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });

    it('Switch on site offline payment', () => {
        const group = 'Online order configuration';
        const property = 'On delivery cash payment';
        
        swithToogle(group, property, 'Disable', 'Enable');

        cy.get('#submit-changes').click();
        cy.reload();

        verifyToogle(group, property, 'Enable');
    });


    it('Disabling all payment methods for table orders is not allowed', () => {
        swithToogle('Order to table configuration', 'Online payment', 'Disable', 'Enable');
        swithToogle('Order to table configuration', 'Offline payment', 'Disable', 'Enable');
        cy.get('#submit-changes').click();

        cy.get('#dialog-content #title').should('have.text', 'Invalid configuration')
    });

    it('Disabling all payment methods for online orders is not allowed', () => {
        swithToogle('Online order configuration', 'Online payment', 'Disable', 'Enable');
        swithToogle('Online order configuration', 'On delivery cash payment', 'Disable', 'Enable');
        swithToogle('Online order configuration', 'On delivery card payment', 'Disable', 'Enable');
        cy.get('#submit-changes').click();

        cy.get('#dialog-content #title').should('have.text', 'Invalid configuration')
    });

    it('Disabling all payment methods for onsite orders is not allowed', () => {
        swithToogle('Order on site configuration', 'Online payment', 'Disable', 'Enable');
        swithToogle('Order on site configuration', 'Offline payment', 'Disable', 'Enable');
        cy.get('#submit-changes').click();

        cy.get('#dialog-content #title').should('have.text', 'Invalid configuration')
    });

    function verifyToogle(group: string, property: string, value: string) {
        cy.get('h2').contains(group).parent()
        .find('h2').contains(property).parent()
        .find('.customization-envelope .action-button')
        .should('have.text', value)
    }

    function swithToogle(group: string, property: string, before: string, after: string) {
        cy.get('h2').contains(group).parent()
        .find('h2').contains(property).parent()
        .find('.customization-envelope .action-button')
        .should('have.text', before)
        .click();

        verifyToogle(group, property, after)
    }
});