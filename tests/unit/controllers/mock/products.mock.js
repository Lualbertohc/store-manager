const products = [
  {
    id: 1,
    name: 'Mjolnir',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const azuraProduct = { name: 'Azura Star' };
const mephalaProduct = { name: 'Ebony Blade' };
const boethiaProductShadow = { status: null, message: { id: 4, name: 'ebony mail' }} 
const azuraProductShadow = { status: null, message: { id: 5, name: 'Azura Star' }}
const mephalaProductShadow = { status: null, message: '"name" length must be at least 5 characters long' }
const notFound = {
  status: 'PRODUCT_NOT_FOUND',
  message: 'Product not found'
};

module.exports = {
  products, azuraProduct, mephalaProduct, boethiaProductShadow, azuraProductShadow,
  mephalaProductShadow, notFound
};



