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

const getSale = async (id) => {
  const getProductQuery = 'SELECT * FROM sales WHERE id = ?';
  const [get] = await connection.execute(getProductQuery, [id]);

  if (!get || get.length === 0 || get === undefined) {
    const message = { message: 'Sale not found' };
    return message;
  }
  return 'ok';
};

const del = async (id) => {
  const get = await getSale(id);
  if (get.message) return get;

  const querySales = 'DELETE FROM sales WHERE id = ?';
  const querySalesProduct = 'DELETE FROM sales_products WHERE sale_id = ?';

  await connection.execute(querySales, [id]);
  await connection.execute(querySalesProduct, [id]);

  return 'deleted';
};

// const objMaker = (id, p, q) => {
//   const obj = {
//     saleId: id,
//     itemsUpdated: [
//       {
//         productId: p,
//         quantity: q,
//       },
//       {
//         productId: p,
//         quantity: q,
//       },
//     ],
//   };
//   return obj;
// };

// const update = async (id, productId, quantity) => {
//   const get = await getSale(id);
//   if (get.message) return get;

//   const querySalesProductId = 'UPDATE sales_products SET product_id = ? WHERE sale_id = ?';
//   const queryQuantity = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ?';

//   await connection.execute(querySalesProductId, [productId, id]);
//   await connection.execute(queryQuantity, [quantity, id]);

//   const obj = objMaker(id, productId, quantity);
//   return obj;
// };

const update = async (id, arr) => {
  const getProductQuery = 'SELECT * FROM sales WHERE id = ?';
  const [get] = await connection.execute(getProductQuery, [id]);
  if (!get || get.length === 0 || get === undefined) {
    return { status: 422, message: 'Sale not found' };
  }

  Promise.all(arr
    .map(async (e) => {
      // await connection.execute(
      //   'UPDATE sales_products SET product_id = ? WHERE sale_id = ?',
      //   [e.productId, e.id],
      // );
      //   await connection.execute(
      //   'UPDATE sales_products SET quantity = ? WHERE sale_id = ?',
      //   [e.quantity, e.id],
      // );
      await connection
        .execute('UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
          [e.id, e.quantity, e.productId]);
    }));

  return {
    saleId: id,
    itemsUpdated: arr,
  };
};

module.exports = {
  createProductSale,
  getAll,
  getById,
  del,
  update,
};