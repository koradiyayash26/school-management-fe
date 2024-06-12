import { MENU } from "@/constant";
import { Bell, ChevronLeft, ChevronRight, Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import Logout from "./logout";

function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 overflow-auto sticky top-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Thinker PVT LTD</span>
          </NavLink>
        </div>
        <div className="flex-1 mt-[10px]">
          <nav className="grid gap-2 items-start px-2 text-sm  font-medium lg:px-4">
            {MENU.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-foreground transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                }
              >
                {item.icon()}
                {item.lable}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Logout />
        </div>
        {/* sidebar arrow */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:bg-muted cursor-pointer rounded-l-lg">
          <ChevronLeft className="h-6 w-6" />
        </div>
        {/* sidebar arrow */}
      </div>
    </div>
  );
}

export default Sidebar;
