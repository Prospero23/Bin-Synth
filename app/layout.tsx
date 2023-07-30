import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "./providers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "binSynth",
  description: "A synth made by Ben",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full`}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <ToastContainer className='w-full'/>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
