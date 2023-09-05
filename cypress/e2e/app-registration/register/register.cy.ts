import { flushPizzaTaxi } from "../../app-staff/utils/utils"

describe('Register', () => {

    beforeEach(() => {
        flushPizzaTaxi()
    })

    it('Registration not found for invalid secret', () => {
        cy.visit('/login/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
        cy.location('pathname').should('eq', '/registration/not-found')
    })

    it('Assigns restaurant admin to existing user', () => {
        cy.visit('/login/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/login/select-organization')

        cy.get('.organization').should('have.length', 2)
        cy.get('.organization').contains('Pizza taxi na miasteczku').click()
        cy.location('pathname').should('eq', '/admin/statistics')
    })

    it('Assigns restaurant staff to existing user', () => {
        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/login/select-organization')

        cy.get('.organization').should('have.length', 2)
        cy.get('.organization').contains('Pizza taxi na miasteczku').click()
        cy.location('pathname').should('eq', '/staff/active')
    })

    it('Rejects invitation', () => {
        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('panda.staff@email.com')
        cy.get('#password-input').click().type('panda.staff')
        cy.get('#login-button').click()
        cy.get('#reject').click()

        cy.visit('login/select-organization')
        cy.get('.organization').should('have.length', 1)
        cy.get('.organization').should('have.text', 'Panda Ramen')

        cy.visit('/login/17ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.location('pathname').should('eq', '/registration/not-found')
    })

    it('Upgrades privilages', () => {
        cy.visit('/login/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#login-input').click().type('taxi.staff@email.com')
        cy.get('#password-input').click().type('taxi.staff')
        cy.get('#login-button').click()
        cy.get('#accept').click()
        cy.location('pathname').should('eq', '/admin/statistics')
    })

    it('Notifies on email conflict', () => {
        cy.visit('/registration/register/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#username-form').click().type('Krzysztof')
        cy.get('#email-form').click().type('aieozn@gmail.com')
        cy.get('#password-form').click().type('NewKrzysztofPassword')

        cy.get('#create-account-button').click()

        cy.get('#email-form mat-error').eq(0).should('have.text', 'User already exist');
    })

    it('Validates form', () => {
        cy.visit('/registration/register/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#create-account-button').click()

        cy.get('#username-form mat-error').eq(0).should('have.text', 'Username is required');
        cy.get('#email-form mat-error').eq(0).should('have.text', 'Email is required');
        cy.get('#password-form mat-error').eq(0).should('have.text', 'Password is required');

        cy.get('#username-form').click().type('A')
        cy.get('#email-form').click().type('B')
        cy.get('#password-form').click().type('C')
        cy.get('#create-account-button').click()

        cy.get('#username-form mat-error').eq(0).should('have.text', 'Username too short');
        cy.get('#email-form mat-error').eq(0).should('have.text', 'Invalid email address');
        cy.get('#password-form mat-error').eq(0).should('have.text', 'Password too short');
    })

    it('Creates new local account for invitation email', () => {
        cy.visit('/registration/register/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#create-account-button').click();

        cy.get('#username-form').click().type('Kamil Jędrzejczak')
        cy.get('#email-form').click().type('kamil.jedrzejczak@outlook.com')
        cy.get('#password-form').click().type('P@SSUU0RD')
        cy.get('#create-account-button').click()

        cy.wait(3000).get('.welcome-message').should('have.text', 'Welcome Aboard! Your account has been successfully created.')

        cy.get('#navigate-login').click();

        cy.location('pathname').should('eq', '/login')

        cy.get('#login-input').click().type('kamil.jedrzejczak@outlook.com')
        cy.get('#password-input').click().type('P@SSUU0RD')
        cy.get('#login-button').click();

        cy.location('pathname').should('eq', '/admin/statistics')

        cy.visit('/login/select-organization')

        cy.get('h2').should('have.text', 'Pizza taxi na miasteczku')
    })

    it('Creates new local account for new email', () => {
        cy.visit('/registration/register/16ed6a86-ec76-4672-a8ef-7023338e773c')
        cy.get('#create-account-button').click();

        cy.get('#username-form').click().type('Kamil Jędrzejczak')
        cy.get('#email-form').click().type('new.email@email.com')
        cy.get('#password-form').click().type('P@SSUU0RD')
        cy.get('#create-account-button').click()

        cy.wait(3000).get('.welcome-message').should('have.text', 'Welcome Aboard! Your account has been successfully created. A verification email is on its way to your inbox. Please follow the instructions therein to complete your registration.')
    })

    it('Activates account', () => {
        cy.visit('/login')

        cy.get('#login-input').click().type('not.confirmed@email.com')
        cy.get('#password-input').click().type('not.confirmed')
        cy.get('#login-button').click();
        cy.get('#login-error').should('have.text', 'Invalid email or password')

        cy.visit('/registration/confirm/59236efa-4bcf-11ee-be56-0242ac120002')
        cy.wait(3000).get('.welcome-message').should('have.text', 'Welcome Aboard! Your account has been successfully created.')
        cy.get('#navigate-login').click()

        cy.get('#login-input').click().type('not.confirmed@email.com')
        cy.get('#password-input').click().type('not.confirmed')
        cy.get('#login-button').click();

        cy.location('pathname').should('eq', '/staff/active')
        cy.visit('/login/select-organization')

        cy.get('h2').should('have.text', 'Pizza taxi na miasteczku')
    })

    it('Prints error on failed email acceptance', () => {
        cy.visit('/registration/confirm/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
        cy.get('.welcome-message').should('have.text', 'Something went wrong.')
    })

    it('Prints error on failed email acceptance', () => {
        cy.visit('/registration/confirm/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
        cy.get('.welcome-message').should('have.text', 'Something went wrong.')
    })
})