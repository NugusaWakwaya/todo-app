import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// context.params.id is the dynamic route segment
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { todos: true },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return Response.json(user);
}