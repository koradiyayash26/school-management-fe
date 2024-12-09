import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Logout from "./logout";
import { MENU } from "@/constant";
import { Menu, Package2, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chats-service";
import { useUserPermissions } from "@/contextAPI";
import { useState } from "react";

export const MobileSidebar = () => {
  const { permissions, isSuperuser } = useUserPermissions();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Filter menu items based on permissions
  const filteredMenu = MENU.filter((item) => {
    if (isSuperuser) return true;
    if (!item.Permission) return true;
    return permissions.includes(item.Permission);
  });

  // Get unread messages count
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

  const handleMenuClick = (item, index) => {
    if (item.submenu) {
      setOpenSubmenu(openSubmenu === index ? null : index);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="hidden">
          <SheetTitle className="hidden">Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            Access application features and settings
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
          >
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
            THINKERS PVT LTD
            <span className="sr-only">Acme Inc</span>
          </Link>

          {filteredMenu.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleMenuClick(item, index)}
                className={`${item.submenu ? "cursor-pointer" : ""}`}
              >
                <Link
                  to={item.path || "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={(e) => item.submenu && e.preventDefault()}
                >
                  <div className="relative">
                    {item.icon()}
                    {item.lable === "CHATS" && unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                        <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></div>
                      </div>
                    )}
                  </div>
                  <span className="flex-1 whitespace-nowrap">{item.lable}</span>
                  {item.submenu && (
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        openSubmenu === index ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>

              {item.submenu && openSubmenu === index && (
                <div className="ml-2 mt-1 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="flex items-center border-l gap-4 rounded-none px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <div className="relative">{subItem.icon()}</div>
                      <span className="whitespace-nowrap">{subItem.lable}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto">
          <Logout />
        </div>
      </SheetContent>
    </Sheet>
  );
};
