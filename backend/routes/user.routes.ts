import {createUser,LoginUser} from "../controllers/Auth.controllers";
import express from "express";
const router = express.Router();
router.post("/create",createUser);
router.post("/login",LoginUser);
export default router;