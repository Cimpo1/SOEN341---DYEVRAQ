import { NextRequest, NextResponse } from 'next/server';
import  clientPromise from "../../../../lib/mongodb";


export async function POST(req: NextRequest) {
            //verify if exist
            const {originalSender, originalReceiver} = await req.json();
            try {
                const client = await clientPromise;
                const directMessage = await client.db("DYEVRAQ-DB").collection("directMessage");
                const count = await directMessage.countDocuments({userA: originalSender, userB: originalReceiver})
                     + await directMessage.countDocuments({ userA: originalReceiver, userB: originalSender}) ;

                 if(count>0){
                     return NextResponse.json({ success: false, message: "direct message already exist"},{status:400})
                 }

                const newDirectMessage = await directMessage.insertOne({
                    userA: originalReceiver,
                    userB: originalSender,
                    messages: []
                });
                return NextResponse.json({ success: true, message: "direct message created", group: newDirectMessage},{status:201});
            } catch (e) {
                return NextResponse.json({success: false, message: e.message},{status:500})
            }
}