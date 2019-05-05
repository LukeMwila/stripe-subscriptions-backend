import * as Stripe from "stripe";

import { SECRET_API_KEY } from "../config";

/** Config */
const stripe = new Stripe(SECRET_API_KEY);

export async function createCustomerAndSubscribeToPlan(
  stripeToken: string,
  email: string,
  productPlan: string
): Promise<any> {
  // create a customer
  const customer = await stripe.customers.create({
    email: email,
    source: stripeToken
  });
  // retrieve created customer id to add customer to subscription plan
  const customerId = customer.id;
  // create a subscription for the newly created customer
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ plan: productPlan }]
  });
  return subscription;
}
