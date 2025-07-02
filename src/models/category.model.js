import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
