const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const connection = require("../../../src/models/connection");
const salesModel = require('../../../src/models/salesModel');
const salesMock = require('./mock/sales.mock');

describe('Model de sales', function () {
  describe('Listar todos as vendas', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna todas as vedas', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.sales])

      const sales = await salesModel.getAll();

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

      sinon.stub(connection, 'execute').resolves([saleId])

      const sales = await salesModel.getById(2);

      expect(sales).to.be.deep.equal(saleId);
    });
  });

  describe('excluí vendas do banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna "deleted"', async function () {

      const deletId = 4;

      sinon.stub(connection, 'execute').resolves([{ delete: 1 }])

      const products = await salesModel.del(deletId);

      expect(products).to.be.deep.equal("deleted");
    });
  });
});