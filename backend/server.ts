import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import auth from './routes/auth.routes';
import user from './routes/user.routes';
import food from './routes/FoodEntry.routes';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
const MONGODB_URL = process.env.MONGODB_URL || "Error: MONGODB_URL not found in environment variables";
const connectDB = async () =>{
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("error in connecting MONGODB",error)
  }
}
app.use("/api/auth",auth);
app.use("/api/user",user);
app.use("/api/food",food);
app.listen(PORT,()=>{
  console.log("The server is running",PORT);
  connectDB();
})


