import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
	title: "PriceTrackEr",
	description:
		"PriceTrackEr is a price tracker for Amazon/Myntra products. It allows you to track the price of any product and notifies you when the price drops.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="max-w-10xl m-auto">
					<Navbar />
					{children}
				</main>
				<ToastContainer />
				<SpeedInsights />
			</body>
		</html>
	);
}
