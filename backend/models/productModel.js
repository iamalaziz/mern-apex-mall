import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const ProductCategoryEnum = [
    'Electronics',
    'Clothing',
    'Books',
    'Fresh Fruit',
    'Vegetables',
    'Beauty & Health',
    'Sports',
    'Bread & Bakery',
    'Meat & Fish',
    'Others',
];

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        category: {
            type: String,
            enum: ProductCategoryEnum,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        likesCount: {
            type: Number,
            required: true,
            default: 0,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        salePrice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
