// Import the necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../back-end/App'); // Adjust the path as needed
const should = chai.should();

chai.use(chaiHttp);

// Test for Profile Endpoints
describe('Profile Endpoints', () => {
  let token;

  // Before running profile tests, log in to get a token
  before((done) => {
    chai.request(server)
      .post('/login')
      .send({
        username: "existingUser",
        password: "Password123!"
      })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  // Test the GET /profile endpoint
  describe('GET /profile', () => {
    it('it should GET the user profile', (done) => {
      chai.request(server)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('bio');
          done();
        });
    });
  });

  // Test the POST /editprofile endpoint
  describe('POST /editprofile', () => {
    it('it should UPDATE the user profile', (done) => {
      let updatedInfo = {
        bio: "Updated bio information here.",
        pets: "yes"
      };
      chai.request(server)
        .post('/editprofile')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedInfo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Profile updated successfully.');
          done();
        });
    });

    it('it should not UPDATE the profile if old password is incorrect when changing password', (done) => {
      let updateRequest = {
        old_password: "wrongPassword123!",
        new_password: "newSafePassword123!"
      };
      chai.request(server)
        .post('/editprofile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Old password does not match.');
          done();
        });
    });
  });
});
