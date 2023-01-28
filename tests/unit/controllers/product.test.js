const sinon = require('sinon');
const { expect } = require('chai');

const model = require('../../../src/models/productsModel');
const service = require('../../../src/services/ProductsService');
const controller = require('../../../src/controllers/productsController');

const products = [
  {
    "id": 1,
    "name": "productX",
  },
  {
    "id": 2,
    "name": "productY",
  }
]

describe('camada controller de products', () => {
  describe('teste para GET', () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().return(res);
      res.send = sinon.stub().return();
      sinon.stub(model, 'getAll').resolves(products)
    })
  })
})

after(() => {
  model.getAll.restore();
})

it('status 200 para tudo certo', async () => {
  await controller.getAll(req, res);
  expect(res.status.calledWidth(200).to.be.equal(true));
})