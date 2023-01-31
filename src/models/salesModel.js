const connection = require('./connection');

const createProductSale = async (salesArr) => {
  const queryId = 'INSERT INTO sales (date) VALUES(NOW())';
  const [{ insertId }] = await connection.execute(queryId);

   Promise.all(salesArr
     .map(async (e) => {
       await connection.execute(
         'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
         [insertId, e.productId, e.quantity],
       );
    }));
  return {
    id: insertId,
    itemsSold: salesArr,
  };
};

// const getAll = async () => {
//   const query = 'SELECT * FROM sales_products';
//   const [sales] = await connection.execute(query);
//   return sales;
// };

// const getById = async (id) => {
//   const query = 'SELECT * FROM sales WHERE id = ?';
//   const [[sales]] = await connection.execute(query, [id]);
//   return sales;
// };

module.exports = {
  createProductSale,
  // createSale,
  // getAll,
  // getById,
};