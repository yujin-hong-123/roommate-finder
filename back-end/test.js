const app = require('./App.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("/GET profile info", () => {
    it("should GET json with profile info", (done) => {
      chai.request(app)
      .get('/profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it("should GET json with all profile information fields", (done) => {
        chai.request(app)
        .get('/profile')
        .end((err, res) => {
            res.body.should.have.property('bio');
            res.body.should.have.property('imagePath');
            res.body.should.have.property('user_id');
            res.body.should.have.property('name');
            res.body.should.have.property('pets');
            res.body.should.have.property('guests');
            res.body.should.have.property('rent_max');
            res.body.should.have.property('rent_min');
            res.body.should.have.property('bedtime');
            done();
        })
    });
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
});

describe("/GET Chat list info", () => {
    it("should GET an array of all currently active chats", (done) => {
        chai.request(app)
        .get('/chatlist')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

describe("/GET Matches info", () => {
    it("should GET an array of all matches", (done) => {
        chai.request(app)
        .get('/matches')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});