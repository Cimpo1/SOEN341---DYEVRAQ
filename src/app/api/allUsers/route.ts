import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
    try {
      const client = await clientPromise;
      const userInfo = await client.db("DYEVRAQ-DB").collection("userInfo");
  
      // Fetch all documents from the collection
      const users = await userInfo.find({}).toArray();
  
      return NextResponse.json(
        {
          success: true,
          message: "Users retrieved successfully",
          data: users
        },
        { status: 200 }
      );
    } catch (e) {
      return NextResponse.json(
        { success: false, message: e.message },
        { status: 500 }
      );
    }
  }