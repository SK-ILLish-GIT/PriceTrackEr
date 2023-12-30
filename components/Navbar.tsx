import Link from "next/link";
import Image from "next/image";
import React from "react";

const navIcons = [
	{
		src: "/assets/icons/search.svg",
		alt: "search",
	},
	{
		src: "/assets/icons/black-heart.svg",
		alt: "wishlist",
	},
	{
		src: "/assets/icons/user.svg",
		alt: "user",
	},
];
const Navbar = () => {
	return (
		<header className="w-full">
			<nav className="nav">
				<Link href="/" className="flex items-center gap-1">
					<Image
						src="/assets/icons/logo.svg"
						alt="logo"
						width={28}
						height={28}
					/>
					<p className="nav-logo">
						<strong>
							Price
							<span className="text-primary">TrackEr</span>
						</strong>
					</p>
				</Link>
				<div className="flex items-center gap-6">
					{navIcons.map((icon, index) => (
						<Image
							key={index}
							src={icon.src}
							alt={icon.alt}
							width={28}
							height={28}
						/>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
