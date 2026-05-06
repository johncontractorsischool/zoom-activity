import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ZoomWebhookBody = {
  event?: string;
  payload?: {
    plainToken?: string;
  };
};

function hmacSha256Hex(message: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export async function POST(request: Request) {
  const secretToken = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;

  if (!secretToken) {
    return NextResponse.json(
      { error: "ZOOM_WEBHOOK_SECRET_TOKEN is not configured" },
      { status: 500 },
    );
  }

  let body: ZoomWebhookBody;

  try {
    body = (await request.json()) as ZoomWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.event === "endpoint.url_validation") {
    const plainToken = body.payload?.plainToken;

    if (!plainToken) {
      return NextResponse.json(
        { error: "Missing payload.plainToken" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      plainToken,
      encryptedToken: hmacSha256Hex(plainToken, secretToken),
    });
  }

  return NextResponse.json({ status: "ok" });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
