export function extractDiscountRate(element: any) {
	const discountRateText = element.text().replace(/[-%]/g, "");
	return discountRateText;
}
