import { Product } from "@/types";
import { getLowestPrice } from "./getHigh_Low_Avg";
const Notification = {
	WELCOME: "WELCOME",
	CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
	LOWEST_PRICE: "LOWEST_PRICE",
	THRESHOLD_MET: "THRESHOLD_MET",
};
const THRESHOLD_PERCENTAGE = 40;
export const getEmailNotificationType = (
	scrapedProduct: Product,
	currentProduct: Product
) => {
	const lowestPrice = getLowestPrice(currentProduct.priceHistory);

	if (scrapedProduct.currentPrice < lowestPrice) {
		return Notification.LOWEST_PRICE as keyof typeof Notification;
	}
	if (!scrapedProduct.outOfStock && currentProduct.outOfStock) {
		return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
	}
	if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
		return Notification.THRESHOLD_MET as keyof typeof Notification;
	}

	return null;
};
