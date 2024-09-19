import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Task from "@/models/Task";



export async function GET(req) {
  try {
    await connect();
    const tasks = await Task.find();
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
    
  }   

  catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connect();

    const newTask = await req.json();
    const taskToAdd = new Task(newTask);

    await taskToAdd.save();

    return new NextResponse(JSON.stringify(taskToAdd), { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}