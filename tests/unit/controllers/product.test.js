const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const productsController = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/ProductsService');
const {
  products, azuraProduct, mephalaProduct, boethiaProductShadow, azuraProductShadow,
  mephalaProductShadow, notFound
} = require('./mock/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste na rota products', function () {
  afterEach(function () {
    sinon.restore();
  })
})

describe('Teste na listagem de products', function () {
  it('status 200', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(products)
  })
})