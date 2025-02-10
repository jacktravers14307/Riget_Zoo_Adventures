import { NextResponse, type NextRequest } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User from "@/lib/models/user";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const session = await getIronSession(await cookies(), {
            password: process.env.SECRET_COOKIE_PASSWORD as string,
            cookieName: "user",
            cookieOptions: {
                secure: process.env.NODE_ENV === "production",
            },
        });
        if (!session.user?.id) {
            return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
        }
        const foundUser = await User.findById(session.user.id);
        if (!foundUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const { total, standardAmount, familyAmount, premiumAmount } = await req.json();

        foundUser.tickets.push({
            total,
            standardAmount,
            familyAmount,
            premiumAmount
        });
        await foundUser.save();
        return NextResponse.json({ message: "Ticket purchase successful" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
