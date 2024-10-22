"use server";

import { Product, User } from "@/types";
import Products from "../models/product.model";
import { connectDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import {
	getLowestPrice,
	getHighestPrice,
	getAveragePrice,
} from "../utils/getHigh_Low_Avg";
import { revalidatePath } from "next/cache";
import { generateEmailBody, sendEmail } from "../nodemailer";

//create or update product
export async function scrapeAndStoreData(pdtUrl: string) {
	if (!pdtUrl) {
		return;
	}
	try {
		connectDB();
		const scrapedProduct = await scrapeAmazonProduct(pdtUrl);
		if (!scrapedProduct) return;
		let currentProduct = scrapedProduct;
		const existingProduct = await Products.findOne({ url: scrapedProduct.url });
		if (existingProduct) {
			const updatedPriceHistory: any = [
				...existingProduct.priceHistory,
				{
					price: scrapedProduct.currentPrice,
				},
			];
			currentProduct = {
				...scrapedProduct,
				priceHistory: updatedPriceHistory,
				lowestPrice: getLowestPrice(updatedPriceHistory),
				highestPrice: getHighestPrice(updatedPriceHistory),
				averagePrice: getAveragePrice(updatedPriceHistory),
				reviewsCount: Math.max(
					existingProduct.reviewsCount,
					scrapedProduct.reviewsCount
				),
			};
			return currentProduct;
		}
		const newProduct = await Products.findOneAndUpdate(
			{ url: scrapedProduct.url },
			currentProduct,
			{ upsert: true, new: true }
		);
		revalidatePath(`/products/${newProduct._id}`);
		return newProduct;
	} catch (error) {
		throw new Error(`Error in Create/Update product Details : ${error}`);
	}
}

//get product by id
export async function getProductById(productID: string) {
	if (!productID) return;
	try {
		connectDB();
		const product = await Products.findOne({ _id: productID });
		if (!product) return;
		return product;
	} catch (error) {
		throw new Error(`Error in getting product Details : ${error}`);
	}
}

//get product by url
export async function getProductByUrl(productUrl: string) {
	if (!productUrl) return;
	try {
		connectDB();
		const product = await Products.findOne({ url: productUrl });
		if (!product) return;
		return product;
	} catch (error) {
		throw new Error(`Error in getting product Details : ${error}`);
	}
}

//get all products
export async function getAllProducts() {
	try {
		connectDB();
		const products = await Products.find();
		if (!products) return;
		return products;
	} catch (error) {
		throw new Error(`Error in getting all products : ${error}`);
	}
}
//get Similar products
export async function getSimilarProducts(productID: string) {
	try {
		connectDB();
		const currentProduct = await Products.findById(productID);
		if (!currentProduct) return;
		const similarProducts = await Products.find({
			_id: { $ne: productID },
			category: currentProduct.category,
		}).limit(3);
		return similarProducts;
	} catch (error) {
		throw new Error(`Error in getting all products : ${error}`);
	}
}

//add email to product
export async function addUserEmailToProduct(
	productID: string,
	userEmail: string
) {
	try {
		const product = await Products.findById(productID);

		if (!product) {
			return;
		}

		const userExists = product.users.some(
			(user: User) => user.email === userEmail
		);

		if (!userExists) {
			product.users.push({ email: userEmail });
			await product.save();

			const emailContent = await generateEmailBody(product, "WELCOME");
			await sendEmail(emailContent, [userEmail]);
		}
	} catch (error) {
		throw new Error(`Error in adding email to product : ${error}`);
	}
}
