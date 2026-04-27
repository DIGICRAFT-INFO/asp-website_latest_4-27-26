const mongoose = require('mongoose');
const slugify = require('slugify');

// ─── Service Model ────────────────────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  subtitle: { type: String },
  description: { type: String },
  image: { type: String },
  icon: { type: String },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });
serviceSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
const Service = mongoose.model('Service', serviceSchema);

// ─── Project Model ────────────────────────────────────────────────────────────
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  image: { type: String },
  category: { type: String, required: true },
  client: { type: String },
  location: { type: String },
  year: { type: Number },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Project = mongoose.model('Project', projectSchema);

// ─── Client/Partner Model ─────────────────────────────────────────────────────
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Client = mongoose.model('Client', clientSchema);

// ─── FAQ Model ─────────────────────────────────────────────────────────────────
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });
const FAQ = mongoose.model('FAQ', faqSchema);

// ─── About Model ──────────────────────────────────────────────────────────────
const aboutSchema = new mongoose.Schema({
  section1: {
    tagline: { type: String },
    title: { type: String },
    paragraphs: [{ type: String }],
    btnText: { type: String },
    btnLink: { type: String },
    image: { type: String },
    highlights: [{ type: String }],
  },
  section2: {
    tagline: { type: String },
    title: { type: String },
    paragraphs: [{ type: String }],
    btnText: { type: String },
    btnLink: { type: String },
    image: { type: String },
  },
  mission: { type: String },
  vision: { type: String },
  whoWeAreCards: [{
    title: { type: String },
    description: { type: String },
    image: { type: String },
    link: { type: String },
  }],
  stats: [{
    value: { type: String },
    label: { type: String },
    icon: { type: String },
  }],
  cta: {
    title: { type: String },
    subtitle: { type: String },
    btn1Text: { type: String },
    btn1Link: { type: String },
    btn2Text: { type: String },
    btn2Link: { type: String },
  },
}, { timestamps: true });
const About = mongoose.model('About', aboutSchema);

// ─── Contact Submission Model ──────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  inquiry: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
  ipAddress: { type: String },
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema);

// ─── Settings Model ────────────────────────────────────────────────────────────
const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'ASP Cranes' },
  logo: { type: String },
  tagline: { type: String },
  email: { type: String },
  phone: [{ type: String }],
  address: { type: String },
  socialLinks: {
    linkedin: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
  },
  footerLinks: {
    quickLinks: [{ label: { type: String }, href: { type: String } }],
    cranes: [{ label: { type: String }, href: { type: String } }],
    services: [{ label: { type: String }, href: { type: String } }],
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
  },
}, { timestamps: true });
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = { Service, Project, Client, FAQ, About, Contact, Settings };
