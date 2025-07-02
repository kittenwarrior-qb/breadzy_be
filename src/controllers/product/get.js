import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      msg: "Lấy danh sách sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Lấy sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};
