import { OrderDefinition } from "./utils"

export const simpleOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }]
        },
    ],
    expectedPrice: '14.99 zł'
}

export const simpleOrderPlusBacon : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'boczek (+4.99 zł)',
                }
            ]
        },
    ],
    expectedPrice: '19.98 zł'
}

export const simpleDoubleOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            count: 2
        },
    ],
    expectedPrice: '29.98 zł'
}

export const margheritaWithSanMarzanoOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy (+6.99 zł)'
            }]
        },
    ],
    expectedPrice: '21.98 zł'
}


export const orderWithSelect : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Średnia',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy (+7.99 zł)'
            }]
        },
    ],
    expectedPrice: '36.98 zł'
}

export const orderWithToppings : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Duża',
            selects: [
                {
                    groupName: 'Brzegi ciasta',
                    selectName: 'Ze serem'
                },
                {
                    groupName: 'Baza',
                    selectName: 'Pomidorowy'
                }
            ],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'boczek (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kiełbasa wiejska (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kabanosowe boczki (+7.99 zł)',
                }
            ]
        },
    ],
    expectedPrice: '64.96 zł'
}

export const orderWithToppingsAndSelects : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Duża',
            selects: [
                {
                    groupName: 'Brzegi ciasta',
                    selectName: 'Ze serem'
                },
                {
                    groupName: 'Baza',
                    selectName: 'Czosnkowy'
                }
            ],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'boczek (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kiełbasa wiejska (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kabanosowe boczki (+7.99 zł)',
                }
            ]
        },
    ],
    expectedPrice: '70.95 zł'
}

export const orderWithToppingsAndSelectsCleared : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Średnia',
            selects: [
                {
                    groupName: 'Baza',
                    selectName: 'Pomidorowy'
                }
            ],
            toppings: [
            ]
        },
    ],
    expectedPrice: '28.99 zł'
}

export const orderWithToppingsMinusBacon : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Barbecue Bonanza',
            item: 'Duża',
            selects: [
                {
                    groupName: 'Brzegi ciasta',
                    selectName: 'Ze serem'
                },
                {
                    groupName: 'Baza',
                    selectName: 'Pomidorowy'
                }
            ],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kiełbasa wiejska (+7.99 zł)',
                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kabanosowe boczki (+7.99 zł)',
                }
            ]
        },
    ],
    expectedPrice: '56.97 zł'
}

export const orderWithComment : OrderDefinition = {
    ...simpleOrder,
    comment: 'I\'m sooo hungry!'
}

export const orderWithOrderElementComment : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Funghi',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            comment: 'Please remove dough from pizza'
        },
    ],
    expectedPrice: '19.99 zł'
}

export const orderWithMultipleElements : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }]
        },
        {
            group: 'Woda Primavera gazowana 0,5l'
        },
        {
            group: 'Sos barbecue'
        },
        {
            group: 'Pizza z Frytkami',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
        }
    ],
    expectedPrice: '42.97 zł'
}

export const orderWithMultipleMargheritaDeleted : OrderDefinition = {
    elements: [
        {
            group: 'Woda Primavera gazowana 0,5l'
        },
        {
            group: 'Sos barbecue'
        },
        {
            group: 'Pizza z Frytkami',
            item: 'Mała',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
        }
    ],
    expectedPrice: '27.98 zł'
}

export const orderWithMultipliedElement : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Średnia',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            count: 5
        }
    ],
    expectedPrice: '99.95 zł'
}

export const orderWithMultipliedComplexElement : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Mafioso',
            item: 'Duża',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy (+8.99 zł)'
            }],
            toppings: [
                {
                    groupName: "Dodatki do pizzy",
                    toppingName: "brokuły"
                },
                {
                    groupName: "Dodatki do pizzy",
                    toppingName: "cebula"
                },
                {
                    groupName: "Dodatki do pizzy",
                    toppingName: "kiełbasa wiejska"
                }
            ],
            comment: "Tylko szybko!",
            count: 5
        }
    ],
    expectedPrice: '334.75 zł'
}

export const complexOrder : OrderDefinition = {
    elements: [
        {
            group: 'Pizza Margherita',
            item: 'Średnia',
            selects: [{
                groupName: 'Baza',
                selectName: 'Pomidorowy'
            }],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'kukurydza',

                }
            ],
            count: 2
        },
        {
            group: 'Pizza Capricciosa',
            item: 'Duża',
            selects: [{
                groupName: 'Baza',
                selectName: 'Czosnkowy'
            }],
            toppings: [
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'ananas',

                },
                {
                    groupName: 'Dodatki do pizzy',
                    toppingName: 'boczek',

                }
            ],
            comment: 'Bez pośpiechu'
        },
        {
            group: 'Coca-Cola 0,5l',
            comment: 'Zimna'
        },
        {
            group: 'Coca-Cola 1l'
        }
    ],
    expectedPrice: '116.90 zł'
}