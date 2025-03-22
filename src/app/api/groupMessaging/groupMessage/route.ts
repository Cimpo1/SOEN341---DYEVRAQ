import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
const { v4: uuidv4 } = require('uuid');

export async function POST(req: NextRequest) {
    const { users, admins} = await req.json();
    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");



        const newGroupMessage = await groupMessage.insertOne({
            users: users,
            admin: admins,
            createdAt: new Date(),
            channels: [{
                channelID: uuidv4(),
                channel_name: "General",
                messages: []
            }],
        });


        return NextResponse.json(
            {
                success: true,
                message: "Conversation created",
                group: newGroupMessage,
            },
            { status: 201 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, message: e.message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");

        // Finds conversations where the userID matches in the users array
        const results = await groupMessage
            .find({
                "users.id": userID,
            })
            .project({
                users: 1,
                _id: 1,
            })
            .toArray();
        // users = get the user array
        // _id = conversation id

        return NextResponse.json(
            {
                success: true,
                message: "Here are the conversations for the user",
                conversations: results,
            },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
                message: e.message,
            },
            { status: 500 }
        );
    }
}

