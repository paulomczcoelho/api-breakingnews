import userServices from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const user = await userServices.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating User" });
    }

    res.status(201).send({
      message: "User created sucessfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        // password,
        avatar,
        background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userServices.findAllService();

    if (users.lenght === 0) {
      return res
        .status(400)
        .send({ message: "There aren't any registered users " });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res
        .status(400)
        .send({ message: "Submit at çeast one fields for update" });
    }

    const { id, user } = req;

    await userServices.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );
    res.send({ message: "User sucessfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.merrsage });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req;

    await userServices.deleteService(id);

    res.send({ message: "User successfully deleted!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update, deleteUser };
