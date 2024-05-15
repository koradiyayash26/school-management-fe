import { BellRing, Cake, Calculator, Check, NotepadText, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Header from '../layouts/header'
import { Link } from "react-router-dom"

function Home() {
    const card = [
        {
            title: "New Admission Form",
            path: "/student/add",
            icon: () => <Plus className="h-16 w-16" />,
        },
        {
            title: "Birth Certificate",
            path: "/certificate",
            icon: () => <Cake className="h-16 w-16" />,
        },
        {
            title: "Bonafide Certificate",
            path: "/certificate",
            icon: () => <NotepadText className="h-16 w-16" />,
        },
        {
            title: "Fee",
            path: "/fee-type",
            icon: () => <Calculator className="h-16 w-16" />,
        },
    ]
    return (
        <>
            <div className="flex flex-1 flex-col gap-3 py-4  items-center md:gap-8 md:p-8">
                <div className="w-full grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8">
                    {card.map((item, index) => (
                        <Card className="w-full" key={index}>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-center space-x-4 rounded-md border mt-[24px] p-4">
                                    {item.icon()}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link to={item.path} className="w-full">
                                    <Button className="w-full">
                                        {item.title}
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home