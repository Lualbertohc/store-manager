const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const create = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES(?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const update = async (id, name) => {
  const queryUpdateName = 'UPDATE products SET name = ? WHERE id = ?';

  await connection.execute(queryUpdateName, [name, id]);

  const query = 'SELECT * FROM products WHERE id = ?';

  const [updated] = await connection.execute(query, [id]);
  return updated[0];
};

const getProduct = async (id) => {
  const getProductQuery = 'SELECT * FROM products WHERE id = ?';
  const [get] = await connection.execute(getProductQuery, [id]);

  if (!get || get.length === 0 || get === undefined) {
    const message = { message: 'Product not found' };
    return message;
  }
  return 'ok';
};

const del = async (id) => {
  const get = await getProduct(id);
  if (get.message) return get;

  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
  return 'deleted';
};

const getByName = async (q) => {
  const query = 'SELECT * FROM products WHERE name LIKE ?';
  const [getReturn] = await connection.execute(query, [`%${q}%`]);
  return camelize(getReturn);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  getByName,
};