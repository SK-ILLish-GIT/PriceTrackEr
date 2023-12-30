import Products from "@/lib/models/product.model";
import { connectDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getEmailNotificationType } from "@/lib/utils/getEmailNotificationType";
import {
	getAvaragePrice,
	getHighestPrice,
	getLowestPrice,
} from "@/lib/utils/getHigh_Low_Avg";
import { Product } from "@/types";
import { NextResponse } from "next/server";

export const maxDuration = 5;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
	try {
		connectDB();
		const products = await Products.find();
		if (!products) throw new Error("No products found.");

		//scrape all products and update them in DB
		const updatedProducts = await Promise.all(
			products.map(async (currProduct) => {
				const scrapedProduct = await scrapeAmazonProduct(currProduct.url);
				if (!scrapedProduct) throw new Error("Error scraping product.");

				const updatedPriceHistory: any = [
					...currProduct.priceHistory,
					{
						price: scrapedProduct.currentPrice,
					},
				];
				const product = {
					...scrapedProduct,
					priceHistory: updatedPriceHistory,
					lowestPrice: getLowestPrice(updatedPriceHistory),
					highestPrice: getHighestPrice(updatedPriceHistory),
					avaragePrice: getAvaragePrice(updatedPriceHistory),
				};
				const updatedProduct = await Products.findOneAndUpdate(
					{ url: scrapedProduct.url },
					product
				);
				//check status of the product and send email if required
				const emailNotificationType = getEmailNotificationType(
					scrapedProduct,
					currProduct
				);
				if (emailNotificationType && updatedProduct.users.length > 0) {
					const productInfo = {
						title: updatedProduct.title,
						url: updatedProduct.url,
						imageURL: updatedProduct.imageURL,
					};
					const emailContent = await generateEmailBody(
						productInfo,
						emailNotificationType
					);
					const userEmails = updatedProduct.users.map(
						(user: any) => user.email
					);
					//send email
					await sendEmail(emailContent, userEmails);
				}
				return updatedProduct;
			})
		);
		return NextResponse.json({
			messege: "ok",
			data: updatedProducts,
		});
	} catch (error) {
		throw new Error(`Error in getting and updating all products : ${error}`);
	}
}
