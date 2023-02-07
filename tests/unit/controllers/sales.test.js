const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/salesService');
const salesMock = require('./mock/sales.mock');
const salesModel = require('../../../src/models/salesModel');

describe('Service de sales', function () {
  describe('Listar todos as vendas', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna todas as vedas', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesMock.sales)

      const sales = await salesService.getAll();

      expect(sales).to.be.deep.equal(salesMock.sales);
    });
  });

  describe('Listar vendas por id', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna vedas por id', async function () {

      const saleId = [
        {
          "date": "2023-02-06T14:34:09.000Z",
          "productId": undefined,
          "quantity": 5
        },
        {
          "date": "2023-02-06T14:34:09.000Z",
          "productId": undefined,
          "quantity": 10
        }
      ]

      sinon.stub(salesModel, 'getById').resolves(saleId)

      const sales = await salesService.getById(1);

      expect(sales).to.be.deep.equal(saleId);
    });

    it('Caso de erro', async function () {

      const saleId = 1;

      sinon.stub(salesModel, 'getById').resolves(undefined)

      const sales = await salesService.getById(saleId);

      expect(sales).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('excluí vendas do banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Caso de erro', async function () {

      const deletId = 4;

      sinon.stub(salesModel, 'getById').resolves({});
      sinon.stub(salesModel, 'del').resolves(undefined);

      const sales = await salesService.del(deletId);

      expect(sales).to.be.undefined;
    });
  });

  describe('Atuzalizar banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Primeiro caso de erro', async function () {

      const sale = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]

      const saleId = 5;

      sinon.stub(salesModel, 'getById').resolves(undefined);
      sinon.stub(salesModel, 'update').resolves(saleId, sale);

      const sales = await salesService.del(saleId);

      expect(sales).to.be.deep.equal({ message: 'Sale not found' });
    });

    it('Banco atualizado', async function () {

      const sale = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]

      const saleId = 5;

      const updated = {
        "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };

      sinon.stub(salesModel, 'getById').resolves(true);
      sinon.stub(salesService, 'update').resolves(updated);

      const sales = await salesService.update(saleId);

      expect(sales).to.be.deep.equal(updated);
    });
    
    describe('cria uma venda no banco de dados', function () {

      afterEach(() => {
        sinon.restore();
      });

      it('Venda criada', async function () {

        const saleId = 2;

        sinon.stub(salesModel, 'createProductSale').resolves(saleId);

        const sales = await salesService.create(salesMock.newSale);

        expect(sales).to.be.deep.equal({ status: null, message: 2 });
      });
    });

  });
});