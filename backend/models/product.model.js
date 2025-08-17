import mongoose from "mongoose";
import slugify from 'slugify';


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: String,
    // categories: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', index: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    isStock: { type: Boolean, default: true },
    variants: [{
        size: Number,
        stock: { type: Boolean, default: true }
    }],
    primaryImage: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        default: []
    }],
    status: {
        type: String,
    },
}, { timestamps: true });

// Generate slug from name
ProductSchema.pre('save', function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = slugify(this.name, {
            lower: true,      // Convert to lowercase
            strict: true,     // Remove special characters
            trim: true        // Remove leading/trailing spaces
        });
    }
    next();
});

// Ensure slug uniqueness
ProductSchema.pre('save', async function (next) {
    if (this.isModified('slug')) {
        let slug = this.slug;
        let count = 1;
        // Check for existing slugs, excluding the current document
        while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
            slug = `${this.slug}-${count++}`;
        }
        this.slug = slug;
    }
    next();
});

// Create text index for search
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ slug: 'text' });
export default mongoose.model('Product', ProductSchema);