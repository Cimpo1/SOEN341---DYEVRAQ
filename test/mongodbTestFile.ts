
import clientPromise from "../lib/mongodb";
//console.log(__dirname);

async function testMongoConnection(){
    try {
        const client = await clientPromise;
        //console.log("Successfully connected to mongodb!")
        process.exit(0); // Exit successfully
    } catch (error) {
        //console.error("Connection failed:", error);
        process.exit(1); // Exit with failure
    }


}

testMongoConnection();