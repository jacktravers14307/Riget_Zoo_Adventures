import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest){
    try{
        const data = await req.json()
        console.log({
            firstName: data.firstName,
            lastName: data.firstName,
            email: data.email,
            phoneNumber: data.phone,
            message: data.message
        })
        return NextResponse.json({message: "Message retrieved"}, {status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({error}, {status: 400})
    }
}