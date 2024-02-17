export function extractReviews($: any) {
	const selectors = [".reviewText span", "review-text-content span"];
	let reviews: String[] = [];
	let reviewCount = 0;
	for (const selector of selectors) {
		const elements = $(selector);
		if (elements.length > 0) {
			const textContent: String = elements
				.map((_: any, element: any) => $(element).text().trim())
				.get()
				.join("\n");
			// console.log(textContent);
			reviews.push(textContent);
			reviewCount++;
		}
		if (reviewCount >= 10) break;
	}
	reviews = reviews[0].split("\n");
	//sort reviews by length
	reviews.sort((a, b) => b.length - a.length);
	reviews = reviews.slice(0, 3);
	// console.log(reviews);
	return { reviews };
}
