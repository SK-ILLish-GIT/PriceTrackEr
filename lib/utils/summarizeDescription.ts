import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizedDescription(descriptionText: string) {
	if (!process.env.GEMINI_API_KEY) {
		return console.log("GEMINI_API_KEY is not defined");
	}

	let genAI_API = process.env.GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(genAI_API);
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const prompt =
		`
			"descriptionText" : ${descriptionText},
			"Task" : describe the product with Important Informations in 1 paragraph ( NOT IN POINTS) under 200 words.
		`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	// console.log(response);
	const text = response.text();
	// console.log(text);
	return text;
}
