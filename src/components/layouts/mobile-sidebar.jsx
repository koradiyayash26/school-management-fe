import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Calculator, ClipboardList, Home, IndianRupee, LineChart, Medal, Menu, NotebookPen, Package, Package2, ShoppingCart, StickyNote, Users, Users2, UsersRound } from 'lucide-react'
import { Badge } from '../ui/badge'
import Logout from './logout'


const menu = [
    // {
    //     lable: "HOME",
    //     path: '/',
    //     icon: () => <Home className="h-4 w-4" />

    // },
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


export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        to="/"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 bg-muted text-foreground hover:text-foreground"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    {/* <Link
                        to="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                        <StickyNote className="h-5 w-5" />
                        Orders
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            6
                        </Badge>
                    </Link> */}
                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
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
    )
}
