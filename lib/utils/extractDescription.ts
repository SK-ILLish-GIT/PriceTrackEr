export function extractDescription($: any) {
	// these are possible elements holding description of the product
	const selectors = [
		// "#product-summary p span",
		"#productDescription p span",
		".a-unordered-list .a-list-item",
		".a-expander-content p",

		// Add more selectors here if needed
	];

	for (const selector of selectors) {
		const elements = $(selector);
		if (elements.length > 0) {
			const textContent = elements
				.map((_: any, element: any) => $(element).text().trim())
				.get()
				.join(". ");
			// console.log(textContent);
			return textContent;
		}
	}

	// If no matching elements were found, return an empty string
	return "";
}
