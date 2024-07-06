import { DataTable } from "@/components/data-table";
import { UserNav } from "@/components/data-table/user-nav";
import { gender, statuses, studentColumns } from "@/constant/columns/students";
import { useStudents } from "@/hooks/use-student";
import { useCallback, useMemo } from "react";

const settings = {
  enableGlobalFilter: true,
  facetedFilters: [
    {
      column: "gender",
      title: "Gender",
      options: gender,
    },
    {
      column: "status",
      title: "Status",
      options: statuses,
    },
  ],
};

const TaskPage = () => {
  const { data, isLoading, error } = useStudents();
  const students = useMemo(() => [...(data?.data || [])], [data]);

  const onEdit = useCallback((params) => {
    console.log("edit", params);
  }, []);

  const onDelete = useCallback((params) => {
    console.log("delete", params);
  }, []);

  const columns = useMemo(
    () => studentColumns({ onEdit, onDelete }),
    [onEdit, onDelete]
  );

  if (error) return <div>Error</div>;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <Header />
      <DataTable
        data={students}
        columns={columns}
        loading={isLoading}
        settings={settings}
      />
    </div>
  );
};

const Header = () => (
  <div className="flex items-center justify-between space-y-2">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
      <p className="text-muted-foreground">
        Here&apos;s a list of your tasks for this month!
      </p>
    </div>
    <div className="flex items-center space-x-2">
      <UserNav />
    </div>
  </div>
);

export default TaskPage;
