import { faker } from "@faker-js/faker";

describe('Usuario Registro e Login', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();

  it('Registro e Logout', () => {
    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=register-email-input]').type(email);
    cy.get('[data-cy=register-password-input]').type(password);
    cy.get('[data-cy=register-button]').click();

    cy.wait(2000);
    cy.get('[data-cy=containerNav]').should('exist');
    cy.get('[data-cy=logouth3]').click(); // Logout o usuario
  });

  it('Login com novo usuario', () => {
    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=login-email-input]').type(email); // 
    cy.get('[data-cy=login-password-input]').type(password); //
    cy.get('[data-cy=login-button]').click();

    cy.get('[data-cy=containerNav]').should('exist'); // 
    cy.get('[data-cy=logouth3]').should('contain', 'Logout'); // 
  });
});
