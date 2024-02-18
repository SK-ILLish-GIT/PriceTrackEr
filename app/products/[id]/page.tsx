import CopyToClipboard from "@/components/CopyToClipboard";
import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils/getHigh_Low_Avg";
import { Product } from "@/types";
import { Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
	params: {
		id: string;
	};
};
function generateRandomNumber() {
	return Math.floor(Math.random() * (92 - 89 + 1)) + 89;
}
const ProductDetails = async ({ params: { id } }: Props) => {
	const product: Product = await getProductById(id);
	if (!product) redirect("/");
	const similarProducts = await getSimilarProducts(id);
	const rand = generateRandomNumber();
	return (
		<div className="product-container">
			<div className="flex gap-28 xl:flex-row flex-col">
				<div className="product-image">
					<Image
						src={product.imageURL}
						alt={product.title}
						height={400}
						width={580}
						className="mx-auto"
					/>
				</div>
				<div className="flex-1 flex flex-col bg-slate-200 rounded-lg p-2 md:p-4 m-1 md:m-2 shadow-2xl">
					<div className="flex justify-between items-start gap-5 flex-wrap pb-6">
						<div className="flex flex-col gap-3">
							<p className="text-[28px] text-secondary font-semibold">
								{product.title}
							</p>
							<Link
								href={product.url}
								target="_blank"
								className="text-base text-black opacity-50">
								Visit Product
							</Link>
						</div>
						<div className="flex items-center gap-3">
							<div className="product-hearts">
								<Image
									src="/assets/icons/red-heart.svg"
									alt="Like-count"
									width={20}
									height={20}
								/>
								<p className="text-base font-semibold text-red">
									{product.reviewsCount}
								</p>
							</div>
							{/* <div className="p-2 bg-white-200 rounded-10">
								<Image
									src="/assets/icons/bookmark.svg"
									alt="bookmark"
									width={20}
									height={20}
								/>
							</div> */}
							<CopyToClipboard linkToCopy={product.url} />
						</div>
					</div>

					<div className="product-info">
						<div className="flex flex-col gap-2">
							<p className="text-[34px] text-secondary font-bold">
								{product.currency} {formatNumber(product.currentPrice)}
							</p>
							<p className="text-[21px] text-black opacity-50 line-through">
								{product.currency} {formatNumber(product.originalPrice)}
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex gap-3">
								<div className="product-stars">
									<Image
										src="/assets/icons/star.svg"
										alt="star"
										width={16}
										height={16}
									/>
									<p className="text-sm text-primary-orange font-semibold">
										{product.stars}
									</p>
								</div>
								<div className="product-reviews">
									<Image
										src="/assets/icons/comment.svg"
										alt="comment"
										width={16}
										height={16}
									/>
									<p className="text-sm text-secondary font-semibold">
										{product.reviewsCount} Reviews
									</p>
								</div>
							</div>
							<p className="text-sm text-black opacity-50">
								<span className="text-primary-green font-semibold">
									{rand}
									{"% "}
								</span>
								of buyers have recommended this.
							</p>
						</div>
					</div>
					<div className="my-7 flex flex-col gap-5">
						<div className="flex gap-5 flex-wrap">
							<PriceInfoCard
								title="Current price"
								iconSrc="/assets/icons/price-tag.svg"
								value={`${product.currency} ${formatNumber(
									product.currentPrice
								)}`}
								colorTheme="#000000"
							/>
							<PriceInfoCard
								title="Average price"
								iconSrc="/assets/icons/chart.svg"
								value={`${product.currency} ${formatNumber(
									product.averagePrice
								)}`}
								colorTheme="#BBC5FF"
							/>
							<PriceInfoCard
								title="Highest price"
								iconSrc="/assets/icons/arrow-up.svg"
								value={`${product.currency} ${formatNumber(
									product.highestPrice
								)}`}
								colorTheme="#F87171"
							/>
							<PriceInfoCard
								title="Lowest price"
								iconSrc="/assets/icons/arrow-down.svg"
								value={`${product.currency} ${formatNumber(
									product.lowestPrice
								)}`}
								colorTheme="#BEFFC5"
							/>
						</div>
						<Modal productID={id} />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-16 mt-[-3rem]">
				<div className="flex flex-col gap-5 bg-slate-200 rounded-xl p-1 md:p-5 shadow-2xl">
					<div className="flex flex-col lg:flex-row gap-5 items-center">
						<h3 className="text-4xl text-center text-secondary font-semibold">
							Product Description
						</h3>
						<Chip className="text-md" label="AI GENERATED" color="primary" />
					</div>
					<div className="flex flex-col gap-4">
						{product.description?.split("\n").map((line, index) => (
							<p key={index} className="text-black">
								{line}
							</p>
						))}
					</div>
				</div>
				<button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
					<Image
						src="/assets/icons/bag.svg"
						alt="check"
						width={22}
						height={22}
					/>
					<Link href="/" className="text-base text-white">
						Buy Now
					</Link>
				</button>
			</div>
			{similarProducts && similarProducts.length > 0 && (
				<div className="py-14 flex flex-col gap-2 w-full">
					<h2 className="text-4xl md:text-5xl text-secondary font-semibold pl-2 md:pl-4">
						Similar <span className="text-primary">Products 🔀</span>{" "}
					</h2>
					<div className="flex flex-wrap justify-center gap-10 mt-7 w-full  bg-slate-200 rounded-2xl p-2 pb-4 items-center shadow-2xl">
						{similarProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
