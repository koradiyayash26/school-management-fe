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
import { useUserPermissions } from "@/contextAPI";
import { useQuery } from "@tanstack/react-query"; // Add this import
import { chatService } from "@/services/chats-service"; // Add this import
import { ScrollArea } from "../ui/scroll-area";

function Sidebar({ collapsed, onToggle }) {
  const { permissions, isSuperuser } = useUserPermissions();
  const filteredMenu = MENU.filter((item) => {
    if (isSuperuser) return true; // Show all options for superuser
    if (!item.Permission) return true; // Always show items without a permission requirement
    return permissions.includes(item.Permission);
  });

  // Add this query to get unread messages count
  const { data: chats = [] } = useQuery({
    queryKey: ["chats"],
    queryFn: chatService.getChatList,
    select: (data) => data || [],
  });

  // Calculate total unread messages
  const unreadCount = chats.reduce(
    (sum, chat) => sum + (chat.unread_count || 0),
    0
  );

  return (
    <>
      <div
        className={`hidden md:block border-r bg-muted/40 ${
          collapsed
            ? "w-[80px] transition-all duration-300 ease-in-out"
            : "w-[220px] lg:w-[280px] transition-all duration-300 ease-in-out"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          {/* if get any scroll problem than set that scroollare to one set up */}
          <ScrollArea className="flex-1">
            <div
              className={`flex h-14 ${
                collapsed && "justify-center"
              } items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0`}
            >
              <NavLink to="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                {!collapsed && (
                  <span className="hover:underline hover:underline-offset-4 uppercase">
                    Thinkers PVT LTD
                  </span>
                )}
              </NavLink>
            </div>
            <div className="flex-1 mt-[10px]">
              <nav
                className={`grid gap-2 ${
                  collapsed && "justify-center"
                } items-start px-2 text-sm font-medium lg:px-4`}
              >
                {filteredMenu.map((item, index) => (
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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              {item.icon()}
                              {item.lable === "CHATS" && unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                                  <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></div>
                                </div>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="p-2 rounded-lg shadow-lg"
                          >
                            <p>{item.lable}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <>
                        <div className="relative">
                          {item.icon()}
                          {item.lable === "CHATS" && unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                              <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></div>
                            </div>
                          )}
                        </div>
                        {!collapsed && item.lable}
                      </>
                    )}
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
          </ScrollArea>
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
