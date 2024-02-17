import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		imageURL: {
			type: String,
			required: true,
		},
		currentPrice: {
			type: Number,
			required: true,
		},
		originalPrice: {
			type: Number,
			required: true,
		},
		priceHistory: [
			{
				price: { type: Number, required: true },
				date: { type: Date, default: Date.now() },
			},
		],
		lowestPrice: {
			type: Number,
		},
		highestPrice: {
			type: Number,
		},
		averagePrice: {
			type: Number,
		},
		discountRate: {
			type: Number,
		},
		currency: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		category: {
			type: String,
			default: "Other",
		},
		reviews: [
			{
				type: String,
				default: [],
			},
		],
		reviewsCount: {
			type: Number,
			default: 0,
		},
		stars: {
			type: Number,
			default: 5,
		},
		outOfStock: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				email: {
					type: String,
					required: true,
				},
			},
		],
		default: [],
	},
	{ timestamps: true }
);
const Products =
	mongoose.models.Product || mongoose.model("Product", productSchema);

export default Products;
