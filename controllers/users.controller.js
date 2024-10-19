const path = require('path');
let { usersAll } = require('../models/users.models');
const { v4: uuidv4 } = require('uuid');

//users GET
exports.getUsers = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/users.html'));
};

//users POST
exports.postUsers = (req, res) => {
  const { name, age } = req.body;
  const id = uuidv4();
  usersAll.push({ id: uuidv4(), name: name, age: age });
  res.send(usersAll);
  console.log(usersAll, req.body, name, age);
};

//users PUT

exports.putUsers = (req, res) => {
  const userId = req.params.id;
  const { name, age } = req.body;

  usersAll
    .filter((user) => user.id === userId) // Return the user where id matches
    .map((selectedUser) => {
      selectedUser.name = name;
      selectedUser.age = age;
    });

  res.send(usersAll);
};

// user DELETE

exports.deleteUsers = (req, res) => {
  const userId = req.params.id;
  const updateUsers = usersAll.filter((user) => user.id !== userId);
  usersAll = updateUsers;
  res.send(usersAll);
};
