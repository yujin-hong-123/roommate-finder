// Import the necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../back-end/App'); // Adjust the path according to your project structure
const expect = chai.expect;

chai.use(chaiHttp);

// Describe your tests for Authentication
describe('Authentication', () => {

  // Test the Registration endpoint
  describe('/POST register', () => {
    // Test for successful registration
    it('it should register a user', (done) => {
      let user = {
        username: "newTestUser",
        password: "Password@123"
      };
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').eql('Signup successful.');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    // Test for registration with an existing username
    it('it should not register a user with the username that already exists', (done) => {
      let user = {
        username: "newTestUser",
        password: "Password@123"
      };
      // Assuming "newTestUser" is already registered by the previous test
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').eql('Username already exists.');
          done();
        });
    });
  });

  // Test the Login endpoint
  describe('/POST login', () => {
    // Test for successful login
    it('it should login a user and return a token', (done) => {
      let user = {
        username: "newTestUser",
        password: "Password@123"
      };
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').eql('Login successful');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    // Test for login with incorrect credentials
    it('it should not login a user with wrong credentials', (done) => {
      let user = {
        username: "newTestUser",
        password: "WrongPassword"
      };
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').eql('Invalid username or password');
          done();
        });
    });
  });
});
