import { NextResponse } from "next/server";
import cmi from "cmi-payment-nodejs";

export async function POST(request: Request) {
  const { amount, fullName, email, phone } = await request.json();
  const cmiClient = new cmi({
    storekey: process.env.CMI_STOREKEY!,
    clientid: process.env.CMI_CLIENTID!,
    oid: `ORDER_${Date.now()}`,
    shopurl: process.env.NEXT_PUBLIC_SHOP_URL!,
    okUrl: process.env.NEXT_PUBLIC_CMI_OK_URL!,
    failUrl: process.env.NEXT_PUBLIC_CMI_FAIL_URL!,
    callbackURL: process.env.NEXT_PUBLIC_CMI_CALLBACK_URL!,
    email,
    BillToName: fullName,
    amount,
    // Removed 'tel' because it is not part of CmiOptions.
  });
  const htmlForm = cmiClient.redirect_post();
  return new NextResponse(htmlForm, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
