import { faker } from "@faker-js/faker";

describe('Login', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();
    let newPassword = faker.internet.password();
    it('Faz registro e apos tenta fazer o login com senha errada', () => {
        cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=register-email-input]').type(email);
    cy.get('[data-cy=register-password-input]').type(password);
    cy.get('[data-cy=register-button]').click();
    cy.wait(2000);

    cy.get('[data-cy=containerNav]').should('exist');
    cy.get('[data-cy=logouth3]').click(); // Logout o usuario

    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=login-email-input]').type(email); // 
    cy.get('[data-cy=login-password-input]').type(newPassword); //
    cy.get('[data-cy=login-button]').click();
    
    cy.url().should('eq', 'http://localhost:3000/');

    });

});
