const app = require('./App.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("/GET profile info", () => {
    it("it should GET profile information", (done) => {
      chai.request(app)
      .get('/profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    })
});
