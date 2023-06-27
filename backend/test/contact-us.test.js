/* eslint-disable no-shadow */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

const should = chai.should();
const email = 'dhrumit.soni@horsella.com';
const password = 'Passw0rd';
let token;

describe('Contact Queries', () => {
  it('it should login and get all the contact us queries', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({ email, password })
      .then((resp) => {
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        resp.body.data.should.have.property('token');
        token = resp.body.data.token;

        chai.request(server)
          .get('/api/contact-us/all')
          .set({ Authorization: `Bearer ${token}` })
          .then((resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.data.should.be.a('array');
          });
      })
      .catch((err) => {
        console.error('Getting all queries', err);
      });
    done();
  });

  it('it should login and post a query', (done) => {
    const query = {
      userName: 'Dhrumit Soni',
      email: 'dhrumit.soni.99@yahoo.com',
      subject: 'This query is submitted by running tests',
      message: 'This message is is written inside tests',
    };

    chai.request(server)
      .post('/api/contact-us/add')
      .set({ Authorization: `Bearer ${token}` })
      .send(query)
      .then((resp) => {
        resp.should.have.status(201);
        resp.body.should.be.a('object');
        resp.body.data.should.be.a('object');
        resp.body.data.should.have.property('user_name');
        resp.body.data.should.have.property('email');
        resp.body.data.should.have.property('subject');
        resp.body.data.should.have.property('message');
      })
      .catch((err) => {
        console.error('Posting a query', err);
      });
    done();
  });
});
