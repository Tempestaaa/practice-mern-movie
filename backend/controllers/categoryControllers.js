import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim())
      return res.status(400).json({ message: "Name is required" });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ message: "Category existed" });

    const newCategory = await new Category({ name }).save();
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.categoryId);
    res.json({ message: `${deleted.name} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.categoryId });
    res.json(category);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const getCategoryList = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find();
    res.json(all);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
