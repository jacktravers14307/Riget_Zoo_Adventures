import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Ticket from "@/lib/models/supportTicket";
import User from "@/lib/models/user";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    try{
        await dbConnect()
        const data = await req.json()
        const session = await getIronSession(await cookies(), {
            password: process.env.SECRET_COOKIE_PASSWORD as string,
            cookieName: "user",
            cookieOptions: {
                secure: process.env.NODE_ENV === "production",
            },
        });
        if(!session.user?.id){
            return NextResponse.json({error: "Not authenticated"}, {status: 401})
        }
        const foundUser = await User.findById(session.user.id)
        if(!foundUser){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        const newTicket = new Ticket({
            ticketType: data.supportType,
            ticketDetails: data.supportInfo,
            userFirstName: foundUser.firstName,
            userLastName: foundUser.lastName,
            userEmail: foundUser.email,
            dateSubmitted: Date.now()
        })
        await newTicket.save()
        return NextResponse.json({message: "Ticket Sent"}, {status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({error}, {status: 400})
    }
}