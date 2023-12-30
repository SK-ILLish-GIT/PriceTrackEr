"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const heroImages = [
	{ url: "/assets/images/hero-1.svg", alt: "hero-1" },
	{ url: "/assets/images/hero-2.svg", alt: "hero-2" },
	{ url: "/assets/images/hero-3.svg", alt: "hero-3" },
	{ url: "/assets/images/hero-4.svg", alt: "hero-4" },
	{ url: "/assets/images/hero-5.svg", alt: "hero-5" },
];
const Herocarousel = () => {
	return (
		<div className="hero-carousel">
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				showStatus={false}
				showThumbs={false}
				showArrows={false}
				interval={2000}
				transitionTime={500}>
				{heroImages.map((image) => (
					<div key={image.alt}>
						<Image
							src={image.url}
							alt={image.alt}
							height={484}
							width={484}
							className="object-contain"
						/>
					</div>
				))}
			</Carousel>
			<Image
				src={"/assets/icons/hand-drawn-arrow.svg"}
				alt="hand-drawn-arrow"
				height={250}
				width={250}
				className="max-xl:hidden absolute -left-[30%] bottom-[-5%] z-0"
			/>
		</div>
	);
};

export default Herocarousel;
