import { FoodEntry } from "../models/FoodEntry.models";
import { Request, Response } from "express";
import {v2 as cloudinary} from "cloudinary";



export const createFoodEntry = async(req:Request,res:Response)=>{
  try {
    const {foodName,restaurantName,location,cuisine,rating,review,image,date} = req.body;
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    if(!foodName || !restaurantName || !location || !cuisine || !image){
      return res.status(400).json({message:"All fields are required"});
    }
    let imageUrl;
    if(image){
      const updateResponse = await cloudinary.uploader.upload(image);
      imageUrl = updateResponse.secure_url;
    }
    const newFoodEntry = new FoodEntry({
      foodName,
      restaurantName,
      location,
      cuisine,
      rating,
      review,
      imageUrl,
      date,
      userId
    });
    await newFoodEntry.save();
    res.status(201).json({message:"Food Entry Created Successfully",newFoodEntry});
  } catch (error) { 
    res.status(400).json({message:"Error in Creating the FoodEntry"});
    console.log(error);
  }
}

