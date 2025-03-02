import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
export async function post() {
    try {
        const client = await clientPromise;
        const directMessage = client.db("DYEVRAQ-DB").collection("directMessage");
        directMessage.insertOne({ key: "value", key2: "value2" });
    }
    catch (e) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}
