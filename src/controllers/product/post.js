import Product from "../../models/product.model.js";
import Category from "../../models/category.model.js";
import { StatusCodes } from "http-status-codes";

// POST /api/products (có ảnh)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category, 
      isHot,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Thiếu tên, giá hoặc danh mục sản phẩm",
      });
    }

    const foundCategory = await Category.findOne({ slug: category });
    if (!foundCategory) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Danh mục không hợp lệ",
      });
    }

    let image = "";
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category: foundCategory.slug, 
      isHot,
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};
