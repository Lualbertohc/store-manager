const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');
const productService = require('../../../src/services/ProductsService');
const productMock = require('./mock/product.mock');
const productModel = require('../../../src/models/productsModel');

describe('Service de products', function () {
  describe('Listar todos os produtos', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('retorna todos os produtos', async function () {
      sinon.stub(productModel, 'getAll').resolves(productMock.products)

      const products = await productService.getAll();

      expect(products).to.be.deep.equal(productMock.products);
    });
  });

  describe('Listar produtos por id', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Caso de falha', async function () {

      const productId = 1;

      sinon.stub(productModel, 'getById').resolves(undefined);

      const products = await productService.getById(productId);

      expect(products).to.be.deep.equal({ message: 'Product not found' });
    });

    it('Caso de sucesso', async function () {

      const productId = 1;

      sinon.stub(productModel, 'getById').resolves(productMock.products[0]);

      const products = await productService.getById(productId);

      expect(products).to.be.deep.equal(productMock.products[0]);

    });
  });

  describe('Adiciona um novo produto ao banco de dados', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Caso de falha', async function () {

      const productId = 1;

      sinon.stub(productModel, 'getById').resolves(undefined);

      const products = await productService.getById(productId);

      expect(products).to.be.deep.equal({ message: 'Product not found' });
    });

    it('retorna o produto adicionado', async function () {

      const newProduct = { name: 'Ebony Blade' }

      const newId = 4;

      sinon.stub(productModel, 'create').resolves(newId)

      const products = await productModel.create(newProduct);

      expect(products).to.be.deep.equal(newId);
    });
  });

  describe('atualiza os produtos', function () {

    afterEach(() => {
      sinon.restore();
    });

    it('Caso de falha', async function () {

      const productId = 1;

      sinon.stub(productModel, 'getById').resolves(undefined);

      const products = await productService.update(productId);

      expect(products).to.be.deep.equal({ message: '\"name\" is required' });
    });
  });
});