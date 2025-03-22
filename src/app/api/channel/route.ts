import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface Channel {
  id: string;
  name: string;
  messages: Array<{
    id: number;
    message: string;
    time: Date;
    sender: string;
  }>;
}

interface GroupDocument {
  _id: ObjectId;
  users: Array<{
    id: string;
    username: string;
    url: string;
  }>;
  isGroup: boolean;
  createdAt: Date;
  channels: Channel[];
}

export async function POST(req: NextRequest) {
  const { groupId, channelName } = await req.json();
  try {
    const client = await clientPromise;
    const group = await client
      .db("DYEVRAQ-DB")
      .collection<GroupDocument>("group");

    // Find the group first
    const existingGroup = await group.findOne({ 
      _id: new ObjectId(groupId) 
    });

    if (!existingGroup) {
      return NextResponse.json(
        {
          success: false,
          message: "Group not found",
        },
        { status: 404 }
      );
    }

    // Check if channel with same name exists
    const channelExists = existingGroup.channels.some(
      (channel) => channel.name === channelName
    );

    if (channelExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Channel with this name already exists",
        },
        { status: 400 }
      );
    }

    // Create new channel
    const newChannel: Channel = {
      id: (existingGroup.channels.length + 1).toString(),
      name: channelName,
      messages: []
    };

    // Add new channel to the group
    const result = await group.updateOne(
      { _id: new ObjectId(groupId) },
      { $push: { channels: newChannel } }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Channel created successfully",
        channel: newChannel
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
  const groupId = searchParams.get("groupId");

  try {
    const client = await clientPromise;
    const group = await client
      .db("DYEVRAQ-DB")
      .collection<GroupDocument>("group");

    const result = await group.findOne(
      { _id: new ObjectId(groupId) },
      { projection: { channels: 1 } }
    );

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Group not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Here are the channels for the group",
        channels: result.channels
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