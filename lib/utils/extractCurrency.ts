export function extractCurrency(element: any) {
	const currencyText = element.text().trim().slice(0, 1);
	if (currencyText) return currencyText;
	else return "";
}
