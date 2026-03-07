import { createFoodEntry,getAllFoodEntries,getFoodEntryById,getSingleFoodEntry,updateFoodEntry,deleteFoodEntry } from "../controllers/FoodEntry.controllers";
import express from "express";
const router = express.Router();

router.post("/create",createFoodEntry);
router.get("/all",getAllFoodEntries);
router.get("/:id",getFoodEntryById);
router.get("/single/:id",getSingleFoodEntry);
router.put("/update/:id",updateFoodEntry);
router.delete("/delete/:id",deleteFoodEntry);

export default router;