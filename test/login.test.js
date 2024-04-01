const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../back-end/App.js'); 

chai.use(chaiHttp);

describe('Login', () => {
  // Test successful login for BobbyImpasto
  it('should log in a user with the correct credentials', done => {
    chai.request(app)
      .post('/login')
      .send({'username': 'john123', 'password': 'qwerasdf'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Login successful');
        done();
      });
  });

  // Test failed login for wrong password
  it('should not log in a user with incorrect credentials', done => {
    chai.request(app)
      .post('/login')
      .send({'username': 'john123', 'password': 'incorrectPassword'})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').eql('Invalid username or password');
        done();
      });
  });
});
