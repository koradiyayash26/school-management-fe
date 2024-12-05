import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Logout from "./logout";
import { MENU } from "@/constant";
import { Menu, Package2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chats-service";
import { useUserPermissions } from "@/contextAPI";

export const MobileSidebar = () => {
  const { permissions, isSuperuser } = useUserPermissions();
  
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
  const unreadCount = chats.reduce((sum, chat) => sum + (chat.unread_count || 0), 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold mb-2"
          >
            <Package2 className="h-6 w-6" />
            THINKERS PVT LTD
            <span className="sr-only">Acme Inc</span>
          </Link>

          {filteredMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <div className="relative">
                {item.icon()}
                {item.lable === "CHATS" && unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500">
                    <div className="absolute top-0 left-0 h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></div>
                  </div>
                )}
              </div>
              {item.lable}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Logout />
        </div>
      </SheetContent>
    </Sheet>
  );
};
