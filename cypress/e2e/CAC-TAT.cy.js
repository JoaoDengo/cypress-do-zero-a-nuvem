
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('', () => {
    
  });

  it('preenche os campos obrigatorios e envia o formulario', () =>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('[id^=firstName]')
      .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')

    cy.get('[id^=open-text-area]')
      .type(longText, {delay: 0})

    cy.get('button[type="submit"]')
      .click()

    cy.get('.success')
      .should('be.visible')
  } )

  it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', () =>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.clock()

    cy.get('[id^=firstName]')
      .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@')

    cy.get('[id^=open-text-area]')
      .type(longText, {delay: 0})

    cy.get('button[type="submit"]')
      .click()


    cy.get('.error')
      .should('be.visible')
    cy.tick(3000)

  })

  it('valida campo de telefone', () =>{
    cy.get('input[type="number"]')
      .type('joao')
      .should('have.value', '');

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.clock()
    cy.get('[id^=firstName]')
    .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')

    cy.get('[id^=open-text-area]')
      .type('teste obrigatorio')

    cy.get('[id^=phone-checkbox]')
      .check()

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

    cy.tick(3000)

    cy.get('.error')
    .should('not.be.visible')

  })

  it('preenche e lima os campos nome, sobrenome, email e telefone', () =>{
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
    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  })

  it('teste com comando personalizado', () => {
    cy.fillMandatoryFieldsAndSubmit(
      'Maria', 'Julia', 'mariajulia@gmail.com', 'preciso de ajuda'
    )
  });

  it('teste comando cy.contains', () => {
    cy.get('[id^=firstName]')
      .type('Joao')
    
    cy.get('[id^=lastName]')
      .type('Dengo')

    cy.get('input[type="email"]')
      .type('joaodengo@gmail.com.br')

    cy.get('[id^=open-text-area]')
      .type('teste obrigatorio')

    cy.contains('button', 'Enviar')
      .click()

    cy.get('.success')
      .should('be.visible')
  });

  it('seleciona um produto youtube pelo seu text', () => {
    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')
  });

  Cypress._.times(2,() =>{
    it('seleciona um produto youtube pelo seu text', () => {
      cy.get('select')
        .select('YouTube')
        .should('have.value', 'youtube')
    });
  })

  it('seleciona produto mentoria pelo seu value', () => {
    cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('seleciona um produto Blog pelo seu indice', () => {
    cy.get('select')
      .select(1)
      .should('have.value', 'blog')    
  });

  it('marca o tipo de atendimento "Feefback"', () => {
    cy.get('input[type="radio"][value="elogio"]')
      .check()
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  });

  it('testando o each', () => {
    cy.get('input[type="radio"')
      .each((opcoes) =>{
        cy.wrap(opcoes)
          .check().should('be.checked')
      })
  });

  it('marca ambos checkboxes, depois desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]')
      .each((opcoes) => {
        cy.wrap(opcoes)
          .check()
          .should('be.checked')
      }).last().uncheck()
  });

  it('um unico check pode marcar todos', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

  it('selecione um arquivo da pasta', () => {
    cy.get('input[type="file"]')
      .selectFile('public/img/teste-jesus(3).png')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('teste-jesus(3).png')
      })
  });

  it('selecione um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('public/img/teste-jesus(3).png', {action: 'drag-drop'})
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('files')
    cy.get('input[type="file"]')
      .selectFile('@files')
  });


  it('verifica que a politica de privacidade abre um outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank');
  });

  it('acessa a pagina da politica de privacidade removendo o target e entao clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()
  });

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da area de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'teste teste')
      .should('have.value', 'teste teste')
  });

  it.only('faz uma requisicao HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',
      headers: { 'Accept-Language': 'en-us', },
    }).then((response) =>{
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).contain('CAC TAT')
    })
    
  });

  it.only('metodo do professor', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  });
})
