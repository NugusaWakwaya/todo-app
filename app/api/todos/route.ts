import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: any): Promise<NextResponse> {
  // @ts-ignore
  const params = context.params;
  const todoId = parseInt(params.id);

  const { title, completed } = await req.json();

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: {
      ...(title && { title }),
      ...(completed !== undefined && { completed }),
    },
  });

  return NextResponse.json(updated);
}


// Delete todo
export async function DELETE(req: NextRequest, context: any): Promise<NextResponse> {
  const id = context.params.id; // safe access

  try {
    const deleted = await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
