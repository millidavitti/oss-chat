import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Flex from "@/components/layouts/flex";
import { Toaster } from "sonner";
import { Ban, CheckCheck, Info, TriangleAlert } from "lucide-react";
import { ICON_SIZE } from "@/data/constants";
import { HashLoader } from "react-spinners";
import QueryClientProvider from "@/components/query-client-provider";
import { HydrateAtoms } from "@/components/hydrate-atoms";
import JotaiProvider from "@/components/jotai-provider";
import AlertDialog from "@/components/ui/alert-dialog";
import ChatThreads from "./(root)/components/chat-threads";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OSS Chat",
	description: "Hackathon Chat App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${outfit.variable} font-sans`}>
				<Toaster
					position='top-center'
					toastOptions={{
						classNames: {
							toast: "bg-system-surface",
							title: "text-system-on-surface",
						},
					}}
					icons={{
						success: (
							<CheckCheck
								className='stroke-system-on-surface'
								size={ICON_SIZE}
							/>
						),
						info: (
							<Info className='stroke-system-on-surface' size={ICON_SIZE} />
						),
						warning: (
							<TriangleAlert
								className='stroke-system-on-surface'
								size={ICON_SIZE}
							/>
						),
						error: <Ban className='stroke-system-error' size={ICON_SIZE} />,
						loading: <HashLoader />,
					}}
				/>
				<QueryClientProvider>
					<JotaiProvider>
						<HydrateAtoms>
							<main className='bg-system-surface'>
								<Flex className='w-full h-full'>
									<ChatThreads />
									{children}
									<AlertDialog />
								</Flex>
							</main>
						</HydrateAtoms>
					</JotaiProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
