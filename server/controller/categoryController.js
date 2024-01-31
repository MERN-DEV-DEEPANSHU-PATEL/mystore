import prisma from "../db/db.config.js";

export const addCategory = async (req, res) => {
  try {
    const { name, subcategories, adminId } = req.body;

    // Create category and associated subcategories
    const newCategory = await prisma.category.create({
      data: {
        name,
        adminId,
        subcategory: {
          create: subcategories.map((subcategory) => ({
            name: subcategory,
          })),
        },
      },
      include: {
        subcategory: true,
      },
    });

    res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { categoryId, name, adminId } = req.body;

    // Update category name
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        adminId,
      },
    });

    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    console.error("Error editing category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Get category and its subcategories
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
      include: {
        subcategory: true,
      },
    });

    res.status(200).json({ category });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    // Get all categories and their subcategories
    const allCategories = await prisma.category.findMany({
      include: {
        subcategory: true,
      },
    });

    res.status(200).json({ categories: allCategories });
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Delete category and its subcategories
    await prisma.category.delete({
      where: {
        id: Number(categoryId),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
