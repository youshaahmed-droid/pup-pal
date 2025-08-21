const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, email } = JSON.parse(event.body);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents ($92.44 = 9244)
      currency: 'usd',
      receipt_email: email,
      metadata: {
        product: 'PupPal Device + GPS Subscription'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};