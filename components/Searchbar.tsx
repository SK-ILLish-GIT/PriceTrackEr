"use client";
import { getProductByUrl, scrapeAndStoreData } from "@/lib/actions";
import { Product } from "@/types";
import React, { FormEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const isValidLink = (link: string) => {
	//must contain amazon
	try {
		const parsedLink = new URL(link);
		const hostname = parsedLink.hostname;
		if (hostname.includes("amazon")) {
			return true;
		}
	} catch (error) {
		return false;
	}
	return false;
};
const Searchbar = () => {
	const [searchLink, setSearchLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//console.log(seachLink);
		let productData;
		const isValid = isValidLink(searchLink);
		if (!isValid) {
			if (searchLink === "") {
				toast.error("Enter a product link");
				return;
			}
			toast.error("Enter valid product link");
			return;
		}
		try {
			setIsLoading(true);
			//scraping data from amazon
			productData = await scrapeAndStoreData(searchLink);
			// console.log(productData);
			toast.success("Product added successfully");
			//redirecting feature ----needed to implement
			// if (productData?._id) {
			// 	window.location.href = productData.url;
			// }
		} catch (error: any) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
			// console.log(productData);
			setSearchLink("");
		}
	};
	return (
		<form className="flex gap-4" onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchLink}
				onChange={(e) => setSearchLink(e.target.value)}
				className="searchbar-input"
				placeholder="Enter your product Link"
			/>
			<button
				className="btn btn-primary searchbar-btn"
				type="submit"
				disabled={searchLink === " "}>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default Searchbar;
