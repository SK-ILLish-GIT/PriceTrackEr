export function extractReviewsCount($: any) {
	// these are possible elements holding description of the product
	const selectors = [
		"#acrCustomerReviewText",
		"#reviews-medley-footer .a-size-base",
		// Add more selectors here if needed
	];

	for (const selector of selectors) {
		const elements = $(selector);
		if (elements.length > 0) {
			const reviewText = elements.first().text().trim();
			if (reviewText) {
				const cleanPrice = reviewText.replace(/[^\d.]/g, "");

				let firstPrice;

				if (cleanPrice) {
					firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
				}

				return firstPrice || cleanPrice;
			}
		}
	}

	return "";
}
