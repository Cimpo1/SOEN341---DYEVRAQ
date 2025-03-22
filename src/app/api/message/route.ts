import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface Message {
  id: number;
  message: string;
  time: Date;
  sender: string;
}

interface DirectMessageGroup {
  _id: ObjectId;
  messages: Message[];
}

interface GroupChannel {
  id: string;
  name: string;
  messages: Message[];
}

interface GroupDocument {
  _id: ObjectId;
  channels: GroupChannel[];
}

export async function POST(req: NextRequest) {
  const { GroupID, message, sender, channelId } = await req.json();
  try {
    const client = await clientPromise;
    
    // Try direct message first
    const directMessage = await client
      .db("DYEVRAQ-DB")
      .collection<DirectMessageGroup>("directMessage");

    const directMessageGroup = await directMessage.findOne({ _id: new ObjectId(GroupID) });

    if (directMessageGroup) {
      // Handle direct message
      const newMessageId = directMessageGroup.messages.length > 0
        ? directMessageGroup.messages[directMessageGroup.messages.length - 1].id + 1
        : 1;

      const result = await directMessage.updateOne(
        { _id: new ObjectId(GroupID) },
        {
          $push: {
            messages: {
              id: newMessageId,
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
    }

    // If not found in direct messages, try group chat
    const group = await client
      .db("DYEVRAQ-DB")
      .collection<GroupDocument>("group");

    const groupDoc = await group.findOne({ _id: new ObjectId(GroupID) });

    if (!groupDoc) {
      return NextResponse.json(
        { success: false, message: "Conversation not found" },
        { status: 404 }
      );
    }

    const targetChannel = groupDoc.channels.find(channel => channel.id === channelId);
    if (!targetChannel) {
      return NextResponse.json(
        { success: false, message: "Channel not found" },
        { status: 404 }
      );
    }

    const newMessageId = targetChannel.messages.length > 0
      ? targetChannel.messages[targetChannel.messages.length - 1].id + 1
      : 1;

    const result = await group.updateOne(
      { 
        _id: new ObjectId(GroupID),
        "channels.id": channelId
      },
      {
        $push: {
          "channels.$.messages": {
            id: newMessageId,
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
  const { searchParams } = new URL(req.url);
  const GroupID = searchParams.get("GroupID");
  const channelId = searchParams.get("channelId");

  try {
    const client = await clientPromise;
    
    // Try direct message first
    const directMessage = await client
      .db("DYEVRAQ-DB")
      .collection("directMessage");

    const directMessageResult = await directMessage.findOne(
      { _id: new ObjectId(GroupID) },
      { projection: { messages: 1 } }
    );

    if (directMessageResult) {
      const sortedMessages = directMessageResult.messages.sort(
        (a: { time: Date }, b: { time: Date }) =>
          new Date(a.time).getTime() - new Date(b.time).getTime()
      );

      return NextResponse.json(
        {
          success: true,
          message: "here is the list of messages",
          sortedMessages: sortedMessages,
        },
        { status: 202 }
      );
    }

    // If not found in direct messages, try group chat
    const group = await client
      .db("DYEVRAQ-DB")
      .collection("group");

    const groupResult = await group.findOne(
      { _id: new ObjectId(GroupID) },
      { projection: { channels: 1 } }
    );

    if (!groupResult) {
      return NextResponse.json(
        { success: false, message: "Conversation not found" },
        { status: 404 }
      );
    }

    const targetChannel = groupResult.channels.find(channel => channel.id === channelId);
    if (!targetChannel) {
      return NextResponse.json(
        { success: false, message: "Channel not found" },
        { status: 404 }
      );
    }

    const sortedMessages = targetChannel.messages.sort(
      (a: { time: Date }, b: { time: Date }) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
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
