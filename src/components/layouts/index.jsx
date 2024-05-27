import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

function DashboardLayout() {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col overflow-x-hidden">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#27272A66]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
