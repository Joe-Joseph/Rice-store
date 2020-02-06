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
});
