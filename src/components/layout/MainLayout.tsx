
import React from "react";
import BottomNav from "./BottomNav";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const MainLayout = ({ children, hideNav = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-16">
        <div className="container px-4 mx-auto max-w-lg">{children}</div>
      </main>
      {!hideNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

export default MainLayout;
