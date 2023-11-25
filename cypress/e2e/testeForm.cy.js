import { faker } from "@faker-js/faker";

describe('Testes de usuario', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();
    let fisrtName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let newPassword = faker.internet.password();
    let textTitle =faker.commerce.product();
    let num = faker.finance.amount();
    let info = faker.commerce.productDescription();


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
    cy.get('[data-cy=logouth3]').click();
    cy.url().should('eq', 'http://localhost:3000/auth');
  });

  it('Faz login e muda o nome e senha', () => {
    cy.visit('http://localhost:3000/auth');

    cy.get('[data-cy=login-form]');
    cy.get('[data-cy=login-email-input]').type(email);
    cy.get('[data-cy=login-password-input]').type(password);

    cy.get('[data-cy=login-button]').click();

     cy.get('[data-cy=containerPerfil]');
     cy.get('[data-cy=perfilName]').click();
     cy.get('[data-cy=PrimeiroNome]').type(fisrtName);
     cy.get('[data-cy=SegundoNome]').type(lastName);
     cy.get('[data-cy=atualizar]').click();
     cy.wait(4000);

     cy.get('[data-cy=containerNav]');
     cy.get('[data-cy=irHome]').click();


     cy.get('[data-cy=containerPerfil]').should('exist');
     cy.get('[data-cy=WelcomeName]').should('contain', 'Olá ');

     cy.get('[data-cy=settingsProfile]').click();
     cy.url().should('eq', 'http://localhost:3000/settings');
     cy.get('[data-cy =formChangePassword]');
     cy.get('[data-cy=oldPassword]').type(password);
     cy.wait(2000);
     cy.get('[data-cy=newPw]').type(newPassword);
     cy.wait(2000);
     cy.get('[data-cy=butaoSenha]').click();
     cy.url().should('eq', 'http://localhost:3000/auth');
     
     cy.get('[data-cy=login-form]');
     cy.get('[data-cy=login-email-input]').type(email);
     cy.get('[data-cy=login-password-input]').type(newPassword);
     cy.get('[data-cy=login-button]').click();
     cy.url().should('eq', 'http://localhost:3000/');
});

  it('Faz Transações e deletar Transações', () => {

    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=login-email-input]').type(email); // 
    cy.get('[data-cy=login-password-input]').type(newPassword); //
    cy.get('[data-cy=login-button]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irTransacao]').click();
    cy.get('[data-cy=tituloTransacao]').type(textTitle);
    cy.get('[data-cy=numTransacao]').type(num);
    cy.get('[data-cy=dataTransacao]');
    cy.get('[data-cy=infoTransacao]').type(info);
    cy.get('[data-cy=selecionarCat]').its('length', {log:false}).then(n=> {
      const random = Cypress._.random(n+1)
      cy.get('[data-cy=selecionarCat]').select(random)
    });
    cy.get('[data-cy=botaoTransaction]').click();
    cy.wait(2000);

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irHome]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    //cy.wait(5000);
    cy.get('[data-cy=cartaoCategoria]').should('exist');
    cy.get('[data-cy=trasacaoCartao]').should('exist');

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irTransacao]').click();
    cy.get('[data-cy=tituloTransacao]').type(textTitle);
    cy.get('[data-cy=numTransacao]').type(num);
    cy.get('[data-cy=dataTransacao]');
    cy.get('[data-cy=infoTransacao]').type(info);
    cy.get('[data-cy=selecionarCat]').its('length', {log:false}).then(n=> {
      const random = Cypress._.random(n+1)
      cy.get('[data-cy=selecionarCat]').select(random)
    });
    cy.get('[data-cy=botaoTransaction]').click();
    cy.wait(2000);

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irHome]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    //cy.wait(5000);
    cy.get('[data-cy=cartaoCategoria]').should('exist');
    cy.get('[data-cy=trasacaoCartao]').should('exist');

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irTransacao]').click();

    cy.get('[data-cy=containerDelete]');
    cy.get('[data-cy=exibirTransacao]').click();
    cy.wait(4000);
    cy.get('[data-cy=trasacaoCartao]').should('exist');
    cy.get('[data-cy=deleteButao]').click({ multiple: true });
    cy.wait(4000);

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irHome]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.reload();
  });

  it('Faz transações e ver categoria', () => {

    cy.visit('http://localhost:3000/auth');
    cy.get('[data-cy=login-email-input]').type(email); // 
    cy.get('[data-cy=login-password-input]').type(newPassword); //
    cy.get('[data-cy=login-button]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irTransacao]').click();
    cy.get('[data-cy=tituloTransacao]').type(textTitle);
    cy.get('[data-cy=numTransacao]').type(num);
    cy.get('[data-cy=dataTransacao]');
    cy.get('[data-cy=infoTransacao]').type(info);
    cy.get('[data-cy=selecionarCat]').its('length', {log:false}).then(n=> {
      const random = Cypress._.random(n+1)
      cy.get('[data-cy=selecionarCat]').select(random)
    });
    cy.get('[data-cy=botaoTransaction]').click();
    cy.wait(2000);

    cy.get('[data-cy=containerNav]');
    cy.get('[data-cy=irHome]').click();
    cy.get('[data-cy=irCat]').click();
    cy.get('[data-cy=containerCat]');
    cy.get('[data-cy=exibirCategoriaResult]').click();
    cy.wait(4000);
    cy.get('[data-cy=trasacaoCartao]').should('exist');

  });


});
