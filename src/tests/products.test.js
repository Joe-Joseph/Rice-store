import chai from 'chai';
import request from 'supertest';
import app from '../index';

chai.should();

let token;

describe('Products', () => {
  it('Should create a user', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{ createUser(firstName:"Joseph", lastName:"Joe", email:"test2@test.com", password:"password"){id firstName lastName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.createUser.should.be.an('object');
        done();
      });
  });

  it('Should login a user', (done) => {
    request(app).post('/graphql')
      .send({ query: '{loginUser(email:"test2@test.com", password:"password"){message email token}}' })
      .expect(200)
      .end((err, res) => {
        token = res.body.data.loginUser.token;
        res.body.data.loginUser.should.be.an('object');
        res.body.data.loginUser.email.should.equal('test2@test.com');
        done();
      });
  });

  it('Should create round', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: 'mutation{ registerRound(driverName:"Kazungu", carPlate:"RAD-456"){roundId carPlate driverName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.registerRound.driverName.should.equal('Kazungu');
        done();
      });
  });

  it('Should register a product', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: 'mutation{ registerProduct(productName:"Rice", bagSize:25, addedQuantity:50){roundId employee productName bagSize addedQuantity currentQuantity totalBags}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.registerProduct.should.be.an('object');
        res.body.data.registerProduct.productName.should.equal('Rice');

        done();
      });
  });

  it('Should get transactions for current round', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: '{getTransactionsByRound{productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.getTransactionsByRound.should.be.an('array');
        done();
      });
  });

  it('Should send error message when transction id is not found', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: '{ getOneTransaction(transactionId: 20){ roundId productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt }}' })
      .expect(200)
      .end((err, res) => {
        res.body.errors.should.be.an('array');

        done();
      });
  });

  it('Should get transaction by id', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: '{ getOneTransaction(transactionId: 1){ roundId productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.getOneTransaction.should.be.an('object');
        res.body.data.getOneTransaction.should.have.property('currentQuantity');

        done();
      });
  });
});
