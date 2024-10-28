import {
  Calculator,
  ClipboardList,
  Home,
  IndianRupee,
  Medal,
  NotebookPen,
  StickyNote,
  Users,
  UsersRound,
} from "lucide-react";

export const MENU = [
  {
    lable: "HOME",
    path: "/",
    icon: () => <Home className="h-4 w-4" />,
    Permission: "",
  },
  {
    lable: "STANDARD",
    path: "/standard",
    icon: () => <Users className="h-4 w-4" />,
    Permission: "Standard Report",
  },
  {
    lable: "GENERAL REGISTER",
    path: "/student",
    icon: () => <ClipboardList className="h-4 w-4" />,
    Permission: "General Register",
  },
  {
    lable: "STUDENT",
    path: "/update",
    icon: () => <UsersRound className="h-4 w-4" />,
    Permission: "Student Update",
  },
  // {
  //   lable: "STUDENT HISTORICAL",
  //   path: "/educational",
  //   icon: () => <NotebookPen className="h-4 w-4" />,
  // },
  // {
  //   lable: "HISTORICAL FEE",
  //   path: "/historical-fee",
  //   icon: () => <IndianRupee className="h-4 w-4" />,
  // },
  {
    lable: "FEES",
    path: "/fee-type",
    icon: () => <Calculator className="h-4 w-4" />,
    Permission: "Fee Types",
  },
  // {
  //   lable: "FEES STUDENT",
  //   path: "/school-student",
  //   icon: () => <UsersRound className="h-4 w-4" />,
  //   Permission: "Student Fees",
  // },
  {
    lable: "PAYMENT",
    path: "/payment",
    icon: () => <IndianRupee className="h-4 w-4" />,
    Permission: "Payment",
  },
  {
    lable: "REPORT",
    path: "/report",
    icon: () => <StickyNote className="h-4 w-4" />,
    Permission: "Fee Report",
  },
  // {
  //   lable: "EXAM",
  //   path: "/exam",
  //   icon: () => <Medal className="h-4 w-4" />,
  // },
  {
    lable: "EXAM",
    path: "/exam-template",
    icon: () => <Medal className="h-4 w-4" />,
    Permission: "Exam",
  },
];

export const studentDetail = {
  grno: 1,
  first_name: "",
  last_name: "",
  middle_name: "",
  mother_name: "",
  birth_date: "",
  birth_place: "",
  religion: "હિન્દુ",
  category: "જનરલ",
  caste: "",
  admission_std: "13",
  admission_date: "2024",
  standard: "13",
  section: "A",
  last_school: "",
  city: "",
  district: "",
  address: "",
  mobile_no: "",
  status: "ચાલુ",
  gender: "કુમાર",
  udise_no: "",
  aadhar_no: "",
  academic_year: "",
  account_no: "",
  name_on_passbook: "",
  bank_name: "",
  ifsc_code: "",
  left_school_std: "",
  reason: "",
  progress: "1",
  assesment: "1",
  left_school_date: "",
  bank_address: "",
};
