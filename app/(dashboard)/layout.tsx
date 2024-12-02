import React from "react";

import { Sidebar, Header, BottomNav } from "./components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-700">
      {/* Sidebar (Visible only on desktop) */}
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-56">
        <Header />
        {children}
      </div>
      {/* Bottom Navigation (Visible only on mobile) */}
      <BottomNav />
    </div>
  );
};

export default layout;
