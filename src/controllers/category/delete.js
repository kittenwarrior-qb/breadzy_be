import { StatusCodes } from 'http-status-codes';
import Category from "../../models/category.model.js";

// DELETE /api/category/:id
export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Không tìm thấy danh mục để xoá",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Đã xoá danh mục thành công",
    });
  } catch (error) {
    console.error("Lỗi xoá danh mục:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};
