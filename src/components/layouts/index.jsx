import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar");
    setCollapsed(savedState === "true");
  }, []);

  const handleSidebarToggle = () => {
    setCollapsed((prev) => !prev);
    localStorage.setItem("sidebar", !collapsed);
  };

  return (
    <div className={`grid min-h-screen w-full ${collapsed ? 'md:grid-cols-[80px_1fr] transition-all duration-300 ease-in-out' : 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-all duration-300 ease-in-out'}`}>
      <Sidebar collapsed={collapsed} onToggle={handleSidebarToggle} />
      <div className="flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
