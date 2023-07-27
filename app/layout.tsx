import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CrispProvider } from "@/components/crisp-provider";
import { ModalProvider } from "@/components/modal-provider";
import { QueryProvider } from "@/components/query-provider";
import { ToasterProvider } from "@/components/toaster-provider";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Genius",
	description: "AI Platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<CrispProvider />
				<body className={font.className}>
					<QueryProvider />
					<ToasterProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
