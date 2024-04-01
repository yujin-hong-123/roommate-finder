const app = require('./App.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { ChildProcess } = require('child_process');

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
    it("json file should have all profile information fields", (done) => {
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
            });
    });
    it("all fields in the profile json file should have the correct data types", (done) => {
        chai.request(app)
            .get('/profile')
            .end((err, res) => {
                res.body.bio.should.be.a('string');
                res.body.user_id.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.pets.should.be.a('string');
                res.body.guests.should.be.a('string');
                res.body.rent_max.should.be.a('number');
                res.body.rent_min.should.be.a('number');
                res.body.bedtime.should.be.a('string');
                done();
            });
    });
});

describe("/GET my Preferences info", () => {
    it("should successfully GET a json file with preferences info", (done) => {
        chai.request(app)
            .get('/mypreferences')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it("json file should have all of the expected preferences fields", (done) => {
        chai.request(app)
            .get('/mypreferences')
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
                res.body.should.have.property('roommates');
                done();
            });
    });
    it("all fields in the preferences json file should have the correct data types", (done) => {
        chai.request(app)
            .get('/mypreferences')
            .end((err, res) => {
                res.body.bio.should.be.a('string');
                res.body.imagePath.should.be.a('string');
                res.body.user_id.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.pets.should.be.a('string');
                res.body.guests.should.be.a('string');
                res.body.rent_max.should.be.a('number');
                res.body.rent_min.should.be.a('number');
                res.body.bedtime.should.be.a('string');
                res.body.roommates.should.be.a('number');
                done();
            });
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
    it("the matches array should not be empty", (done) => {
        chai.request(app)
            .get('/matches')
            .end((err, res) => {
                res.body.should.not.be.empty;
                done();
            })
    })
});

//this will definitly need more unit tests in the future
describe("/POST updates to user profile info", () => {
    it("should acknowledge successful POST requests to edit profile", (done) => {
        const testProfile = {
            new_password: 'password10',
            new_username: 'Computer',
            old_password: 'password7',
            new_bio: 'hello world :)'
        }
        chai.request(app)
            .post('/editprofile')
            .send(testProfile)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

//NOTE: Eventually this test should be changed to send something other than the current old_password (which will not always be password7)-bobby
describe("/POST updates to user profile info with INCORRECT old password (not password7)", () => {
    it("should return status 400 when old password is incorrect", (done) => {
        const testProfile2 = {
            new_password: 'password10',
            new_username: 'Computer',
            old_password: 'invalid_password',
            new_bio: 'hello world :)'
        }
        chai.request(app)
            .post('/editprofile')
            .send(testProfile2)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});