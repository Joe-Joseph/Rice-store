import chai from 'chai';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../index';

chai.should();
dotenv.config();

describe('Products', () => {
  it('Should create round', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ registerRound(driverName:"Kazungu", carPlate:"RAD-457"){roundId carPlate driverName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.registerRound.driverName.should.equal('Kazungu');
        done();
      });
  });

  it('Should register a product', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
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
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: '{getTransactionsByRound{productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.getTransactionsByRound.should.be.an('array');
        done();
      });
  });

  it('Should send error message when transction id is not found', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: '{ getOneTransaction(transactionId: 20){ roundId productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt }}' })
      .expect(200)
      .end((err, res) => {
        res.body.errors.should.be.an('array');

        done();
      });
  });

  it('Should get transaction by id', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: '{ getOneTransaction(transactionId: 1){ roundId productName bagSize oneBagCost addedQuantity currentQuantity transactionType totalCost totalBags createdAt }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.getOneTransaction.should.be.an('object');
        res.body.data.getOneTransaction.should.have.property('currentQuantity');

        done();
      });
  });

  it('Should update transaction', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ updateTransaction(transactionId: 1, productName: "Rice", bagSize: 20, addedQuantity: 200){roundId employee productName bagSize addedQuantity currentQuantity totalBags}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.updateTransaction.should.be.have.property('productName');

        done();
      });
  });

  it('Should Delete Transaction', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ deleteTransaction(transactionId: 1){ message }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.deleteTransaction.message.should.equal('Transaction deleted successfuly');
        done();
      });
  });
});
