import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getSingleCategory,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

//FOR ADMIN ONLY
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getSingleCategory);
categoryRouter.put("/edit", editCategory);
categoryRouter.post("/add", addCategory);
categoryRouter.delete("/delete/:categoryId", deleteCategory);

export default categoryRouter;
