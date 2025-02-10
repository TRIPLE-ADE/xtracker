import React from "react";

import { Sidebar, Header, BottomNav } from "@/app/components";
import { ThemeProvider } from "@/shared/theme-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <div className={`min-h-screen flex bg-background text-foreground`}>
        {/* Sidebar (Visible only on desktop) */}
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-56">
          <Header />
          {/* Main Content */}
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>
        {/* Bottom Navigation (Visible only on mobile) */}
        <BottomNav />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
