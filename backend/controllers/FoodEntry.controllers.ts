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

export const getAllFoodEntries = async(req:Request,res:Response)=>{
  try {
    const foodEntries = await FoodEntry.find().sort({createdAt:-1}).populate('user','name profilePicture');
    res.status(200).json({message:"Food Entries Fetched Successfully",foodEntries});
  } catch (error) {
    res.status(400).json({message:"Error in Fetching the FoodEntries"});
    console.log(error);
  }
}

export const getFoodEntryById = async(req:Request,res:Response)=>{
  try{
    const {id} = req.params;
    const foodEntry = await FoodEntry.findById(id).populate('user','name profilePicture');
    res.status(200).json({message:"Food Entry Fetched Successfully",foodEntry});
  }catch(error){
    res.status(400).json({message:"Error in Fetching the FoodEntry"});
    console.log(error);
  }
}

export const getSingleFoodEntry = async(req:Request,res:Response)=>{
  try{
    const {id} = req.params;
    const foodEntry = await FoodEntry.findById(id).populate('user','name profilePicture');
    res.status(200).json({message:"Food Entry Fetched Successfully",foodEntry});
  }catch(error){
    res.status(400).json({message:"Error in Fetching the FoodEntry"});
    console.log(error);
  }
}

export const updateFoodEntry = async(req:Request,res:Response)=>{
  try {
    const {id} = req.params;
    const {foodName,restaurantName,location,cuisine,rating,review,image} = req.body;
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const updatedFoodEntry = await FoodEntry.findByIdAndUpdate(id,{
      foodName,
      restaurantName,
      location,
      cuisine,
      rating,
      review,
      image
    },{new:true});
    res.status(200).json({message:"Food Entry Updated Successfully",updatedFoodEntry});
  } catch (error) {
    res.status(400).json({message:"Error in Updating the FoodEntry"});
    console.log(error);
  }
}

export const deleteFoodEntry = async(req:Request,res:Response)=>{
  try {
    const {id} = req.params;
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    await FoodEntry.findByIdAndDelete(id);
    res.status(200).json({message:"Food Entry Deleted Successfully"});
  } catch (error) {
    res.status(400).json({message:"Error in Deleting the FoodEntry"});
    console.log(error);
  }
}