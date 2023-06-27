const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

const should = chai.should();
let token;
let id;

chai.use(chaiHttp);

describe('Logging in', () => {
  it('it should log in', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({ email: 'dhrumit.soni@horsella.com', password: 'Passw0rd' })
      .then((resp) => {
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        resp.body.data.should.have.property('token');
        token = resp.body.data.token;
      })
      .catch((err) => {
        console.error('Logging in : ', err);
      });
    done();
  });
});

describe('Registering new User', () => {
  it('register a new user', (done) => {
    const newUser = {
      firstname: 'Johnny',
      lastname: 'Dooley',
      email: 'john.doe@email.com',
      role: '2',
      password: 'johnDoe@1234',
    };

    chai.request(server)
      .post('/api/user/register')
      .set({ Authorization: `Bearer ${token}` })
      .send(newUser)
      .then((resp) => {
        resp.should.have.status(400);
        resp.body.should.be.a('object');
        resp.body.error.should.have.property('message');
        resp.body.error.message.should.equal('User with this email already exists');
        // resp.body.data.should.have.property('id');
        // resp.body.data.should.have.property('name');
        // resp.body.data.should.have.property('email');
        // resp.body.data.should.have.property('role');
        // id = resp.body.data.id;
      })
      .catch((err) => {
        console.log('Registering User', err.message);
      });
    done();
  });
});

describe('Deleting a User', () => {
  it('deleting a user', (done) => {
    console.log(token);
    chai.request(server)
      .delete(`/api/user/delete/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .then((resp) => {
        resp.should.have.status(204);
      })
      .catch((err) => {
        console.log('Deleting User', err.message);
      });
    done();
  });
});
