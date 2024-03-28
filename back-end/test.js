const app = require('./App.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("/GET profile info", () => {
    it("should GET profile information", (done) => {
      chai.request(app)
      .get('/profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    })
});

describe("/POST Survey data", () => {
    it("should acknowledge successful POSt requests to the survey", (done) => {
       const testSurvey = {
            petsPreference: 'yes',
            guestPreference: 'no',
            minRent: 900,
            maxRent: 1500,
            desiredRoommates: 1,
            bedtime: '3am'
       }
       chai.request(app)
       .post('/survey')
       .send(testSurvey)
       .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('object');
         //this will need to be updated if the survey route returns anything
         done();
       });
    });
})

describe("/GET Chat list info", () => {
    it("should GET an array of all currently active chats", (done) => {
        
    });
})