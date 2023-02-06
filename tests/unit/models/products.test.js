const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const connection = require("../../../src/models/connection");
const productModel = require('../../../src/models/productsModel');
const productMock = require('./mock/products.mock');

describe('Model de products', function () {
  describe('Listar todos os produtos', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productMock.products])

      const products = await productModel.getAll();

      expect(products).to.be.deep.equal(productMock.products);
    });
  });

  describe('Listar produtos por id', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna todos o produtos pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock.products[3]]])

      const products = await productModel.getById(4);

      expect(products).to.be.deep.equal(productMock.products[3]);
    });
  });

  describe('Adiciona um novo produto ao banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna o produto adicionado', async function () {

      const newProduct = { name: 'Ebony Blade'} 
        
      sinon.stub(connection, 'execute').resolves([{ insertId: 4}])

      const products = await productModel.create(newProduct);

      expect(products).to.be.deep.equal(4);
    });
  });

  describe('excluí produtos do banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna "deleted"', async function () {

      const deletId = 4;

      sinon.stub(connection, 'execute').resolves([{ delete: 1 }])

      const products = await productModel.update(deletId);

      expect(products).to.be.undefined;
    });
  });
});