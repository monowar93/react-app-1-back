const path = require('path');

exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/form.html'));
};

exports.postRegister = (req, res) => {
  // Access form data via req.body
  console.log(req.body);

  res.send('Form submitted successfully!');
};
