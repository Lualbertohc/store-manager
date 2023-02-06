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

describe('Teste na controller', function () {
  describe('Teste na listagem de products', function () {

    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar um status 200 com os produtos', async function () {
      sinon.stub(productService, 'getAll').resolves(products)

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(products);
    });
  });

  describe('Teste na listagem de products por id', function () {

    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar um status 404 com uma mensagem de erro', async function () {

      req.params = { id: 7 };

      sinon.stub(productService, 'getById').resolves({ message: 'Product not found' });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
    });

    it('deve retornar um status 200 com os produtos por id', async function () {

      req.params = { id: 4 };

      sinon.stub(productService, 'getById').resolves(products[0]);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(products[0]);
    });
  });

  describe('Teste na criação de um produto', function () {

    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar um status 200', async function () {

      req.body = { name: 'Azura Star' };
     
      const productId = { id: 1, ...req.body };

      sinon.stub(productService, 'create').resolves(productId);

      await productsController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithExactly(productId);
    });
  });
});
