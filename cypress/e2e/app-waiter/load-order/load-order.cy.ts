import { complexOrder, orderWithComment, orderWithMultipleElements, orderWithMultipliedComplexElement, orderWithMultipliedElement, orderWithOrderElementComment, orderWithSelect, orderWithToppings, simpleOrder } from "../../utils/fixtures";
import { validateSummary } from "../../utils/utils";
import { fakeOrder, loginAsStaff, removeAllOrders } from "../utils/utils";

describe('Load order', () => {
    beforeEach(() => {
        cy.wrap(removeAllOrders())
        cy.session('login', () => loginAsStaff())
        cy.visit('/staff')
    })

    const testData = [
        {name: 'Simple order', file: 'order/request/simple-order.json', definition: simpleOrder},
        {name: 'Order with select', file: 'order/request/order-with-select.json', definition: orderWithSelect},
        {name: 'Order with toppings', file: 'order/request/order-with-toppings.json', definition: orderWithToppings},
        {name: 'Order with comment', file: 'order/request/order-with-comment.json', definition: orderWithComment},
        {name: 'Order with element comment', file: 'order/request/order-with-order-element-comment.json', definition: orderWithOrderElementComment},
        {name: 'Order with multiple elements', file: 'order/request/order-with-multiple-elements.json', definition: orderWithMultipleElements},
        {name: 'Order with multiplied element', file: 'order/request/order-with-multiplied-element.json', definition: orderWithMultipliedElement},
        {name: 'Order with multiplied complex element', file: 'order/request/order-with-multiplied-complex-element.json', definition: orderWithMultipliedComplexElement},
        {name: 'Complex order', file: 'order/request/complex-order.json', definition: complexOrder},
    ]

    testData.forEach(({name, file, definition}) => {
        it(name, () => {
            fakeOrder(file)
    
            cy.get('.pending-order').click();
            validateSummary(definition, false)
        })
    })
})