import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import {ObjectId} from "mongodb";
const { v4: uuidv4 } = require('uuid');

export async function POST(req: NextRequest) {
    const {groupID, channel_Name, requestor} = await req.json();
    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");

        const admin = await groupMessage.findOne({
            id_: new ObjectId(groupID),
            admins: new ObjectId(requestor)
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
                    channel_name: channel_Name,
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
            id_: new ObjectId(groupID),
            user: new ObjectId(userID)
        });

        if(!user){
            return NextResponse.json(
                { success: false, message: "not in the group" },
                { status: 500 }
            );
        }

        groupMessage.findOne({
                _id: new ObjectId(groupID)},
            {
                "channels": 1,
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