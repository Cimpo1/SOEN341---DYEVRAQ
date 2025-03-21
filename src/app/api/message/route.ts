import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const { GroupID, message, sender } = await req.json();
  try {
    const client = await clientPromise;
    interface Message {
      message: string;
      time: Date;
      sender: string;
    }

    interface Group {
      _id: ObjectId;
      messages: Message[];
    }

    const directMessage = await client
      .db("DYEVRAQ-DB")
      .collection<Group>("directMessage");

    const result = await directMessage.updateOne(
      { _id: new ObjectId(GroupID) },
      {
        $push: {
          messages: {
            message: message,
            time: new Date(),
            sender: sender,
          },
        },
      }
    );
    return NextResponse.json(
      { success: true, message: "message added successfully", result: result },
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
      { projection: { messages: 1 } }
    );

    const sortedMessages = result.messages.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        message: "here is the list of messages",
        sortedMessages: sortedMessages,
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
