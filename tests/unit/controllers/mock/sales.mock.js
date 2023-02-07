const sales = [
  {
    "saleId": undefined,
    "date": "2023-02-06T14:34:09.000Z",
    "productId": undefined,
    "quantity": 5
  },
  {
    "saleId": undefined,
    "date": "2023-02-06T14:34:09.000Z",
    "productId": undefined,
    "quantity": 10
  },
  {
    "saleId": undefined,
    "date": "2023-02-06T14:34:09.000Z",
    "productId": undefined,
    "quantity": 15
  }
]

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const createReturn = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = { sales, newSale, createReturn };