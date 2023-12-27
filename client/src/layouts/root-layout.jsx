import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "../helper";

import Header from "../components/Header";
import Footer from "../components/Footer";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="font-plus-jakarta-sans bg-background-primary text-foreground">
        <Header />
        <main className="px-6 mx-auto max-w-7xl">
          <ScrollToTop />
          <Outlet />
          <Toaster position="bottom-center" />
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
