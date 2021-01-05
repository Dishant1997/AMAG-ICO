import STRIPE_SDK from 'stripe';
const stripe = new STRIPE_SDK('sk_test_cy3XxTweo3NQvmZjQ1v4kjXJ004QWo5oXC');

// success_url: `${YOUR_DOMAIN}/success.html`,
// cancel_url: `${YOUR_DOMAIN}/cancel.html`,


module.exports = {
    makePayment: async () => {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA', 'MY', 'IN'],
                },
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: 0.20,
                        },
                    },
                ],
                mode: 'payment',
            });
        } catch (err) {

        }
    }

}