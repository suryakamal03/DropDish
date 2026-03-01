import mongoose from "mongoose";

export interface IFoodEntry extends Document{
  userId: mongoose.Schema.Types.ObjectId;
  foodName:string;
  restaurantName:string;
  location:string;
  cuisine:string;
  rating:number;
  review:string;
  imageUrl:string;
  date:Date;
}

const foodEntry = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'},
  foodName:{
    type:String,
    required:true
  }, 
  restaurantName:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  cuisine:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  review:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()
  }
})