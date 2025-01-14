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
      const {price,items,quantity} = req.body;
      // const amount=(price*100);
      const cartItems = [
        { name: items, price: price, quantity: quantity }, // $50.00 x 2
        { name: "books", price: 3000, quantity: 7 }, // $30.00 x 1
        { name: "jumper", price: 3000, quantity: 4 }, // $30.00 x 1
        { name: "phone", price: 2600, quantity: 2 }, // $30.00 x 1
        { name: "laptop", price: 3600, quantity: 6 }, // $30.00 x 1
      ];
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map(item => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convert to cents
          },
          quantity: item.quantity,
        })),
        metadata: { cartItems: JSON.stringify(cartItems) },
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

      // Parse cart items from metadata
    let cartItems = [];
    if (session.metadata?.cartItems) {
      try {
        cartItems = JSON.parse(session.metadata.cartItems); // Parse JSON string to array
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }

    // Extract product names (or other details) for rendering
    const productNames = cartItems.map(item => `${item.name} (x${item.quantity})`).join(", ");
  
      const paymentDetails = {
        transactionId: paymentIntent.id,
        amount: (paymentIntent.amount_received / 100).toFixed(2),
        currency: paymentIntent.currency,
        name: customerDetails.name || "N/A", // Customer's name
        email: customerDetails.email || "N/A", // Customer's email
        time: new Date(paymentIntent.created * 1000).toLocaleString(),
        sellerName: "Tarek Monowar", 
        sellerEmail:"tarekmonowar2332@gmail.com",
        itemName:  productNames || "N/A",
        cartItems,  // Optional metadata
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