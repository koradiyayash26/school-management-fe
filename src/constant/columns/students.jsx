import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTableRowActions } from "@/components/data-table/row-actions"

export const gender = [
  {
    value: "કુમાર",
    label: "કુમાર",
  },
  {
    value: "કન્યા",
    label: "કન્યા",
  },
];

export const statuses = [
  {
    value: "ચાલુ",
    label: "ચાલુ",
  },
  {
    value: "કમી",
    label: "કમી",
  },
];

export const studentColumns = ({ onEdit, onDelete }) => [
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
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
