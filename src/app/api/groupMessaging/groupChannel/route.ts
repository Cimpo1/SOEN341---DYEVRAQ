import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import {ObjectId} from "mongodb";
const { v4: uuidv4 } = require('uuid');

export async function POST(req: NextRequest) {
    const {groupID, channelName, requestor} = await req.json();
    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");

        const admin = await groupMessage.findOne({
            _id: new ObjectId(groupID),
            "admins.id": requestor
        });

        if(!admin){
            return NextResponse.json(
                { success: false, message: "not admin" },
                { status: 500 }
            );
        }

        groupMessage.updateOne({
            _id: new ObjectId(groupID)},
        { $push: {
                "channels": {
                    channelID: uuidv4(),
                    channelName: channelName,
                    messages: []
                },
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Conversation created",

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
    const groupID = searchParams.get("groupID");
    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");

        const user = await groupMessage.findOne({
            _id: new ObjectId(groupID),
            "users.id": userID
        });

        if(!user){
            return NextResponse.json(
                { success: false, message: "not a user", user: userID },
                { status: 500 }
            );
        }

        const result = await groupMessage.findOne({
                _id: new ObjectId(groupID)},
            {
                projection: { channels: 1, _id: 0 }
            });

        return NextResponse.json(
            {
                success: true,
                message: "Conversation created",
                result: result
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