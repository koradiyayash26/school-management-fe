import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <>
            <div>
                <div onClick={logout} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary">
                    <LogOut className="h-4 w-4" />Logout
                </div>
            </div>
        </>
    )
}

export default Logout