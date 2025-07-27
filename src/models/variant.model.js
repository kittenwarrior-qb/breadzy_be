import mongoose from "mongoose";
import slugify from "slugify";

const variantSchema = new mongoose.Schema({
  productSlug: { type: String, required: true },

  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,        
  },
  price: {
    type: Number,
    required:true
  },
  gallery: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

variantSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, {
    replacement: "-",
    lower: true,
    strict: true,
  });

  next();
});

export default mongoose.model("Variant", variantSchema);
