import CardItem from "@/components/home/card-item";
import Spinner from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { studentUpdateBulk } from "@/services/settings-service";
import { useMutation } from "@tanstack/react-query";
import { Calculator, CalendarClock, UserRoundCog, Users } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
    {
      title: "Academic Year",
      path: "/setting/academic-year",
      icon: CalendarClock,
    },
  ];

  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateResponse, setUpdateResponse] = useState(null);

  const { data, isLoading, error, refetch } = useUserList();
  const userList = data || [];

  const mutation = useMutation({
    mutationFn: () => studentUpdateBulk(),
    onSuccess: (data) => {
      console.log(data);
      setUpdateResponse(data.data);
      setIsUpdating(false);
      setIsOpenUpdateDialog(false);
    },
    onError: (error) => {
      setIsUpdating(false);
      toast.error(error.response.data.message);
      setIsOpenUpdateDialog(false);
    },
  });

  const handleStudentUpdate = () => {
    setIsUpdating(true);
    mutation.mutate();
  };

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="w-full p-4">
        <div className="md:flex justify-between">
          <h1 className="text-2xl font-bold mb-6">SETTINGS</h1>
          <div>
            <Dialog
              open={isOpenUpdateDialog}
              onOpenChange={setIsOpenUpdateDialog}
            >
              <DialogTrigger asChild>
                <Button>Update Academic Year</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Update Students Standard
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    Are you sure you want to update student standards and
                    academic year?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button onClick={handleStudentUpdate} disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {updateResponse && (
            <Dialog
              open={!!updateResponse}
              onOpenChange={() => setUpdateResponse(null)}
            >
              <DialogContent className="sm:max-w-[600px] p-6 border rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-center mb-4">
                    Update Summary
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-md">
                    <strong className="text-muted-foreground">Status:</strong>{" "}
                    {updateResponse.message}
                  </p>
                  <p className="text-md">
                    <strong className="text-muted-foreground">
                      Academic Year:
                    </strong>{" "}
                    {updateResponse.academic_year_update.from} to{" "}
                    {updateResponse.academic_year_update.to}
                  </p>
                  <div>
                    <strong className="text-md text-muted-foreground">
                      Update Summary:
                    </strong>
                    <ul className="list-disc pl-6 text-sm">
                      <li>
                        Total Students:{" "}
                        {updateResponse.update_summary.total_students}
                      </li>
                      <li>
                        Updated: {updateResponse.update_summary.updated_count}
                      </li>
                      <li>
                        Graduated:{" "}
                        {updateResponse.update_summary.graduated_count}
                      </li>
                      <li>
                        Failed: {updateResponse.update_summary.failed_count}
                      </li>
                    </ul>
                  </div>
                </div>
                <DialogFooter className="flex justify-center mt-6">
                  <Button
                    onClick={() => setUpdateResponse(null)}
                    className="px-4 py-2 rounded-md"
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
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
                              ? "p-2 rounded-full dark:bg-white dark:text-black bg-black text-white dark:font-bold"
                              : "p-2 rounded-full dark:bg-gray-500  bg-black text-white dark:font-bold"
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
                      <UserRoundCog className="cursor-pointer w-5 h-5 hover:text-gray-400" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default Setting;
