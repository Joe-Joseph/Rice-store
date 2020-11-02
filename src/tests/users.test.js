import chai from 'chai';
import request from 'supertest';
import app from '../index';

chai.should();

describe('User resolver', () => {
  it('Should get users', (done) => {
    request(app).post('/graphql')
      .send({ query: '{ users{ id firstName lastName username }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.users.should.be.an('array');
        done();
      });
  });

  it('Should create a user', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{ createUser(firstName:"Joseph", lastName:"Joe", username:"test", password:"password"){id firstName lastName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.createUser.should.be.an('object');
        done();
      });
  });

  it('Should login a user', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{loginUser(username:"test", password:"password"){message username token}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.loginUser.should.be.an('object');
        res.body.data.loginUser.username.should.equal('test');
        done();
      });
  });

  it('Should reset password', (done) => {
    request(app).post('/graphql')
      .send({ query: '{passwordReset(username:"test"){username}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.passwordReset.should.have.property('username');
        res.body.data.passwordReset.username.should.equal('test');
        done();
      });
  });
});
