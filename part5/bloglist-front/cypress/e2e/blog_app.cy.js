describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'omar alktan',
      username: 'omar',
      password: 'oalktan'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('')
  })

  it('Login form is show', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('omar')
      cy.get('#password').type('oalktan')
      cy.contains('login').click()

      cy.get('.notify')
        .should('contain', 'hello, omar')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Username or password is incorrect')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('omar')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Username or password is incorrect')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'omar alktan logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'omar', password: 'oalktan' })
      })
      it.only('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.contains('title')
        cy.contains('create')
      })
    })

  })

})

