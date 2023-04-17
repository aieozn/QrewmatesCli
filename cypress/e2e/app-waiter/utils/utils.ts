export function loginAsStaff() {
    cy.visit('/login')
    cy.get('#login-input').click().type('taxi.staff@email.com')
    cy.get('#password-input').click().type('taxi.staff')
    cy.get('#login-button').click()

    cy.location('pathname').should('eq', '/staff')
}

export async function getUserToken(email: string, password: string) {
    const response = await fetch("http://localhost:4200/api/public/v1/account/login/local", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            email: email,
            password: password
        }),
        "method": "POST"
    });

    const responseText: string = JSON.parse(await response.text())['token'];

    return responseText;
}

export async function removeAllOrders() {
    const token = await getUserToken('root@email.com', 'root');

    const response = await fetch("/api/staff/v1/restaurant/R0TAXI000000/order-instances", {
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        "method": "DELETE"
    });

    if (response.status !== 200) {
        throw 'Invalid response status'
    }
}

export async function fakeOrder(file: string) {
    cy.fixture(file).then((fixture: string) => {
        cy.request({
            method: 'POST',
            url: '/api/public/v1/restaurant/R0TAXI000000/order-instances',
            body: fixture,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    })
}