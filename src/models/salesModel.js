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

const responseGetAll = (data) => data.map((e) => ({
  saleId: e.sale_id,
  date: e.date,
  productId: e.product_id,
  quantity: e.quantity,
}));

const getAll = async () => {
  const query = 'SELECT sale_id, date, product_id, quantity FROM sales';
  const [sales] = await connection
    .execute(`${query} INNER JOIN sales_products ON sales.id = sales_products.sale_id`);
  return responseGetAll(sales);
};

const responseId = (data) => data.map((e) => ({
  date: e.date,
  productId: e.product_id,
  quantity: e.quantity,
}));

const getById = async (id) => {
  const query = 'SELECT date, product_id, quantity FROM sales INNER JOIN sales_products';
  const [salesId] = await connection
    .execute(`${query} ON sales.id = sales_products.sale_id WHERE sales.id = ?`, [id]);
  return responseId(salesId);
};

module.exports = {
  createProductSale,
  getAll,
  getById,
};