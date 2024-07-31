import { MENU } from "@/constant"; // Adjust the path as needed
import { ChevronLeft, ChevronRight, Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logout from "./logout";
import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function Sidebar({ collapsed, onToggle }) {
  return (
    <>
      <div
        className={`hidden md:block border-r bg-muted/40 ${
          collapsed
            ? "w-[80px] transition-all duration-300 ease-in-out"
            : "w-[220px] lg:w-[280px] transition-all duration-300 ease-in-out"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2 overflow-auto sticky top-0">
          <div
            className={`flex h-14 ${
              collapsed && "justify-center"
            } items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0`}
          >
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              {!collapsed && <span>Thinker PVT LTD</span>}
            </NavLink>
          </div>
          <div className="flex-1 mt-[10px]">
            <nav
              className={`grid gap-2 ${
                collapsed && "justify-center"
              } items-start px-2 text-sm font-medium lg:px-4`}
            >
              {MENU.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          !collapsed && "flex items-center gap-3"
                        } rounded-lg px-3 py-2 bg-muted text-foreground transition-all hover:text-primary `
                      : `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                          !collapsed && "flex"
                        }`
                  }
                >
                  {collapsed ? (
                    <TooltipProvider>
                      <Tooltip className="">
                        <TooltipTrigger asChild>{item.icon()}</TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="p-2 rounded-lg shadow-lg"
                        >
                          <p>{item.lable}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    item.icon()
                  )}
                  {!collapsed && item.lable}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="mt-auto md:pl-2.5 lg:p-4">
            <Logout collapsed={collapsed} />
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:bg-muted cursor-pointer rounded-l-lg">
            {collapsed ? (
              <ChevronRight onClick={onToggle} className="h-6 w-6" />
            ) : (
              <ChevronLeft onClick={onToggle} className="h-6 w-6" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar;
