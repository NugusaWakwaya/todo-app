import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// context.params.id is the dynamic route segment
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // <-- get the ID from the route

  const user = await prisma.user.findUnique({
    where: { id },
    include: { todos: true },
  });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}
