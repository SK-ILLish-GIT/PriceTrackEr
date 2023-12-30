import React from "react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
interface Props {
	product: Product;
}
const ProductCard = ({ product }: Props) => {
	console.log(product);
	return (
		<Link href={`/products/${product._id}`} className="product-card">
			<div className="product-card_img-container">
				<Image
					src={product.imageURL}
					alt={product.title}
					className="product-card_img"
					height={200}
					width={200}
				/>
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="product-title">{product.title}</h3>
				<div className="flex justify-between">
					<p className="text-black capitalize opacity-75 text-lg">
						{product.category}
					</p>
					<p className="text-black capitalize font-bold text-lg">
						<span>{product?.currency}</span>
						<span>{product?.currentPrice}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
