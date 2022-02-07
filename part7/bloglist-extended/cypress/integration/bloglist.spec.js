const user = {
  name: 'Ted Tester',
  username: 'tester',
  password: 'salainen',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('.loginForm');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login-btn').click();

      cy.contains('Successfully logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username);
      cy.get('#password').type('wrong');
      cy.get('#login-btn').click();

      cy.contains('Wrong credentials');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#blogTitle').type('a title created by cypress');
      cy.get('#blogAuthor').type('an author created by cypress');
      cy.get('#blogUrl').type('a url created by cypress');
      cy.get('#createBlogBtn').click();

      cy.contains('a title created by cypress');
    });

    describe('When blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title 1',
          author: 'Author 1',
          url: 'Url 1',
        });
        cy.createBlog({
          title: 'Title 3',
          author: 'Author 3',
          url: 'Url 3',
          likes: 15,
        });
        cy.createBlog({
          title: 'Title 2',
          author: 'Author 2',
          url: 'Url 2',
          likes: 17,
        });
      });

      it('A blog can be liked', function () {
        cy.contains('Title 1 by Author 1').parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').find('#likeBtn').click();
        cy.get('@blog').contains('Likes: 1');
      });

      it('A blog can be removed', function () {
        cy.contains('Title 1 by Author 1').parent().as('blog');
        cy.get('@blog').contains('view').click();
        cy.get('@blog').find('#removeBtn').click();
        cy.should('not.contain', 'Title 1 by Author 1');
      });

      it.only('Blogs are in correct order', function () {
        cy.get('.blog').then((blogs) => {
          let prev;
          blogs.map((index, blog) => {
            cy.wrap(blog).as('blog');
            cy.get('@blog').contains('view').click();
            cy.get('@blog')
              .find('#likeAmount')
              .invoke('text')
              .then((likes) => {
                likes = parseInt(likes);
                if (!prev) {
                  prev = likes;
                  return;
                }
                expect(likes).not.to.be.greaterThan(prev);
                prev = likes;
              });
          });
        });
      });
    });
  });
});
