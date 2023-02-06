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

  describe('excluí vendas do banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna "deleted"', async function () {

      const deletId = 4;

      sinon.stub(connection, 'execute').resolves([{ delete: 1 }])

      const products = await salesModel.update(deletId);

      expect(products).to.be.undefined;
    });
  });
});