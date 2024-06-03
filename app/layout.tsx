import { Nunito } from "next/font/google";

import Navbar from "@/app/components/layout/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
    title: "Airbnb",
    description: "Airbnb Clone",
};

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
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
