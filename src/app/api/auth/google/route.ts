import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as jose from "jose";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { addHours } from "date-fns";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    const tokenSchema = z.object({
      access_token: z.string(),
    });

    const { access_token } = tokenSchema.parse(body);

    const client = new OAuth2Client();
    const tokenInfo = await client.getTokenInfo(access_token);
    console.log("tokenInfo", tokenInfo);

    if (!tokenInfo.email) {
      throw new Error("Invalid Grant");
    }

    if (!tokenInfo.email_verified) {
      throw new Error("email not verified");
    }

    const userId = tokenInfo.sub;
    const email = tokenInfo.email;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Chamar o seu banco de dados

    const jwt = await new jose.SignJWT({
      sub: userId,
      email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    cookies().set({
      name: "auth-session",
      value: jwt,
      httpOnly: true,
      expires: addHours(new Date(), 24),
      path: "/",
    });

    return NextResponse.json(
      {
        jwt,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[POST] Auth Google", error);
    return NextResponse.json({}, { status: 401 });
  }
}
