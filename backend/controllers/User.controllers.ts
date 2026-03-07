import {User} from '../models/User.models';
import {Request,Response} from 'express';
import mongoose from 'mongoose';



export const getUserProfile = async(req:Request,res:Response)=>{
  try{
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const user = await User.findById(userId).select('-password').populate('following','name profilePicture');
    res.status(200).json({message:"User Profile Fetched Successfully",user});
  }catch(err){
    res.status(400).json({message:"Error in Fetching the User Profile"});
  }
}

export const followUser = async(req:Request,res:Response)=>{
  try {
    const userId = req.userId;
    const {id} = req.params;
    if(!userId || userId === id || !id){
      return res.status(401).json({message:"Unauthorized"});
    }
    const userToFollow = await User.findById(id);
    if(!userToFollow){
      return res.status(404).json({message:"User to follow not found"});
    }
    const currentUser = await User.findById(userId);
    if(!currentUser){
      return res.status(404).json({message:"Current user not found"});
    }
    const followId = new mongoose.Types.ObjectId(id as string);
    const currentUserId = new mongoose.Types.ObjectId(userId as string);
    if(currentUser.following.includes(followId)){
      return res.status(400).json({message:"Already following the user"});
    }
    currentUser.following.push(followId);
    userToFollow.followers.push(currentUserId);
    await currentUser.save();
    await userToFollow.save();
    res.status(200).json({message:"User followed successfully"});
  } catch (error) {
    res.status(400).json({message:"Error in following the user"});
  }
}

export const unfollowUser = async(req:Request,res:Response)=>{
  try {
    const userId = req.userId;
    const {id} = req.params;
    if(!userId || userId === id || !id){
      return res.status(401).json({message:"Unauthorized"});
    }
    const userToUnfollow = await User.findById(id);
    if(!userToUnfollow){
      return res.status(404).json({message:"User to unfollow not found"});
    }
    const currentUser = await User.findById(userId);
    if(!currentUser){
      return res.status(404).json({message:"Current user not found"});
    }
    const unfollowId = new mongoose.Types.ObjectId(id as string);
    if(!currentUser.following.includes(unfollowId)){
      return res.status(400).json({message:"Not following the user"});
    }
    currentUser.following = currentUser.following.filter((followingId: any) => followingId.toString() !== id);
    userToUnfollow.followers = userToUnfollow.followers.filter((followerId: any) => followerId.toString() !== userId);
    await currentUser.save();
    await userToUnfollow.save();
    res.status(200).json({message:"User unfollowed successfully"});
  } catch (error) {
    res.status(400).json({message:"Error in unfollowing the user"});
  }
}

export const getFollowers = async(req:Request,res:Response)=>{
  try {
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const user = await User.findById(userId).populate('followers','name profilePicture');
    res.status(200).json({message:"Followers Fetched Successfully",followers:user?.followers});
  } catch (error) {
    res.status(400).json({message:"Error in Fetching the Followers"});
  }
}

export const getFollowing = async(req:Request,res:Response)=>{
  try {
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const user = await User.findById(userId).populate('following','name profilePicture');
    res.status(200).json({message:"Following Fetched Successfully",following:user?.following}); 
  } catch (error) {
    res.status(400).json({message:"Error in Fetching the Following"});
  }
}