import mongoose from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const user = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  },
  followers:[
    {type:mongoose.Schema.Types.ObjectId,ref:'User'}
  ],
  following:[
    {type:mongoose.Schema.Types.ObjectId,ref:'User'}
  ],
    profilePicture:{
    type:String,
    default:""
  }
  },
{timestamps:true});
export const User = mongoose.model<IUser>('User',user);