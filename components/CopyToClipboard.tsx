"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
	linkToCopy: string;
}
const CopyToClipboard = ({ linkToCopy }: Props) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(linkToCopy);
			setIsCopied(true);
			toast.success("Copied to clipboard");
			setTimeout(() => {
				setIsCopied(false);
			}, 1000);
		} catch (error) {
			console.error("Unable to copy to clipboard:", error);
		}
	};

	return (
		<div
			className="p-2 bg-white-200 rounded-10"
			onClick={handleCopyToClipboard}
			style={{ cursor: "pointer" }}>
			<Image src="/assets/icons/share.svg" alt="share" width={20} height={20} />
		</div>
	);
};

export default CopyToClipboard;
