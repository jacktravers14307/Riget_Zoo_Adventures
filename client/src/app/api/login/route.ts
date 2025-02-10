import { NextResponse, type NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
import dbConnect from "@/lib/dbconnect";
import User from "@/lib/models/user";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    try{
        dbConnect()
		const session = await getIronSession(await cookies(), {
			password: process.env.SECRET_COOKIE_PASSWORD as string,
			cookieName: "user",
			cookieOptions: {
				secure: process.env.NODE_ENV === "production",
			},
		});
        const data = await req.json()
        const foundUser = await User.findOne({email: data.email})
        if(!foundUser){
            return NextResponse.json({message: "Email or password incorrect"}, {status: 404})
        }
        const passwordMatch = await bcryptjs.compare(data.password, foundUser.password)
        if(passwordMatch){
            session.user = {
                id: foundUser._id.toString()
            }
            await session.save()
            return NextResponse.json({message: "User logged in"}, {status: 201})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "An error occurred"}, {status: 400})
    }
}