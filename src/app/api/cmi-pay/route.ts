import { NextResponse } from "next/server";
import cmi from "cmi-payment-nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { amount, fullName, email, phone } = await request.json();

    // Validate required environment variables
    const storekey = process.env.CMI_STOREKEY;
    const clientid = process.env.CMI_CLIENTID;
    const shopurl = process.env.NEXT_PUBLIC_SHOP_URL;
    const okUrl = process.env.NEXT_PUBLIC_CMI_OK_URL;
    const failUrl = process.env.NEXT_PUBLIC_CMI_FAIL_URL;
    const callbackURL = process.env.NEXT_PUBLIC_CMI_CALLBACK_URL;

    if (
      !storekey ||
      !clientid ||
      !shopurl ||
      !okUrl ||
      !failUrl ||
      !callbackURL
    ) {
      throw new Error("One or more required environment variables are missing");
    }

    // Initialize the CMI client
    const cmiClient = new cmi({
      storekey,
      clientid,
      oid: `ORDER_${Date.now()}`,
      shopurl,
      okUrl,
      failUrl,
      callbackURL,
      email,
      BillToName: fullName,
      amount: amount.toString(),
      // Note: The 'tel' property is omitted because it's not part of the CmiOptions type.\n    });
    });

    // Generate the auto-submitting HTML form
    const htmlForm: string = cmiClient.redirect_post();

    return new NextResponse(htmlForm, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("Error in POST /api/cmi-pay:", message);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
