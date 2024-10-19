const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config();

let contactData;

// For EMAIL SENDING NODEMAILER
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
});

// Post CONTACT
exports.postContact = async (req, res) => {
  contactData = req.body;
  console.log(contactData);

  // For Admin Email
  const { name, email, phoneNumber, message } = req.body;

  const adminMailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
  };

  const userMailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Thank you for your submission',
    text: `Dear ${name},

Thank you for reaching out to us! We appreciate your submission and want to assure you that we will review your message carefully. 

Our team is dedicated to providing you with the best possible service, and we will get back to you shortly with a response. In the meantime, if you have any further questions or need immediate assistance, please feel free to reach out.

Thank you once again for contacting us. We look forward to assisting you!

Best regards,

TAREK MONOWAR `,
  };

  // Respond immediately to the client
  res.sendFile(path.join(__dirname, '../views/response.html'));

  try {
    // Send emails in the background
    await transporter.sendMail(adminMailOptions);
    console.log('Email sent to ADMIN');

    await transporter.sendMail(userMailOptions);
    console.log('Email sent to USER');
  } catch (error) {
    console.error('Error while sending email:', error);
    // You may want to log this error or handle it in a specific way
  }
};

// Get CONTACT
exports.getContact = (req, res) => {
  res.send(contactData);
};
