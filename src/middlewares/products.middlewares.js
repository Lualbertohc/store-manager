const verifyName = (name) => {
  if (!name || name.length === 0) {
    const message = { message: '"name" is required' };
    return message;
  }
  if (name.length < 5) {
    const message = { message: '"name" length must be at least 5 characters long' };
    return message;
  }

  return 'ok';
};

module.exports = {
  verifyName,
};