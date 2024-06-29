import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { students_columns } from "./components/columns";
import { useStudents } from "@/hooks/use-student";
import { o_gender, o_statuses } from "./data/data";

const settings = {
  enableGlobalFilter: true,
  facetedFilters: [
    {
      column: "gender",
      title: "Gender",
      options: o_gender,
    },
    {
      column: "status",
      title: "Status",
      options: o_statuses,
    },
  ],
};

const CustomTable = () => {
  const { data, isLoading, error } = useStudents();
  const students = [...(data?.data || [])];

  // console.log(students);
  if (error) return <div>Error</div>;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <Header />
      <DataTable
        data={students}
        columns={students_columns}
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

export default CustomTable;
