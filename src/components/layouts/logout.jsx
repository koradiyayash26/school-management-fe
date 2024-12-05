import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        className={`flex cursor-pointer md:px-3 ${
          collapsed && "justify-center"
        } items-center gap-3 rounded-lg px-1 md:px-auto py-2 text-foreground transition-all hover:text-primary`}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && "Logout"}
      </div>
    </>
  );
}

export default Logout;
