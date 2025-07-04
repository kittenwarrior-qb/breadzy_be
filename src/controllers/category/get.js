import { StatusCodes } from "http-status-codes";
import Category from "../../models/category.model.js";

// GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const pageSize = 10;
    const query = search
      ? { slug: { $regex: search, $options: "i" } }
      : {};

    const total = await Category.countDocuments(query);
    const categories = await Category.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(StatusCodes.OK).json({
      msg: "Lấy danh sách danh mục thành công",
      data: categories,
      pagination: {
        total,
        page: Number(page),
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
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
