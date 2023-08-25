import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
   const posts = await prisma.posts.findMany({});

   return NextResponse.json({ posts }, { status: 200 })
}

export const POST = async (req: NextRequest) => {
   const { title, content } = await req.json();

   const createPost = await prisma.posts.create({
      data: {
         title, content
      }
   })
   return NextResponse.json({ createPost }, { status: 201 })
}
