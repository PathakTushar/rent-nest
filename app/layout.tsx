import { Nunito } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";

import ToasterProvider from "./providers/ToasterProvider";
import ClientOnly from "./components/ClientOnly";

export const metadata = {
  title: "RentNest",
  description: "RentNest, which connects travellers",
};

const font = Nunito({
  subsets: ["latin"],
});

// Dynamically import SearchModal to ensure it's client-side only
const SearchModal = dynamic(() => import("./components/modals/SearchModal"), { ssr: false });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/logo.png" /> {/* Update this line with the path to your logo */}
      </head>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
