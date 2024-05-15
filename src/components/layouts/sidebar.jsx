import { Bell, Calculator, ClipboardList, Home, IndianRupee, Medal, NotebookPen, Package2, StickyNote, Users, UsersRound, } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import Logout from './logout'
const menu = [
    {
        lable: "Home",
        path: '/',
        icon: () => <Home className="h-4 w-4" />

    },
    {
        lable: "STANDARD",
        path: '/standard',
        icon: () => <Users className="h-4 w-4" />
    },
    {
        lable: "GENERAL REGISTER",
        path: '/student',
        icon: () => <ClipboardList className="h-4 w-4" />
    },
    {
        lable: "STUDENT",
        path: '/update',
        icon: () => <UsersRound className="h-4 w-4" />
    },
    {
        lable: "STUDENT HISTORICAL",
        path: '/history',
        icon: () => <NotebookPen className="h-4 w-4" />
    },
    {
        lable: "FEES",
        path: '/fee-type',
        icon: () => <Calculator className="h-4 w-4" />
    },
    {
        lable: "PAYMENT",
        path: '/payment',
        icon: () => <IndianRupee className="h-4 w-4" />
    },
    {
        lable: "REPORT",
        path: '/report',
        icon: () => <StickyNote className="h-4 w-4" />
    },
    {
        lable: "EXAM",
        path: '/exam',
        icon: () => <Medal className="h-4 w-4" />
    }
]
function Sidebar() {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2 overflow-auto sticky top-0">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
                    <NavLink to="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Thinker PVT LTD</span>
                    </NavLink>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1 mt-[10px]">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {/* className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname == item.path ? "bg-muted text-foreground" : "")} */}

                        {menu.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-foreground transition-all hover:text-primary" : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                }
                            >
                                {item.icon()}
                                {item.lable}
                            </NavLink>
                        ))}
                        {/* <NavLink
                            to="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Medal className="h-4 w-4" />
                            Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </NavLink>
                    */}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Logout />
                </div>
            </div>
        </div >
    )
}

export default Sidebar