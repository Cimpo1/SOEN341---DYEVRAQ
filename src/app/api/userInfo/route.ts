import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const { UserID, Email, UserName, PictureURL, Nickname } = await req.json();
  try {
    const client = await clientPromise;
    const userInfo = await client.db("DYEVRAQ-DB").collection("userInfo");

    // Prepare the update object
    const updateFields: any = {
      UserID: UserID,
      Email: Email,
      UserName: UserName,
      PictureURL: PictureURL,
    };

    // Add Nickname only if it's provided
    if (Nickname) {
      updateFields.Nickname = Nickname;
    }

    const result = await userInfo.updateOne(
      { UserID: UserID }, 
      {
        $set: updateFields,
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User Info added successfully",
        result: result,
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const UserID = searchParams.get("UserID");

  if (!UserID) {
    return NextResponse.json(
      { success: false, message: "UserID is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const userInfo = await client.db("DYEVRAQ-DB").collection("userInfo");

    const user = await userInfo.findOne({ UserID: UserID });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}

