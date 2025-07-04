import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const pageSize = 10;
    const query = search
      ? { slug: { $regex: search, $options: "i" } }
      : {};

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(StatusCodes.OK).json({
      msg: "Lấy danh sách sản phẩm thành công",
      data: products,
      pagination: {
        total,
        page: Number(page),
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
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
