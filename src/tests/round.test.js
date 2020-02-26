import chai from 'chai';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../index';

chai.should();
dotenv.config();

describe('Round resolvers', () => {
  it('Should create round', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ registerRound(driverName:"Kazungu", carPlate:"RAD-456"){roundId carPlate driverName}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.registerRound.driverName.should.equal('Kazungu');
        done();
      });
  });

  it('Should get all rounds', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: '{getAllRounds{roundId carPlate driverName createdAt}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.getAllRounds.should.be.an('array');

        done();
      });
  });

  it('Should not add a Product without logging in', (done) => {
    request(app).post('/graphql')
      .send({ query: 'mutation{ registerProduct(productName:"rice", bagSize:25, addedQuantity:20){roundId employee productName bagSize addedQuantity currentQuantity totalBags}}' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].statusCode.should.equal(401);
        done();
      });
  });

  it('Should add a Product', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ registerProduct(productName:"rice", bagSize:25, addedQuantity:20){roundId employee productName bagSize addedQuantity currentQuantity totalBags}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.registerProduct.bagSize.should.equal('25 kg');
        done();
      });
  });

  it('Should report sold Products', (done) => {
    request(app).post('/graphql')
      .set('Authorization', `Bearer ${process.env.token}`)
      .send({ query: 'mutation{ sellProduct(productName:"rice", bagSize:25, soldQuantity:20, oneBagCost:25000){roundId employee productName bagSize addedQuantity currentQuantity totalBags}}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.sellProduct.bagSize.should.equal('25kg');
        done();
      });
  });
});
