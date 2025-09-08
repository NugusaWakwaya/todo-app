import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // if you hash passwords

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Optional: check password if hashed
  // const isValid = await bcrypt.compare(password, user.password);
  // if (!isValid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  // Return user info and token (if using JWT)
  return NextResponse.json({
    id: user.id,
    email: user.email,
    // token: "JWT_TOKEN_HERE"
  });
}
