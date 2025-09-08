import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update todo (title or completed)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { title, completed } = await req.json();
  const todoId = parseInt(params.id);

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
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const todoId = parseInt(params.id);
  await prisma.todo.delete({ where: { id: todoId } });
  return NextResponse.json({ message: "Todo deleted" });
}
