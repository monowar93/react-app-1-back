const nodemailer = require('nodemailer');
require('dotenv').config();

let contactData;

//for EMAIL SENDING NODEMAILER

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
});

//post CONTACT

exports.postContact = (req, res) => {
  contactData = req.body;
  console.log(contactData);
  //   res.send('Contact Form submitted successfully!');

  //for email
  const { name, email, phoneNumber, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_SENDER, // Sender address
    to: process.env.EMAIL_RECEIVER, // Recipient address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone-number :${phoneNumber}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error while sending email:', error); // Log error to console
      return res
        .status(500)
        .send('Error while sending email: ' + error.message); // Send error response to client
    }

    res.status(200).send('Email sent: ' + info.response);
  });
};

//get CONTACT

exports.getContact = (req, res) => {
  res.send(contactData);
};
