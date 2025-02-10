import { type NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import dbConnect from "@/lib/dbconnect";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

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

        if (data.email && data.email !== foundUser.email) {
            const emailExists = await User.findOne({ email: data.email });
            if (emailExists) {
                return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
            }
        }

        foundUser.email = data.email || foundUser.email;
        foundUser.firstName = data.firstName || foundUser.firstName;
        foundUser.lastName = data.lastName || foundUser.lastName;

        await foundUser.save();

        return NextResponse.json({ message: "User updated successfully" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}
