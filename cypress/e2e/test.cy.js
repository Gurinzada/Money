describe('Registro de Usuário', () => {
  it('Registra um novo usuário e faz logout', () => {
    // Visitar a página de registro
    cy.visit('http://localhost:3000/auth');

    cy.get('[data-cy=register-email-input]').type('novousuariofabb@example.com');
    cy.get('[data-cy=register-password-input]').type('senha123');
    cy.get('[data-cy=register-button]').click();

    cy.wait(2000); 

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=logouth3]').click();
  });
});
