const verifyAtributtes = (req, res, next) => {
  const arr = req.body;

  const verifyProductId = arr.every((e) => e.productId);
  const verifyQuantity = arr.every((e) => e.quantity || e.quantity === 0);

  if (!verifyProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!verifyQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
  verifyAtributtes,
};