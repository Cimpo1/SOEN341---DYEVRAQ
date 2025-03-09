import { NextRequest, NextResponse } from 'next/server';
import  clientPromise from "../../../../lib/mongodb";


export async function POST(req: NextRequest) {
           
            const {users} = await req.json();
            try {
                const client = await clientPromise;
                const directMessage = await client.db("DYEVRAQ-DB").collection("directMessage");

                // Check is input is an array and if there is more than 2 users
                if (!Array.isArray(users) || users.length < 2) {
                    return NextResponse.json({ 
                        success: false, 
                        message: "At least 2 users are required to create a conversation"
                    }, { status: 400 });
                }
                
                // Find all existing conversations with users to verify if conversation already exists
                const existingConversation = await directMessage.findOne({
                    users: { $all: users, $size: users.length }
                });
                
                if (existingConversation) {
                    return NextResponse.json({ 
                        success: false, 
                        message: "Conversation between these users already exists"
                    }, { status: 400 });
                }
                
                const newDirectMessage = await directMessage.insertOne({
                    users: users,
                    isGroup: users.length > 2, 
                    createdAt: new Date(),
                    messages: []
                });

                return NextResponse.json({ success: true, message: "Conversation created", group: newDirectMessage},{status:201});
            } catch (e) {
                return NextResponse.json({success: false, message: e.message},{status:500})
            }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");
    
    try {
        const client = await clientPromise;
        const directMessage = await client.db("DYEVRAQ-DB").collection("directMessage");

        // Finds conversations where the userID matches in the users array
        const results = await directMessage.find({
            users: userID  
        }).project({ 
            users: 1, 
            isGroup: 1,
            _id: 1 
        }).toArray();

        return NextResponse.json({
            success: true, 
            message: "Here are the conversations for the user", 
            conversations: results
        }, { status: 200 });
    } catch (e) {
        return NextResponse.json({
            success: false, 
            message: e.message
        }, { status: 500 });
    }
}