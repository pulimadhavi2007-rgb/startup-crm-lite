import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Added { family: 4 } to force IPv4 and bypass the DNS ECONNREFUSED error
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4, 
    });

    console.log("======================================");
    console.log("✅ MongoDB Atlas Connected Successfully");
    console.log(`Host : ${conn.connection.host}`);
    console.log(`Database : ${conn.connection.name}`);
    console.log("======================================");
  } catch (error) {
    console.error("======================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("======================================");
    process.exit(1);
  }
};

export default connectDB;