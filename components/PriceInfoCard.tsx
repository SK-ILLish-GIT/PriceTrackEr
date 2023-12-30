import React from "react";
import Image from "next/image";
type Props = {
	title: string;
	iconSrc: string;
	value: string;
	colorTheme: string;
};
const PriceInfoCard = ({ title, iconSrc, value, colorTheme }: Props) => {
	const cardStyle = {
		borderLeft: `2px solid ${colorTheme}`,
		borderBottom: `2px solid ${colorTheme}`,
	};
	return (
		<div className={`price-info_card`} style={cardStyle}>
			<p className="text-base text-black-100">{title}</p>
			<div className="flex gap-1">
				<Image src={iconSrc} alt={title} width={24} height={24} />
				<p className="text-2xl font-bold text-secondary">{value}</p>
			</div>
		</div>
	);
};

export default PriceInfoCard;
