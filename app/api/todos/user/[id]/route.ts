import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // user ID
  const { title } = await req.json();

  if (!title) return NextResponse.json({ message: "Title required" }, { status: 400 });

  const todo = await prisma.todo.create({
    data: {
      title,
      user: { connect: { id } }, // connect todo to this user
    },
  });

  return NextResponse.json(todo);
}
