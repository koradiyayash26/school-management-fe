import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const headers = [
  { label: "ID", value: "id" },
  { label: "GR Number", value: "grno" },
  // { label: "Last Name", value: "last_name" },
  // { label: "First Name", value: "first_name" },
  // { label: "Middle Name", value: "middle_name" },
  // { label: "Mother Name", value: "mother_name" },
  { label: "Gender", value: "gender" },
  // { label: "Birth Date", value: "birth_date" },
  // { label: "Birth Place", value: "birth_place" },
  { label: "Mobile Number", value: "mobile_no" },
  // { label: "Address", value: "address" },
  // { label: "City", value: "city" },
  // { label: "District", value: "district" },
  // { label: "Standard", value: "standard" },
  // { label: "Section", value: "section" },
  // { label: "Last School", value: "last_school" },
  // { label: "Admission Standard", value: "admission_std" },
  // { label: "Admission Date", value: "admission_date" },
  // { label: "Left School Standard", value: "left_school_std" },
  // { label: "Left School Date", value: "left_school_date" },
  // { label: "Religion", value: "religion" },
  // { label: "Category", value: "category" },
  // { label: "Caste", value: "caste" },
  // { label: "UDISE Number", value: "udise_no" },
  // { label: "Aadhar Number", value: "aadhar_no" },
  // { label: "Account Number", value: "account_no" },
  // { label: "Name on Passbook", value: "name_on_passbook" },
  // { label: "Bank Name", value: "bank_name" },
  // { label: "IFSC Code", value: "ifsc_code" },
  // { label: "Bank Address", value: "bank_address" },
  // { label: "Reason", value: "reason" },
  // { label: "Note", value: "note" },
  // { label: "Assessment", value: "assessment" },
  // { label: "Progress", value: "progress" },
  { label: "Status", value: "status" },
];

export const students_columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const cellValue = row.getValue("id");
      return (
        <div className="max-w-[200px] truncate font-medium">
          {cellValue ? cellValue : "None"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "grno",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GR Number" />
    ),
    cell: ({ row }) => {
      const cellValue = row.getValue("grno");
      return (
        <div className="max-w-[200px] truncate font-medium">
          {cellValue ? cellValue : "N/A"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const cellValue = row.getValue("gender");
      return (
        <div className="max-w-[200px] truncate font-medium">
          {cellValue ? cellValue : "N/A"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorFn: (row) => row.mobile_no || "X",
    id: "mobile_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile Number" />
    ),
    cell: ({ row }) => {
      const cellValue = row.getValue("mobile_no");
      return (
        <div className="max-w-[200px] truncate font-medium">
          {cellValue ? cellValue : "N/A"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const cellValue = row.getValue("status");
      return (
        <div className="max-w-[200px] truncate font-medium">
          {cellValue ? cellValue : "N/A"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
