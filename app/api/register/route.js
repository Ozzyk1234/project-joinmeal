import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = await new PrismaClient();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const hashedpassword = await bcrypt.hash(password, 10);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Podany adres email jest błędny!" },
        { status: 500 }
      );
    }

    const userExits = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExits) {
      return NextResponse.json(
        { message: "Użytkownik o podanym adresie email już istnieje!" },
        { status: 500 }
      );
    } else {
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedpassword,
          userName: username,
        },
      });
      return NextResponse.json(
        { message: "Użytkownik został poprawnie zarejestrowany: " },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Użytkownik nie został poprawnie utworzony" + error },
      { status: 500 }
    );
  }
}
