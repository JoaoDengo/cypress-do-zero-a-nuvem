// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    it('verifica o título da aplicação', () => {
      cy.visit('./src/index.html')
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
  })

  it('preenche os campos obrigatorios e envia o formulario', () =>{
    cy.visit('./src/index.html')

    cy.get('[id^=firstName]')
      .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')

    cy.get('[id^=open-text-area]')
      .type('teste obrigatorio')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.success')
      .should('be.visible')
  } )

  it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', () =>{
    cy.visit('./src/index.html')

    cy.get('input[type="email"]')
      .type('joaodengo@')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')
  })

  it('valida campo de telefone', () =>{
    cy.visit('./src/index.html')

    cy.get('input[type="number"]')
      .type('joao')
      .should('have.value', '');

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.visit('./src/index.html')

    cy.get('[id^=firstName]')
    .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')

    cy.get('[id^=open-text-area]')
      .type('teste obrigatorio')

    cy.get('[id^=phone-checkbox]')
      .type('1')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  })

  it('preenche e lima os campos nome, sobrenome, email e telefone', () =>{
    cy.visit('./src/index.html')

    cy.get('[id^=firstName]')
      .type('Joao')
      .should('have.value', 'Joao')
      .clear().should('have.value', '')

    cy.get('[id^=lastName]')
      .type('Dengo')
      .should('have.value', 'Dengo')
      .clear().should('have.value', '')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')
      .should('have.value', 'joaodengo@gmail.com.br')
      .clear().should('have.value', '')

    cy.get('[id^=open-text-area]')
      .type('teste obrigatorio')
      .should('have.value', 'teste obrigatorio')
      .clear().should('have.value', '')

    cy.get('input[type="number"]')
      .type('123453')
      .should('have.value', '123453')
      .clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () =>{
    cy.visit('./src/index.html')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  })





})
