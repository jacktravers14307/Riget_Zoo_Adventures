import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(){
    try{
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
        session.destroy()
        return NextResponse.json({message: "User logged out"}, {status: 201}) 

    }catch(error){
        console.log(error)
        return NextResponse.json({error}, {status: 400})
    }
}