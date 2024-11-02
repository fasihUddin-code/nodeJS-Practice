const { Task } = require("../model/task");
const model = require("../model/user");
const User = model.User;

//Create User
exports.createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((doc) => {
      console.log({ doc });
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).json({ error: err });
    });
};

//Read All Users
exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

//Read Specific User
exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).exec();
  console.log(user);
  res.status(200).json(user);
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { address } = req.body;

  if (address === undefined) {
    return res.status(400).json({ error: "address Field is required" });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    //console.log(user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({_id:id})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error:'Bad Request client error'})
  }
};
