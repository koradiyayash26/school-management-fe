import CardItem from "@/components/home/card-item";
import ActionsPopupSettings from "@/components/settings/data-table-row-action";
import Spinner from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserList } from "@/hooks/use-settings";
import { Calculator, UserRoundCog, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const headers = [
  // { label: "ID", value: "id" },
  { label: "Username", value: "username" },
  { label: "Role", value: "is_superuser" },
];

const Setting = () => {
  const card = [
    {
      title: "Standard Master",
      path: "/setting/standard-master",
      icon: Users,
    },
    {
      title: "Fee Type Master",
      path: "/setting/fee-type-master",
      icon: Calculator,
    },
  ];

  const { data, isLoading, error, refetch } = useUserList();
  const userList = data || [];

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">SETTINGS</h1>
      <div className="flex flex-1 flex-col gap-3 py-4  items-center md:gap-8 md:p-8">
        <div className="w-full grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8">
          {card.map((item, index) => (
            <CardItem
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </div>
      </div>
      <div className="border-t-2 border-gray-200 w-full my-5"></div>
      <div className="block md:flex md:justify-end gap-2 mb-4">
        <div className="flex gap-2 md:m-0 mt-4">
          <Link to="/setting/user/add">
            <Button>Add User</Button>
          </Link>
        </div>
      </div>
      <ScrollArea className="rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header.label}</TableHead>
              ))}
              <TableHead>Settings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                {headers.map((header) => (
                  <TableCell key={header.value} className="capitalize">
                    {header.value === "is_superuser" ? (
                      <span
                        className={
                          user[header.value]
                            ? "p-2 rounded-full bg-green-600 font-medium"
                            : "p-2 rounded-full bg-gray-500 font-medium"
                        }
                      >
                        {user[header.value] ? "Admin" : "Staff"}
                      </span>
                    ) : (
                      user[header.value] || "None"
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Link to={`/setting/user/details/${user.id}`}>
                    <UserRoundCog className="cursor-pointer w-5 h-5 hover:text-blue-500" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Setting;
