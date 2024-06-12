import { MobileSidebar } from "./mobile-sidebar";
import { LifeBuoy, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-mode-toggle";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const userName = localStorage.getItem("user").charAt(0).toLocaleUpperCase();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <div className="w-full flex-1"></div>
      <ModeToggle />
      <Sheet>
        {/* sheet */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-black dark:border-white"
            >
              {userName}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* sheet profille trigger */}
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </SheetTrigger>
            {/* sheet profille trigger */}
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* sheet */}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription className="text-left">
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-right">
                UserName
              </Label>
              <Input
                id="name"
                onChange={(e) => e.target.value}
                value="Admin"
                className="col-span-3"
              />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="md:text-right">
                Password
              </Label>
              <Input
                id="username"
                onChange={(e) => e.target.value}
                value="87857"
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
