import { type NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import dbConnect from "@/lib/dbconnect";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();

        const session = await getIronSession(await cookies(), {
            password: process.env.SECRET_COOKIE_PASSWORD as string,
            cookieName: "user",
            cookieOptions: {
                secure: process.env.NODE_ENV === "production",
            },
        });

        if (!session.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const foundUser = await User.findById(session.user.id);
        if (!foundUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const passwordMatch = await bcryptjs.compare(data.currentPassword2, foundUser.password)
        if (!passwordMatch) {
            return NextResponse.json({ message: "Password Incorrect" }, { status: 400 })
        }

        await foundUser.deleteOne();

        session.destroy()

        return NextResponse.json({ message: "User deleted successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}