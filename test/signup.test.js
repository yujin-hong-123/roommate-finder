const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../back-end/App.js'); // Replace with the correct path to your Express app

chai.use(chaiHttp);

describe('Signup', () => {
  // Test successful signup
  it('should register a new user', done => {
    chai.request(app)
      .post('/signup')
      .send({
        'username': 'newUser123',
        'password': 'NewPass123!'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Signup successful.');
        done();
      });
  });

  // Test signup with existing username
  it('should not register a user with an existing username', done => {
    chai.request(app)
      .post('/signup')
      .send({
        'username': 'john123', // Assuming john123 is already in the mockDatabase.json
        'password': 'SomePass123!'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('Username already exists.');
        done();
      });
  });
});
