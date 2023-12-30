import { PriceHistoryItem, Product } from "@/types";
const Notification = {
	WELCOME: "WELCOME",
	CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
	LOWEST_PRICE: "LOWEST_PRICE",
	THRESHOLD_MET: "THRESHOLD_MET",
};
export function getHighestPrice(priceList: PriceHistoryItem[]) {
	let highestPrice = priceList[0];

	for (let i = 0; i < priceList.length; i++) {
		if (priceList[i].price > highestPrice.price) {
			highestPrice = priceList[i];
		}
	}

	return highestPrice.price;
}
export function getLowestPrice(priceList: PriceHistoryItem[]) {
	let lowestPrice = priceList[0];

	for (let i = 0; i < priceList.length; i++) {
		if (priceList[i].price < lowestPrice.price) {
			lowestPrice = priceList[i];
		}
	}

	return lowestPrice.price;
}

export function getAvaragePrice(priceList: PriceHistoryItem[]) {
	const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
	const avaragePrice = sumOfPrices / priceList.length || 0;

	return avaragePrice;
}
export const formatNumber = (num: number = 0) => {
	return num.toLocaleString(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
};
