import { StatusCodes } from "http-status-codes";
import Category from "../../models/category.model.js";

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Thiếu tên danh mục",
      });
    }

    const category = await Category.create({ name });

    return res.status(StatusCodes.CREATED).json({
      msg: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Lỗi tạo danh mục:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};
