import { StatusCodes } from "http-status-codes";
import Category from "../../models/category.model.js";

// GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      msg: "Lấy danh sách danh mục thành công",
      data: categories,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách danh mục:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Không tìm thấy danh mục",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Lấy danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Lỗi lấy danh mục theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};
