import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@liveblocks/react-ui/styles.css";
const inter = Outfit({ subsets: ["latin"] });
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
      <Toaster />
      {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
