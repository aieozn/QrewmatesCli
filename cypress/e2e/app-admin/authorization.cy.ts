import { loginAsPizzaTaxiAdmin } from "./utils/utils";


describe('Authorization', () => {
    beforeEach(() => {
        loginAsPizzaTaxiAdmin();
    })

    it('Triggers refresh token on 401 response', () => {
        let customResponseApplied = false;

        cy.intercept('GET', '/api/staff/v1/restaurant/R0TAXI000000/allergens', (req) => {
            if (!customResponseApplied) {
                req.reply({statusCode: 401});
                customResponseApplied = true;
            }
        });

        cy.intercept('POST', '/api/public/v1/account/refresh').as('refreshRequest');
        cy.visit('/admin/menu/allergens');

        cy.wait('@refreshRequest').then(({ response }) => expect(response!.statusCode).to.equal(200));

        // Make sure that aallergens were loaded succesfully
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Dwutlenek siarki')
    });

    it('Triggers refresh token on 403 response', () => {
        let customResponseApplied = false;

        cy.intercept('GET', '/api/staff/v1/restaurant/R0TAXI000000/allergens', (req) => {
            if (!customResponseApplied) {
                req.reply({statusCode: 403});
                customResponseApplied = true;
            }
        });

        cy.intercept('POST', '/api/public/v1/account/refresh').as('refreshRequest');
        cy.visit('/admin/menu/allergens');

        cy.wait('@refreshRequest').then(({ response }) => expect(response!.statusCode).to.equal(200));

        // Make sure that aallergens were loaded succesfully
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Dwutlenek siarki')
    });

    it('Triggers refresh when token expired', () => {
        const token = JSON.parse(window.localStorage.getItem('qr-auth-details')!);
        let refreshed = false;

        cy.intercept('POST', '/api/public/v1/account/refresh', () => {
            refreshed = true;
        });

        token.tokenExpiration = new Date().getTime() - 1;
        window.localStorage.setItem('qr-auth-details', JSON.stringify(token));

        cy.visit('/admin/menu/allergens');

        // Make sure that aallergens were loaded succesfully
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Dwutlenek siarki').then(() => {
            expect(refreshed).to.equal(true);
        });
    });

    it('Not triggers refresh when token valid', () => {
        const token = JSON.parse(window.localStorage.getItem('qr-auth-details')!);
        let refreshed = false;

        cy.intercept('POST', '/api/public/v1/account/refresh', () => {
            refreshed = true;
        });

        token.tokenExpiration = new Date().getTime() + 10000;
        window.localStorage.setItem('qr-auth-details', JSON.stringify(token));

        cy.visit('/admin/menu/allergens');

        // Make sure that aallergens were loaded succesfully
        cy.get('#allergens .allergen').eq(0).find('.name').should('have.text', 'Dwutlenek siarki').then(() => {
            expect(refreshed).to.equal(false);
        });
    });
});