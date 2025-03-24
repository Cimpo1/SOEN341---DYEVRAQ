import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

interface Message {
  id: number;
  message: string;
  time: Date;
  sender: string;
}

interface User {
  id: string;
  username: string;
  url: string;
}

interface GroupDocument {
  users: User[];
  admins: User[];
  isGroup: boolean;
  createdAt: Date;
  channels: Channel[];
}

export async function POST(req: NextRequest) {
  const { users, admins, channelName = "general" } = await req.json();
  try {
    const client = await clientPromise;
    const group = await client
      .db("DYEVRAQ-DB")
      .collection<GroupDocument>("group");

    // Check is input is an array of user objects and if there is more than 2 users
    if (
      !Array.isArray(users) ||
      users.length < 2 ||
      !users.every((user) => user.id && user.username && user.url)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "At least 2 users are required to create a group",
        },
        { status: 400 }
      );
    }

    // Find all existing conversations with users to verify if conversation already exists
    const userIds = users.map((user) => user.id);
    const existingConversation = await group.findOne({
      "users.id": { $all: userIds },
      users: { $size: users.length },
    });

    if (existingConversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Group with these users already exists",
        },
        { status: 400 }
      );
    }

    // Create initial channel
    const initialChannel: Channel = {
      id: "1", // First channel always has id "1"
      name: channelName,
      messages: []
    };

    // Use provided admins array or default to creator as admin
    const groupAdmins = admins || [users[users.length - 1]];

    const newGroup = await group.insertOne({
      users: users,
      admins: groupAdmins,
      isGroup: true,
      createdAt: new Date(),
      channels: [initialChannel]  // Initialize with one default channel
    });

    return NextResponse.json(
      {
        success: true,
        message: "Group created",
        group: newGroup,
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
    const group = await client
      .db("DYEVRAQ-DB")
      .collection<GroupDocument>("group");

    // Finds groups where the userID matches in the users array
    const results = await group
      .find({
        "users.id": userID,
      })
      .project({
        users: 1,
        admins: 1, // Now also returning admins information
        isGroup: 1,
        _id: 1,
        channels: 1
      })
      .toArray();
    
    return NextResponse.json(
      {
        success: true,
        message: "Here are the groups for the user",
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