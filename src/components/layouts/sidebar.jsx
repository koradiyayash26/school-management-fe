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
import { useState } from "react"; // Add this import
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FaSchool } from "react-icons/fa";
import { Button } from "../ui/button";

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

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMenuClick = (item, index) => {
    if (item.submenu) {
      setOpenSubmenu(openSubmenu === index ? null : index);
    }
  };

  return (
    <>
      <div
        className={`hidden md:block border-r bg-muted/40 ${
          collapsed
            ? "w-[90px] transition-all duration-300 ease-in-out"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="h-6 w-6"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="208"
                    y1="128"
                    x2="128"
                    y2="208"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  ></line>
                  <line
                    x1="192"
                    y1="40"
                    x2="40"
                    y2="192"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  ></line>
                </svg>
                {/* <FaSchool className="h-6 w-6" /> */}
                {!collapsed && (
                  <span className="truncate hover:underline hover:underline-offset-4 uppercase">
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
                  <div key={index} className="w-full">
                    <div
                      onClick={() => handleMenuClick(item, index)}
                      className={`${item.submenu ? "cursor-pointer" : ""}`}
                    >
                      <NavLink
                        to={item.path || "#"}
                        className={({ isActive }) =>
                          `${
                            isActive && item.path
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground"
                          } 
                          ${
                            !collapsed
                              ? "flex items-center gap-3"
                              : "flex justify-center"
                          } 
                          rounded-lg px-4 py-3 transition-all hover:text-primary`
                        }
                        onClick={(e) => item.submenu && e.preventDefault()}
                      >
                        {collapsed ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="relative flex justify-center cursor-pointer">
                                {item.icon()}
                                {item.lable === "CHATS" && unreadCount > 0 && (
                                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                                    <div className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75" />
                                  </div>
                                )}
                              </div>
                            </PopoverTrigger>
                            {item.submenu && (
                              <PopoverContent
                                side="right"
                                className="w-48 p-2 ml-2"
                                align="start"
                              >
                                <div className="space-y-1">
                                  {item.submenu.map((subItem, subIndex) => (
                                    <NavLink
                                      key={subIndex}
                                      to={subItem.path}
                                      className={({ isActive }) =>
                                        `${
                                          isActive
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground"
                                        } 
                                        flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary`
                                      }
                                    >
                                      {subItem.icon()}
                                      <span>{subItem.lable}</span>
                                    </NavLink>
                                  ))}
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        ) : (
                          <>
                            <div className="relative">
                              {item.icon()}
                              {item.lable === "CHATS" && unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                                  <div className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75" />
                                </div>
                              )}
                            </div>
                            <span className="flex-1">{item.lable}</span>
                            {item.submenu && (
                              <ChevronRight
                                className={`h-4 w-4 transition-transform ${
                                  openSubmenu === index ? "rotate-90" : ""
                                }`}
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    </div>

                    {item.submenu && openSubmenu === index && !collapsed && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground"
                              } 
                              flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary`
                            }
                          >
                            {subItem.icon()}
                            <span className="whitespace-nowrap">
                              {subItem.lable}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="mt-auto md:pl-2.5 lg:p-4">
              <Logout collapsed={collapsed} />
            </div>
            <div
              onClick={onToggle}
              className="absolute top-1/2 right-0 p-1 dark:bg-black border transform -translate-y-1/2 hover:bg-muted cursor-pointer rounded-l-lg"
            >
              {collapsed ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
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
