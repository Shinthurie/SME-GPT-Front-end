import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenParam = searchParams.get("token");

    if (!tokenParam) {
      return new NextResponse("<h2>Invalid verification link.</h2>", {
        headers: { "Content-Type": "text/html" },
      });
    }

    const verification = await prisma.loginVerification.findFirst({
      where: {
        token: tokenParam,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return new NextResponse(
        "<h2>This verification link is invalid or expired.</h2>",
        {
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    await prisma.loginVerification.update({
      where: { id: verification.id },
      data: {
        approved: true,
      },
    });

    return new NextResponse(
      `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 40px;">
          <h2>Login Confirmed</h2>
          <p>Your login has been approved.</p>
          <p>Please return to the original device to continue.</p>
        </body>
      </html>
      `,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    console.error("CONFIRM LOGIN ERROR:", error);
    return new NextResponse("<h2>Confirmation failed.</h2>", {
      headers: { "Content-Type": "text/html" },
      status: 500,
    });
  }
}