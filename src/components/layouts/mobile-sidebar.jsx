import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Logout from "./logout";
import { MENU } from "@/constant";
import { Menu, Package2 } from "lucide-react";

export const MobileSidebar = () => {
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
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Package2 className="h-6 w-6" />
            THINKERS PVT LTD
            <span className="sr-only">Acme Inc</span>
          </Link>

          {MENU.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {item.icon()}
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
