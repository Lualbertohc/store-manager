const connection = require('./connection');

const create = async ({ productId, quantity }) => {
  const query = 'INSERT INTO sales_products (product_id, quantity) VALUES(?, ?)';
  const [newPost] = await connection.execute(query, [productId, quantity]);
  return newPost.insertId;
};

// const getAll = async () => {
//   const query = 'SELECT * FROM sales';
//   const [sales] = await connection.execute(query);
//   return sales;
// };

// const getById = async (id) => {
//   const query = 'SELECT * FROM sales WHERE id = ?';
//   const [[sales]] = await connection.execute(query, [id]);
//   return sales;
// };

module.exports = {
  create,
  // getAll,
  // getById,
};