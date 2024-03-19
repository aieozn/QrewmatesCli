const allCategories = [
  "Pizza Klasyka Klasyki",
  "Pizza Klasyka Gatunku",
  "Pizza Bogactwa Smaków",
  "Pizza Znane i Lubiane",
  "Pizza Taxi Poleca",
  "Przystawki",
  "Napoje bezalkoholowe",
  "Sosy"
]

describe('Load menu', () => {

  beforeEach(() => {
    cy.visit('/table-order/R0TAXI000000/TABLE0PT0001')
  })

  it('Page contains all expected categories', () => {
    cy.get('#menu-elements app-menu-horizontal-element-wrapper h2').each(($el, index) => {
      cy.wrap($el).contains(allCategories[index]);
    });
  })

  it('Menu contains all expected categories', () => {
    cy.get('.menu-horizontal-element').each(($el, index) => {
      cy.wrap($el).contains(allCategories[index]);
    });
  })

  it('Menu category contains description', () => {
    cy.get('#menu-elements app-menu-horizontal-element-wrapper')
      .first()
      .get(".description")
      .contains("Najpopularniejsza z najpopularniejszych")
  })

  it('Menu category contains price', () => {
    cy.get('#menu-elements app-menu-horizontal-element-wrapper')
      .first()
      .get(".menu-item-price")
      .contains("14.99 zł")
  })

  it('Updates horizontal menu active element on scroll', () => {
    for (let i = 0; i < allCategories.length; i++) {
      cy.get('#menu-elements app-menu-horizontal-element-wrapper').eq(i).scrollIntoView()
      cy.get('.menu-horizontal-element').contains(allCategories[i]).should('have.class', 'selected')
      cy.get('.menu-horizontal-element.selected').should('have.length', 1)
    }
  })

  it('Scrolls to selected element on horizontal element click', () => {
    for (let i = 0; i < allCategories.length; i++) {
      cy.get('.menu-horizontal-element').contains(allCategories[i]).click();
      cy.get('#menu-elements app-menu-horizontal-element-wrapper').eq(i).should('be.visible')
    }
  })

  it('Opens vertical menu', () => {
    cy.get('#full-size-menu').should('be.hidden');
    cy.get('#hamburger').click();
    cy.get('#full-size-menu').should('not.be.hidden');
  })

  it('Vetical menu contains all categories', () => {
    for (const category of allCategories) {
      cy.get('#full-size-menu p.clickable').contains(category).should('have.length', 1)
    }
  })

  it('Vertical menu elements click scrolls to expected element', () => {
    for (let i = 0; i < allCategories.length; i++) {
      cy.get('#hamburger').click();
      cy.get('#full-size-menu p.clickable').contains(allCategories[i]).click();
      cy.get('#full-size-menu').should('be.hidden');
      cy.get('#menu-elements app-menu-horizontal-element-wrapper').eq(i).should('be.visible')
    }
  })

  it('Opens about us card', () => {
    cy.get('#generic-dialog-wrapper').should('not.exist')
    cy.get('.footer-row-title span').contains('About us').scrollIntoView();
    cy.get('.footer-row-title span').contains('About us').click();
    cy.get('#generic-dialog-wrapper').should('exist')

    cy.get('#generic-dialog-wrapper h2').contains('About us');
    cy.get('#generic-dialog-card-header #close-icon').click()
    cy.get('#generic-dialog-wrapper').should('not.exist')
  })
})
