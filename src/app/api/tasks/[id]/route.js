import { NextResponse } from "next/server";
import Task from "@/models/Task";
import connect from "@/utils/db";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const task = await Task.findById(id);
    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
};

export async function PUT(req, { params }) {
  try {
    await connect();
    const { id } = params;

    if (!id) {
      return new NextResponse("Task ID required", { status: 400 });
    }

    const updatedTask = await req.json();
    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = params;

    if (!id) {
      return new NextResponse("Task ID required", { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse("Task deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
}
