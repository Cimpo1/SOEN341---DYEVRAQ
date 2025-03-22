import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import {ObjectId} from "mongodb";

export async function POST(req: NextRequest) {
    const {newuser, groupID, requestor} = await req.json();

    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");


        const admin = await groupMessage.findOne({
            id_: new ObjectId(groupID),
            "admins.id": new ObjectId(requestor)
        });

        if(!admin){
            return NextResponse.json(
                { success: false, message: "not admin" },
                { status: 500 }
            );
        }

        const result = await groupMessage.updateOne(
            { _id: new ObjectId(groupID) },
            {$push: {users: { newuser},},}
        );
        return NextResponse.json(
            { success: true, message: "user added successfully", result: result },
            { status: 202 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, message: e.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const {removeduser, groupID, requestor} = await req.json();

    try {
        const client = await clientPromise;
        const groupMessage = await client
            .db("DYEVRAQ-DB")
            .collection("groupMessage");


        const admin = await groupMessage.findOne({
            id_: new ObjectId(groupID),
            "admins.id": new ObjectId(requestor)
        });

        if(!admin){
            return NextResponse.json(
                { success: false, message: "not admin" },
                { status: 500 }
            );
        }
        const removeduserid = removeduser.id;

        const result = await groupMessage.updateOne(
            { _id: new ObjectId(groupID) },
            {$pull: {users: { removeduserid},},}
        );
        return NextResponse.json(
            { success: true, message: "user removed successfully", result: result },
            { status: 202 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, message: e.message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url); // Extract query params
    const GroupID = searchParams.get("GroupID");
    try {
        const client = await clientPromise;
        const directMessage = await client
            .db("DYEVRAQ-DB")
            .collection("directMessage");

        const result = await directMessage.findOne(
            { _id: new ObjectId(GroupID) },
            { users: 1, admins: 1}
        );



        return NextResponse.json(
            {
                success: true,
                message: "here is the list of messages",
                users: result,
            },
            { status: 202 }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, message: e.message },
            { status: 500 }
        );
    }
}
