const create = () => {
  res.send(201);
};

const findAll = (req, res) => {
  const news = [];
  res.send(news);
};

export default { create, findAll, findById, update };
