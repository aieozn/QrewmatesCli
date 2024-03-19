import { openMenuItemGroupCard, openMenuItemGroupCardWithOption } from "../utils/utils"

const expectedMenuItemPrices = [
    {
        groupName: 'Pizza Cztery Sery',
        itemName: 'Mała',
        price: '21.99 zł'
    },
    {
        groupName: 'Pizza Cztery Sery',
        itemName: 'Średnia',
        price: '26.99 zł'
    },
    {
        groupName: 'Pizza Cztery Sery',
        itemName: 'Duża',
        price: '31.99 zł'
    },
    {
        groupName: 'Pizza Mafioso',
        itemName: 'Średnia',
        price: '28.99 zł'
    }
];

const expectedMenuItemGroupDescription = [
    {
        groupName: 'Pizza Cztery Sery',
        description: 'z serem mozzarella, serem gorgonzola, serem gouda i parmezanem'
    }
];

const expectedToppings = [
    {
        groupName: 'Pizza Diabelska',
        itemName: 'Średnia',
        toppings: ['mozzarella (+5.99 zł)', 'kiełbasa wiejska (+5.99 zł)','ogórek konserwowy (+5.99 zł)'],
        count: 21
    },
    {
        groupName: 'Pizza Spanish Corrida',
        itemName: 'Duża',
        toppings: ['boczek (+7.99 zł)', 'salami pepperoni (+7.99 zł)', 'kabanosowe boczki (+7.99 zł)'],
        count: 21
    }
]

describe('Show item group details', () => {
    beforeEach(() => {
        cy.visit('/table-order/R0TAXI000000/TABLE0PT0001')
    })

    it('Opens item group card on add button click', () => {
        openMenuItemGroupCard('Pizza Diabelska')
        
        cy.get('#menu-item-details-scroll').should('exist')
        cy.get('#close-icon').click()
        cy.get('#menu-item-details-scroll').should('not.exist')
    })

    it('Menu item group has all items selects available', () => {
        openMenuItemGroupCard('Pizza Diabelska')

        cy.get('#item-select mat-select').click();

        ['Mała 21.99 zł', 'Średnia 26.99 zł', 'Duża 31.99 zł'].forEach(element => {
            cy.get('.cdk-overlay-pane mat-option').contains(element)
        });
        
    })

    it('Menu item group has valid name', () => {
        expectedMenuItemGroupDescription.forEach(testCase => {
            openMenuItemGroupCard(testCase.groupName)
            cy.get('.menu-item-name').contains(testCase.groupName)
        })
    })

    it('Menu item group has valid description', () => {
        expectedMenuItemGroupDescription.forEach(testCase => {
            openMenuItemGroupCard(testCase.groupName)
            cy.get('.menu-item-description').contains(testCase.description)
        })
    })

    it('Menu item has valid price', () => {
        expectedMenuItemPrices.forEach((testCase) => {
            openMenuItemGroupCardWithOption({
                group: testCase.groupName,
                item: testCase.itemName
            })
            cy.get('.menu-item-price').contains(testCase.price)
            cy.get('#close-icon').click();
        })
    })

    it('Menu item has valid selects', () => {
        openMenuItemGroupCardWithOption({
            group: 'Pizza Diabelska',
            item: 'Średnia'
        });

        ['Pomidorowy', 'Pomidorowy (+7.99 zł)', 'Czosnkowy (+4.99 zł)'].forEach(testCase => {
            cy.get('#order-menu-select h3').contains('Baza')
                .parent()
                .find('mat-radio-button')
                .contains(testCase);
        })
    })

    it('Menu item has valid toppings', () => {
        for (const testCase of expectedToppings) {
            openMenuItemGroupCardWithOption({
                group: testCase.groupName,
                item: testCase.itemName
            });

            testCase.toppings.forEach(expectedTopping => {
                cy.get('#order-menu-topping h3')
                    .contains('Dodatki do pizzy')
                    .parent()
                    .find('mat-checkbox')
                    .contains(expectedTopping);

                cy.get('#order-menu-topping h3')
                    .contains('Dodatki do pizzy')
                    .parent()
                    .find('mat-checkbox')
                    .should('have.length', testCase.count);
            })

            cy.get('#close-icon').click();
        }
    })

})