describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/menu/R0TAXI000000/T00000000000')
    // cy.get('#menu-elements app-menu-horizontal-element-wrapper h2').first().contains('Pizza Klasyka Klasyki!')

    cy.get('#menu-elements app-menu-horizontal-element-wrapper h2').first().contains('Pizza Klasyka Klasyki');
  })
})
