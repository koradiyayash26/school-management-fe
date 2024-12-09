import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function Logout({ collapsed }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div
        onClick={logout}
        className={`flex cursor-pointer ${
          collapsed ? "justify-center px-2" : "px-3"
        } items-center gap-3 rounded-lg py-2 text-foreground transition-all hover:text-primary`}
      >
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outlline"
                  size="icon"
                  className="dark:bg-black border"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-40">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button variant="outline" className="w-full px-2 truncate">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </>
  );
}

export default Logout;
