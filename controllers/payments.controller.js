const path = require('path');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const public_key=process.env.STRIPE_PUBLIC_KEY;
const secret_key=process.env.STRIPE_SECRET_KEY;


exports.getPayments= (req, res) => {
  res.render(path.join(__dirname, '../views/payments/payments.ejs'), {key:public_key});
}


exports.postPayments= async (req, res) => {
    try {
      const {price,items} = req.body;
      const amount=(price*100);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name:items,
              },
              unit_amount:amount, // Amount in cents (7000 = $70.00)
            },
            quantity: 1,
          },
        ],
        metadata: {items },
        mode: "payment",
        success_url: "https://tmdevo.onrender.com/payments/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://tmdevo.onrender.com/payments/cancel",
      });
  
      res.json({ id: session.id }); // Return the session ID to the client
     console.log( `sessionid:${session.id}` ) // Return the session ID to the client
    } catch (error) {
      console.error("Error creating Checkout Session:", error);
      res.status(500).send("Internal Server Error");
    }
  };






  exports.getSuccess = async (req, res) => {
    const session_id = req.query.session_id;
  
    try {
      // Retrieve the session object
      const session = await stripe.checkout.sessions.retrieve(session_id);
  
      // Retrieve the payment intent (optional, for additional details)
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
  
      // Extract customer details
      const customerDetails = session.customer_details;
  
      const paymentDetails = {
        transactionId: paymentIntent.id,
        amount: (paymentIntent.amount_received / 100).toFixed(2),
        currency: paymentIntent.currency,
        name: customerDetails.name || "N/A", // Customer's name
        email: customerDetails.email || "N/A", // Customer's email
        time: new Date(paymentIntent.created * 1000).toLocaleString(), // Payment time
        itemName: session.metadata?.items || "N/A", // Optional metadata
      };
  
      // Render the success page with payment details
      res.render(path.join(__dirname, '../views/payments/success.ejs'), { paymentDetails });
    } catch (error) {
      console.error("Error retrieving payment details:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  



exports.getCancel= (req, res) => {
    res.sendFile(path.join(__dirname, '../views/payments/cancel.html'));
    }