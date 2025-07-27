// models/Product.js
import mongoose from "mongoose";
import slugify from 'slugify';


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  isHot: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name, {
    replacement: '-',
    lower: true,
    strict: true,
  });

  next();
});

export default mongoose.model("Product", productSchema);