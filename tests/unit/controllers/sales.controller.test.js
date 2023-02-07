const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const { newSale } = require('./mock/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste sales na controller', function () {
  describe('Teste na listagem de vendas', function () {

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
      sinon.stub(salesService, 'getAll').resolves(newSale)

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(newSale);
    });
  });

  describe('Teste de vendas por id', function () {

    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    // it('deve retornar um status 404 com uma mensagem de erro', async function () {

    //   req.params = { id: 7 };

    //   sinon.stub(salesService, 'getById').resolves({ message: 'Product not found' });

    //   await salesController.getById(req, res);

    //   expect(res.status).to.have.been.calledWith(404);
    //   expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
    // });

    it('deve retornar um status 200 com os produtos por id', async function () {

      req.params = { id: 4 };

      const sale = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]

      sinon.stub(salesService, 'getById').resolves(sale);

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(sale);
    });
  });

  describe('Teste na criação de uma venda', function () {

    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('deve retornar um status 201', async function () {

      req.body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      sinon.stub(salesService, 'create').resolves(req.body);

      await salesController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithExactly(req.body);
    });
  });
});
