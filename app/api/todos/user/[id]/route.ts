// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      completed: false,
      userId: id,
    },
  });

  return Response.json(todo, { status: 201 });
}