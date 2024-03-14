import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-gray-100 bg-no-repeat bg-cover font-Poppins">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}