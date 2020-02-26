import chai from 'chai';
import request from 'supertest';
import app from '../index';

chai.should();

describe('User resolver', () => {
  it('Should get users', (done) => {
    request(app).post('/graphql')
      .send({ query: '{ users{ id firstName lastName email }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.users.should.be.an('array');
        done();
      });
  });

  it('Should create a user', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{ createUser(firstName:"Joseph", lastName:"Joe", email:"test@test.com", password:"password"){id firstName lastName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.createUser.should.be.an('object');
        done();
      });
  });

  it('Should login a user', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{loginUser(email:"test@test.com", password:"password"){message email token}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.loginUser.should.be.an('object');
        res.body.data.loginUser.email.should.equal('test@test.com');
        done();
      });
  });

  it('Should reset password', (done) => {
    request(app).post('/graphql')
      .send({ query: '{passwordReset(email:"test@test.com"){email}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.passwordReset.should.have.property('email');
        res.body.data.passwordReset.email.should.equal('test@test.com');
        done();
      });
  });
});
