import { MobileSidebar } from "./mobile-sidebar";
import { Eye, EyeOff, LifeBuoy, LogOut, Settings, User } from "lucide-react";
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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import UserProfileDialogbox from "../user-profile-dialog/dialogbox";
import { useUserProfileUsername } from "@/hooks/use-user-profile";

export default function Header() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  let token = localStorage.getItem("Token");

  const { data, isLoading, refetch } = useUserProfileUsername(token);
  let username = data?.username;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <div className="w-full flex-1"></div>
      <ModeToggle />
      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-black dark:border-white"
            >
              {username[0]}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </SheetTrigger>
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
                // onChange={(e) => e.target.value}
                value={username}
                className="col-span-3"
                disabled
              />
            </div>
            {/* <div className="grid relative md:grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="md:text-right">
                Password
              </Label>
              <Input
                id="username"
                onChange={(e) => e.target.value}
                value={showPass ? "878787" : "******"}
                className="col-span-3 align-middle pr-10"
              />
              {!showPass ? (
                <Eye
                  onClick={() => setShowPass(true)}
                  className="w-4 h-4 absolute right-2 bottom-1 md:bottom-0 md:top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPass(false)}
                  className="w-4 h-4 absolute right-2 bottom-1 md:bottom-0 md:top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              )}
            </div> */}
          </div>
          <SheetFooter>
            <UserProfileDialogbox refetch={refetch} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
