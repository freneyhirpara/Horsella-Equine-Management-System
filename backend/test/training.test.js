/* eslint-disable no-shadow */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

const should = chai.should();
let token;
let id;

describe('Training Centers', () => {
  it('it should log in and get all the training centers', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({ email: 'dhrumit.soni@horsella.com', password: 'Passw0rd' })
      .then((resp) => {
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        resp.body.data.should.have.property('token');
        token = resp.body.data.token;

        chai.request(server)
          .get('/api/training-center/all')
          .set({ Authorization: `Bearer ${token}` })
          .then((resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.data.should.be.a('array');
            resp.body.data.length.should.not.be.null();
            id = resp.body.data[0].id;
          });
      })
      .catch((err) => {
        console.error('Getting all training centers', err);
      });
    done();
  });

  it('it should log in and get training center by id', (done) => {
    chai.request(server)
      .get('/api/training-center/')
      .set({ Authorization: `Bearer ${token}` })
      .then((resp) => {
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.data.should.be.a('object');
        resp.body.data.should.have.property('center_name');
        resp.body.data.should.have.property('description');
        resp.body.data.should.have.property('owner_name');
        resp.body.data.should.have.property('experience');
        resp.body.data.should.have.property('address');
        resp.body.data.should.have.property('working_hours');
      })
      .catch((err) => {
        console.error('Getting training center by id', err);
      });
    done();
  });
});
