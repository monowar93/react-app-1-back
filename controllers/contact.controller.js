let contactData;

//post CONTACT

exports.postContact = (req, res) => {
  contactData = req.body;
  console.log(contactData);

  res.send('Contact Form submitted successfully!');
};

//get CONTACT

exports.getContact = (req, res) => {
  res.send(contactData);
};
