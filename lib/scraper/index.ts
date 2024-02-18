import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils/extractPrice";
import { extractCurrency } from "../utils/extractCurrency";
import { extractDiscountRate } from "../utils/extractDiscountRate";
import { extractDescription } from "../utils/extractDescription";
import { extractReviewsCount } from "../utils/extractReviewsCount";
import { extractStars } from "../utils/extractStars";
import { extractReviews } from "../utils/extractReviews";
import { summarizedDescription } from "../utils/summarizeDescription";

export async function scrapeAmazonProduct(url: string) {
	if (!url) return;
	//bright Data configuration
	const username = String(process.env.BRIGHT_DATA_USERNAME);
	const password = String(process.env.BRIGHT_DATA_PASSWORD);
	const port = process.env.BRIGHT_DATA_PORT;
	const sessionID = Math.floor(Math.random() * 1000000000) || 0;
	const options = {
		auth: {
			username: `${username}-zone-${sessionID}`,
			password: password,
		},
		host: "brd.superproxy.io",
		port: port,
		rejectUnauthorized: false,
	};
	try {
		const response = await axios.get(url, options);
		const $ = cheerio.load(response.data);
		const title = $("#productTitle").text().trim();

		//currentPrice
		var currentPrice = extractPrice(
			$("span.a-price-whole"),
			$("#tp_price_block_total_price_in"),
			$(".comparison_baseitem_column .a-color-price"),
			$(".comparison_baseitem_column .a-text-bold")
		);
		//originalPrice
		// const buyBoxAccordion = $("#buyBoxAccordion");
		// const priceElement = buyBoxAccordion.find(".a-color-price");
		// console.log(priceElement);
		const originalPrice = extractPrice(
			$(".basisPrice .a-price .a-offscreen"),
			$(".basisPrice .a-text-price .a-offscreen")
		);
		//discountRate
		const discountRate = extractDiscountRate($(".savingsPercentage"));
		// instock or outOfStock
		const outOfStock =
			$("#availability span").text().trim().toLowerCase() ===
			"currently unavailable";

		// currency
		const currency = extractCurrency($(".a-price-symbol"));
		//image
		const images =
			$("#imgB1kFront").attr("data-a-dynamic-image") ||
			$("#landingImage").attr("data-a-dynamic-image") ||
			"{}";
		const imageURLs = Object.keys(JSON.parse(images));

		//description
		const description: string = extractDescription($);
		// console.log(summarizedDescription);
		let summarizedDescriptionText: string =
			"title of the product is : " + title;
		if (description) {
			summarizedDescriptionText += "description of the product :" + description;
			summarizedDescriptionText = await summarizedDescription(
				summarizedDescriptionText
			);
		}
		//category
		const productCategory = $("#nav-subnav").attr("data-category")?.trim();

		//reviews
		// const reviews = extractReviews($);
		const reviews = "";
		//reviewsCount
		const reviewsCount = extractReviewsCount($);

		//stars
		const stars = extractStars($);

		//construct data object
		if (currentPrice === "0") {
			currentPrice = originalPrice;
		}
		const data = {
			url,
			currency: currency || "₹", //default currency is INR
			imageURL: imageURLs[0],
			title,
			//price
			currentPrice: Number(currentPrice) || Number(originalPrice),
			originalPrice: Number(originalPrice) || Number(currentPrice),
			priceHistory: [],
			highestPrice: Number(originalPrice) || Number(currentPrice),
			lowestPrice: Number(currentPrice) || Number(originalPrice),
			averagePrice: Number(currentPrice) || Number(originalPrice),
			discountRate: Number(discountRate),
			//about Product
			description: summarizedDescriptionText || description,
			category: productCategory || "other",
			reviews: reviews || [],
			reviewsCount: Number(reviewsCount) || 0,
			stars: stars || 0,
			outOfStock,
		};
		//console.log(data);
		return data;
		// console.log(response.data);
	} catch (error: any) {
		throw new Error(`Error scraping amazon product: ${error}`);
	}
}
