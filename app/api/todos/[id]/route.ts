import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // todo ID
  const { title, completed } = await req.json();

  const dataToUpdate: any = {};
  if (title) dataToUpdate.title = title;
  if (completed !== undefined) dataToUpdate.completed = completed;

  const updated = await prisma.todo.update({
    where: { id: Number(id) }, // Ensure todoId is a number
    data: dataToUpdate,
  });

  return NextResponse.json(updated);
}
