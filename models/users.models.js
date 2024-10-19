const { v4: uuidv4 } = require('uuid');

const usersAll = [
  { id: uuidv4(), name: 'Tarek', age: 24 },
  { id: uuidv4(), name: 'Mahi', age: 20 },
];

module.exports = { usersAll };
