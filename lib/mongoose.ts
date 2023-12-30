import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
	mongoose.set("strictQuery", false);
	if (!process.env.MONGO_URI) {
		return console.log("MONGO_URI is not defined");
	}
	if (isConnected) {
		return console.log("Already connected to database");
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		isConnected = true;
		console.log("Connected to database");
	} catch (error) {
		console.log(error);
	}
};
