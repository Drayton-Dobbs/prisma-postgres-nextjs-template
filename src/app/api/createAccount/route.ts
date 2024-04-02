import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface accountData {
  name: string
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({
      okay: false,
    },{
      status: 400
    })
  }

  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data: {
          email: data.email,
          name: data.name,
          password: data.password
      }
    })
    console.log('user', user)

  
    return NextResponse.json({
      okay: true,
      data: user
    },{
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      okay: false,
    },{
      status: 500
    })
  }
} 