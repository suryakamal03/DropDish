import { getUserProfile,followUser,unfollowUser,getFollowers,getFollowing } from "../controllers/User.controllers";
import express from "express";
const router = express.Router();

router.post("/follow/:id",followUser);
router.post("/unfollow/:id",unfollowUser);
router.get("/profile",getUserProfile);
router.get("/followers",getFollowers);
router.get("/following",getFollowing);

export default router;