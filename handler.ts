import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { createCustomerAndSubscribeToPlan } from "./stripe-api";

interface ICreateCustomer {
  stripeToken: string;
  email: string;
  productPlan: string;
}

export const respond = (fulfillmentText: any): any => {
  return {
    statusCode: 200,
    body: JSON.stringify(fulfillmentText),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};

export const createCustomer: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const incoming: ICreateCustomer = JSON.parse(event.body);
  const { stripeToken, email, productPlan } = incoming;
  try {
    const data = await createCustomerAndSubscribeToPlan(
      stripeToken,
      email,
      productPlan
    );
    return respond(data);
  } catch (err) {
    return respond(err);
  }
};
