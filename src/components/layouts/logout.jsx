import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div
        onClick={logout}
        className="flex cursor-pointer md:px-3 items-center gap-3 rounded-lg px-auto py-2 text-foreground transition-all hover:text-primary"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </div>
    </>
  );
}

export default Logout;
