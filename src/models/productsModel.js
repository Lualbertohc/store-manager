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

module.exports = {
  getAll,
  getById,
  create,
};