import { Bell, Calculator, ClipboardList, Home, IndianRupee, Medal, NotebookPen, Package2, StickyNote, Users, UsersRound, } from 'lucide-react'


export const MENU = [
    {
        lable: "HOME",
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