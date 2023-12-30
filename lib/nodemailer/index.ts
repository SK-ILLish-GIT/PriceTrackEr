"use server";
import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";

const Notification = {
	WELCOME: "WELCOME",
	CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
	LOWEST_PRICE: "LOWEST_PRICE",
	THRESHOLD_MET: "THRESHOLD_MET",
};
export async function generateEmailBody(
	product: EmailProductInfo,
	type: NotificationType
) {
	const THRESHOLD_PERCENTAGE = 40;
	// Shorten the product title
	const shortenedTitle =
		product.title.length > 20
			? `${product.title.substring(0, 20)}...`
			: product.title;

	let subject = "";
	let body = "";

	switch (type) {
		case Notification.WELCOME:
			subject = `Welcome to Price TrackEr Tracking for ${shortenedTitle}`;
			body = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; background-color: #f8f8f8; text-align: center;">
			<h2 style="color: #333; margin-bottom: 15px;">Welcome to Price TrackEr 🚀</h2>
			<p style="color: #333;">You are now tracking <strong>${shortenedTitle}}</strong>.</p>
			<p style="color: #333;">Here's an example of how you'll receive updates:</p>
	
			<div style="border: 1px solid #ddd; padding: 15px; background-color: #fff; text-align: left;">
				<h3 style="color: #333; margin-bottom: 10px;">${shortenedTitle}} is back in stock!</h3>
				<p style="color: #555;">We're excited to let you know that ${shortenedTitle}} is now back in stock.</p>
				<p style="color: #555;">Don't miss out - <a href="${product.url}" target="_blank" style="color: #007BFF; text-decoration: none;">buy it now</a>!</p>
				<img src="${product.imageURL}" alt="Product Image" style="max-width: 100%; max-height: 200px; margin-top: 15px;" />
			</div>
	
			<p style="color: #333; margin-top: 15px;">Stay tuned for more updates on ${shortenedTitle}} and other products you're tracking.</p>
		</div>
		`;
			break;

		case Notification.CHANGE_OF_STOCK:
			subject = `${shortenedTitle} is now back in stock!`;
			body = `
          <div>
            <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
            <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
          </div>
        `;
			break;

		case Notification.LOWEST_PRICE:
			subject = `Lowest Price Alert for ${shortenedTitle}`;
			body = `
          <div>
            <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
            <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
          </div>
        `;
			break;

		case Notification.THRESHOLD_MET:
			subject = `Discount Alert for ${shortenedTitle}`;
			body = `
          <div>
            <h4>Hey, ${product.title} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
            <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
          </div>
        `;
			break;

		default:
			throw new Error("Invalid notification type.");
	}

	return { subject, body };
}

const transporter = nodemailer.createTransport({
	pool: true,
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
});
export const sendEmail = async (
	emailContent: EmailContent,
	sendTo: string[]
) => {
	const mailOptions = {
		from: {
			name: "PriceWise",
			address: String(process.env.EMAIL_ADDRESS),
		},
		to: sendTo,
		subject: emailContent.subject,
		html: emailContent.body,
	};

	transporter.sendMail(mailOptions, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email Send Successfully !", info);
		}
	});
};
