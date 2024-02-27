import { headers } from "next/headers";
import { NextResponse } from "next/server"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpoint = process.env.STRIPE_WEBHOOK_KEY

export const POST = async (req) => {

  const data = await req.text()

  const headerList = headers();

  const sig = headerList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(data, sig, endpoint);

  } catch (error) {
    return NextResponse(error.message, {
      status: 400
    });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSesion = event.data.object;

      // enviar a base de datos

      // enviar correo de confirmacion
      console.log(checkoutSesion.customer_details, checkoutSesion.metadata);
      break;
    default:
      console.log('Evento desconocido' + event.type);
  }

  return new Response(null, {status: 200 });
}