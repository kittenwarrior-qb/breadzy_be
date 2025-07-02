import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// PUT /api/products/:id
export const updateProductById = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Không tìm thấy sản phẩm" });
  }
  res.status(StatusCodes.OK).json(updated);
};

// PUT /api/products/update-image/:id
export const updateProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Không tìm thấy file ảnh",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Không tìm thấy sản phẩm",
      });
    }

    product.image = imageUrl;
    await product.save();

    return res.status(StatusCodes.OK).json({
      msg: "Cập nhật ảnh sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error("Lỗi cập nhật ảnh sản phẩm:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Lỗi phía server",
    });
  }
};