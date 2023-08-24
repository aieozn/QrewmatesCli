import { flushPizzaTaxi } from "../../app-staff/utils/utils"
import { loginAsPizzaTaxiAdmin } from "../utils/utils"

describe('Orders history', () => {
    beforeEach(() => {
        flushPizzaTaxi()
        cy.session('login as admin: history', () => loginAsPizzaTaxiAdmin())
        cy.visit('/admin/history')
    })

    it('Orders by create date by default', () => {
        cy.get('.mat-mdc-paginator-range-label').should('have.text', ' 1 – 10 of 17 ')

        cy.get('tr').eq(1).find('td.mat-column-created').should('have.text', '14.12.2022 12:13')
        cy.get('tr').eq(10).find('td.mat-column-created').should('have.text', '01.08.2022 11:41')

        cy.get('.mat-mdc-paginator-navigation-next').click()

        cy.get('tr').should('have.length', 8)

        cy.get('tr').eq(7).find('td.mat-column-created').should('have.text', '01.01.2021 13:28')
    })

    it('Show order details', () => {
        cy.get('tr').eq(4).find('td.cdk-column-actions').click()

        cy.get('#edit-element .summary-element-name').contains('Pizza Vegetariana (Duża)')
        cy.get('#edit-element .summary-element-price').contains('100.00 zł')
        cy.get('#edit-element .summary-element-option').eq(0).contains('kukurydza (+7.99 zł)')
        cy.get('#edit-element .summary-element-option').eq(1).contains('Comment: Comment 14')

        cy.get('#table-number').should('have.text', 'Table 13');
        cy.get('.attribute .key').contains('Total').parent().find('.value').should('have.text', '100.00 zł');
        cy.get('.attribute .key').contains('Payment method').parent().find('.value').should('have.text', 'Cash');

        cy.get('.section h2').contains('Payment status').parent().find('.circle-wrapper.active .status-name').should('have.text', 'Not paid yet')
        cy.get('.section h2').contains('Order status').parent().find('.circle-wrapper.active .status-name').should('have.text', 'Accepted')
    })

    it('Order by order date', () => {
        cy.get('.cdk-column-created').contains('Date').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-created').should('have.text', '01.01.2021 13:28')

        cy.get('.cdk-column-created').contains('Date').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-created').should('have.text', '14.12.2022 12:13')
    })

    it('Order by order status', () => {
        cy.get('.cdk-column-orderStatus').contains('Order status').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-orderStatus').should('have.text', 'Accepted')

        cy.get('.cdk-column-orderStatus').contains('Order status').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-orderStatus').should('have.text', 'Placed')
    })

    it('Order by payment status', () => {
        cy.get('.cdk-column-paymentStatus').contains('Payment status').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-paymentStatus').should('have.text', 'Paid')

        cy.get('.cdk-column-paymentStatus').contains('Payment status').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-paymentStatus').should('have.text', 'Not paid yet')
    })

    it('Order by payment method', () => {
        cy.get('.cdk-column-paymentMethod').contains('Payment method').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-paymentMethod').should('have.text', 'Blik')

        cy.get('.cdk-column-paymentMethod').contains('Payment method').click()
        cy.get('tbody tr').eq(0).find('td.mat-column-paymentMethod').should('have.text', 'Cash')
    })

    it('Selects date range', () => {
        cy.get('.cdk-column-created .header-icon').click();
        cy.get('.mat-calendar-period-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('2022').click()
        cy.get('.mat-calendar-body-cell-content').contains('JAN').click()
        cy.get('.mat-calendar-body-cell-content').contains(new RegExp('^ 1 $')).click()

        cy.get('.mat-calendar-next-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('28').click()

        cy.get('tbody tr').should('have.length', 2)
        cy.get('.cdk-column-created .header-selected').contains('01.01.2021 - 28.02.2022')


        cy.get('tbody tr').eq(0).find('td.mat-column-ref').should('have.text', 'O0PT00000010')
        cy.get('tbody tr').eq(1).find('td.mat-column-ref').should('have.text', 'O0PT00000011')
    })

    it('Unselects date range', () => {
        cy.get('.cdk-column-created .header-icon').click();
        cy.get('.mat-calendar-period-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('2022').click()
        cy.get('.mat-calendar-body-cell-content').contains('JAN').click()
        cy.get('.mat-calendar-body-cell-content').contains(new RegExp('^ 1 $')).click()

        cy.get('.mat-calendar-next-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('28').click()

        cy.get('tbody tr').should('have.length', 2)
        cy.get('.header-selected mat-icon').click()
        cy.get('tbody tr').should('have.length', 10)
    })

    it('Filter by order status', () => {
        cy.get('.mat-column-orderStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Accepted').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 4)

        cy.get('tbody tr').eq(0).find('td.mat-column-ref').should('have.text', 'O0PT00000016')
        cy.get('tbody tr').eq(1).find('td.mat-column-ref').should('have.text', 'O0PT00000015')
        cy.get('tbody tr').eq(2).find('td.mat-column-ref').should('have.text', 'O0PT00000014')
        cy.get('tbody tr').eq(3).find('td.mat-column-ref').should('have.text', 'O0PT00000013')
    })

    it('Removes order status filter', () => {
        cy.get('.mat-column-orderStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Accepted').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 4)
        cy.get('.header-selected mat-icon').click()
        cy.get('tbody tr').should('have.length', 10)
    })

    it('Filter by payament status', () => {
        cy.get('.mat-column-paymentStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Paid').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 1)

        cy.get('tbody tr').eq(0).find('td.mat-column-ref').should('have.text', 'O0PT00000016')
    })

    it('Removes payament status filter', () => {
        cy.get('.mat-column-paymentStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Paid').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 1)
        cy.get('.header-selected mat-icon').click()
        cy.get('tbody tr').should('have.length', 10)
    })

    it('Filter by payament method', () => {
        cy.get('.mat-column-paymentMethod .header-icon').click();
        cy.get('#form mat-checkbox').contains('Blik').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 1)

        cy.get('tbody tr').eq(0).find('td.mat-column-ref').should('have.text', 'O0PT00000016')
    })

    it('Removes payament method filter', () => {
        cy.get('.mat-column-paymentMethod .header-icon').click();
        cy.get('#form mat-checkbox').contains('Blik').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('tbody tr').should('have.length', 1)
        cy.get('.header-selected mat-icon').click()
        cy.get('tbody tr').should('have.length', 10)
    })

    it('Mixed filter', () => {
        cy.get('.cdk-column-created .header-icon').click();
        cy.get('.mat-calendar-period-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('2022').click()
        cy.get('.mat-calendar-body-cell-content').contains('JAN').click()
        cy.get('.mat-calendar-body-cell-content').contains(new RegExp('^ 1 $')).click()

        cy.get('.mat-calendar-period-button').click();
        cy.get('.mat-calendar-body-cell-content').contains('2023').click()
        cy.get('.mat-calendar-body-cell-content').contains('JAN').click()
        cy.get('.mat-calendar-body-cell-content').contains(new RegExp('^ 1 $')).click()

        cy.get('.mat-column-orderStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Placed').parent().find('input').click()
        cy.get('#form mat-checkbox').contains('Accepted').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('.mat-column-paymentStatus .header-icon').click();
        cy.get('#form mat-checkbox').contains('Not paid yet').parent().find('input').click()
        cy.get('.global-confirm-button').click()

        cy.get('.mat-mdc-paginator-range-label').should('have.text', ' 1 – 10 of 16 ')
    })
})