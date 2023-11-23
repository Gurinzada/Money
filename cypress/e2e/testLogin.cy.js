describe('Login', () => {
    it('Faz login', () => {
        cy.visit('http://localhost:3000/auth');

        cy.get('[data-cy=login-form]');
        cy.get('[data-cy=login-email-input]').type('novousuariofabb@example.com');
        cy.get('[data-cy=login-password-input]').type('senha123');

        cy.get('[data-cy=login-button]').click();

         cy.get('[data-cy=containerPerfil]');
         cy.get('[data-cy=perfilName]').click();
         cy.get('[data-cy=PrimeiroNome]').type('João');
         cy.get('[data-cy=SegundoNome]').type('Batista');
         cy.get('[data-cy=atualizar]').click();

         cy.get('[data-cy=containerNav]');
         cy.get('[data-cy=irHome]').click();

    });

});
