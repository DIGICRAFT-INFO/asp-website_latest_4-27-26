const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  subtitle: { type: String },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  imageCaption: { type: String },
  category: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: String, default: 'ASP Cranes Team' },
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 },
  metaTitle: { type: String },
  metaDescription: { type: String },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
