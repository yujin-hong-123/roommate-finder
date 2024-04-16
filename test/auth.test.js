// Import the necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../back-end/App'); // Adjust the path according to your project structure
const should = chai.should();

chai.use(chaiHttp);

// Describe your tests
describe('Authentication', () => {
  // Test the Registration endpoint
  describe('/POST register', () => {
    it('it should register a user', (done) => {
      let user = {
        username: "testuser",
        password: "Password@123"
      }
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Signup successful.');
          res.body.should.have.property('token');
          done();
        });
    });

    it('it should not register a user with the username that already exists', (done) => {
      let user = {
        username: "testuser",
        password: "Password@123"
      }
      // Assuming "testuser" is already registered
      chai.request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Username already exists.');
          done();
        });
    });
  });

  // Test the Login endpoint
  describe('/POST login', () => {
    it('it should login a user and return a token', (done) => {
      let user = {
        username: "testuser",
        password: "Password@123"
      }
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Login successful');
          res.body.should.have.property('token');
          done();
        });
    });

    it('it should not login a user with wrong credentials', (done) => {
      let user = {
        username: "testuser",
        password: "WrongPassword"
      }
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid username or password');
          done();
        });
    });
  });
});
