import React from "react";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import Herocarousel from "@/components/Herocarousel";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
const Home = async () => {
	const allProducts = await getAllProducts();
	return (
		<>
			<section className="px-6 md:px-20 py-24 border-0">
				<div className="flex max-xl:flex-col gap-16">
					<div className="flex flex-col gap-16">
						<p className="small-text">
							Smart Shopping Starts Here
							<Image
								src="/assets/icons/arrow-right.svg"
								alt="arrow-right"
								width={28}
								height={28}
							/>
						</p>
						<h1 className="head-text">
							Unleash the power 🔥 of{" "}
							<strong className="text-6xl">
								{" "}
								Price
								<span className="text-primary">TrackEr</span>
							</strong>
						</h1>
						<p className="body-text">
							PriceTrackEr is a free tool ⚙️ that helps you shop smart 🧠 and
							save big. Tell us what you’re 🫵 looking for and we’ll show you the
							lowest price 💰 available online.
						</p>
						<Searchbar />
					</div>
					<Herocarousel />
				</div>
			</section>
			<section className="trending-section">
				<h2 className="section-text">Trending</h2>
				<div className="flex flex-wrap gap-x-8 gap-y-16">
					{allProducts?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			</section>
		</>
	);
};

export default Home;
