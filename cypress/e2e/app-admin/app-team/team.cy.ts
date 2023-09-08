import { flushPizzaTaxi } from "../../app-staff/utils/utils";
import { loginAsPizzaTaxiAdmin } from "../utils/utils";

describe('Edit team', () => {
    beforeEach(() => {
        flushPizzaTaxi()
        cy.session('login as admin: team', () => loginAsPizzaTaxiAdmin())
        cy.visit('/admin/team')
    })


    it('Sends invitation', () => {
        cy.get('h2').contains('Invitations').parent().find('.bar').should('have.length', 4)
        cy.get('.create-new').click();
        cy.get('.field-editor[name="Email"] mat-form-field input').click().type('abcdefg@email.com');
        cy.get('.field-editor[name="Role"] mat-radio-button[ng-reflect-value="ADMIN"]').click();
        cy.get('.save-button').click()

        cy.get('mat-dialog-container .mat-mdc-dialog-content').should('have.text', 'An email with further steps will be sent to the user.');
        cy.get('.ok-button').click()

        cy.get('h2').contains('Invitations').parent().find('.bar').should('have.length', 5)
        cy.get('h2').contains('Invitations').parent().find('.bar').eq(4).find('.user-bar p').eq(0).should('have.text', 'Role: ADMIN');
        cy.get('h2').contains('Invitations').parent().find('.bar').eq(4).find('.user-bar p').eq(1).should('have.text', 'Email: abcdefg@email.com');
    })

    it('Modify user role', () => {
        cy.get('h2').contains('Staff').parent().find('.bar').should('have.length', 2)

        cy.get('h2').contains('Administrators').parent().find('.bar').eq(1).find('.user-bar p').contains('Pizza taxi admin');
        cy.get('h2').contains('Administrators').parent().find('.bar').eq(1).find('.mat-icon').click()
        cy.get('.field-editor[name="Role"] mat-radio-button[ng-reflect-value="STAFF"]').click();
        cy.get('.save-button').click()

        cy.get('h2').contains('Staff').parent().find('.bar').should('have.length', 3)
        cy.get('h2').contains('Staff').parent().find('.bar').eq(0).find('.user-bar p').contains('Pizza taxi admin');
    })

    it('Removes user', () => {
        cy.get('h2').contains('Administrators').parent().find('.bar').should('have.length', 2)

        cy.get('h2').contains('Administrators').parent().find('.bar').eq(1).find('.user-bar p').contains('Pizza taxi admin');
        cy.get('h2').contains('Administrators').parent().find('.bar').eq(1).find('.mat-icon').click()
        cy.get('.remove-button').click()
        cy.on('window:confirm', () => true)

        cy.get('h2').contains('Administrators').parent().find('.bar').should('have.length', 1)
        cy.reload()
        cy.get('h2').contains('Administrators').parent().find('.bar').should('have.length', 1)
    })

    it('Removes invitation', () => {
        cy.get('h2').contains('Invitations').parent().find('.bar').should('have.length', 4)

        cy.get('h2').contains('Invitations').parent().find('.bar').eq(0).find('mat-icon').click()
        cy.on('window:confirm', () => true)

        cy.get('h2').contains('Invitations').parent().find('.bar').should('have.length', 3)
        cy.reload()
        cy.get('h2').contains('Invitations').parent().find('.bar').should('have.length', 3)
    })

    it('Notifies on duplicated user', () => {
        cy.get('.create-new').click();
        cy.get('.field-editor[name="Email"] mat-form-field input').click().type('admin@email.com');
        cy.get('.field-editor[name="Role"] mat-radio-button[ng-reflect-value="ADMIN"]').click();
        cy.get('.save-button').click()

        cy.get('mat-dialog-container .mat-mdc-dialog-content').should('have.text', 'User already exist');
    })

    it('Notifies on duplicated invitation', () => {
        cy.get('.create-new').click();
        cy.get('.field-editor[name="Email"] mat-form-field input').click().type('kamil.jedrzejczak@outlook.com');
        cy.get('.field-editor[name="Role"] mat-radio-button[ng-reflect-value="ADMIN"]').click();
        cy.get('.save-button').click()

        cy.get('mat-dialog-container .mat-mdc-dialog-content').should('have.text', 'User already exist');
    })

    it.only('Self update not allowed', () => {
        cy.get('h2').contains('Staff').parent().find('.bar').should('have.length', 2)

        cy.get('h2').contains('Administrators').parent().find('.bar').eq(0).find('.user-bar p').contains('Panda ramen and pizza taxi admin');
        cy.get('h2').contains('Administrators').parent().find('.bar').eq(0).find('.mat-icon').click()
        cy.get('.field-editor[name="Role"] mat-radio-button[ng-reflect-value="STAFF"] input').should('be.disabled');
    })

});