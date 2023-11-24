import { faker } from "@faker-js/faker";

describe('User Registration and Login', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();

  it('Registers a new user', () => {
    // Use the imported email and password variables from the support/faker file
    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=register-email-input]').type(email);
    cy.get('[data-cy=register-password-input]').type(password);
    cy.get('[data-cy=register-button]').click();

    cy.wait(2000);
    cy.get('[data-cy=containerNav]').should('exist'); // Verify user is logged in
    cy.get('[data-cy=logouth3]').click(); // Logout the user
  });

  it('Logs in with the new user', () => {
    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=login-email-input]').type(email); // Use the imported email variable
    cy.get('[data-cy=login-password-input]').type(password); // Use the imported password variable
    cy.get('[data-cy=login-button]').click();

    cy.get('[data-cy=containerNav]').should('exist'); // Verify user is logged in
    cy.get('[data-cy=logouth3]').should('contain', 'Logout'); // Verify logout link exists
  });
});
