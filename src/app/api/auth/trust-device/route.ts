import { prisma } from "@/lib/prisma";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenParam = searchParams.get("token");

    if (!tokenParam) {
      return NextResponse.redirect("http://localhost:3000/login?error=invalid_token");
    }

    const verification = await prisma.loginVerification.findFirst({
      where: {
        token: tokenParam,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!verification) {
      return NextResponse.redirect("http://localhost:3000/login?error=expired_token");
    }

    await prisma.loginVerification.update({
      where: { id: verification.id },
      data: {
        used: true,
        trusted: true,
      },
    });

    const existingDevice = await prisma.trustedDevice.findFirst({
      where: {
        userId: verification.user.id,
        deviceToken: verification.deviceToken,
      },
    });

    if (!existingDevice) {
      await prisma.trustedDevice.create({
        data: {
          userId: verification.user.id,
          deviceToken: verification.deviceToken,
          deviceName: verification.deviceName,
          ipAddress: verification.ipAddress,
          userAgent: verification.userAgent,
        },
      });
    }

    const token = jwt.sign(
      { userId: verification.user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.redirect("http://localhost:3000/dashboard");

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("device_token", verification.deviceToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("TRUST DEVICE ERROR:", error);
    return NextResponse.redirect("http://localhost:3000/login?error=trust_failed");
  }
}