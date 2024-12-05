import CardItem from "@/components/home/card-item";
import { useUserPermissions } from "@/contextAPI";
import {
  Cake,
  Calculator,
  ClipboardList,
  Medal,
  NotepadText,
  Plus,
} from "lucide-react";

function HomePage() {
  const { permissions, isSuperuser } = useUserPermissions();

  const card = [
    {
      title: "New Admission Form",
      path: "/student/add",
      icon: Plus,
      Permission: "General Register",
    },
    {
      title: "General Register",
      path: "/student",
      icon: ClipboardList,
      Permission: "General Register",
    },
    {
      title: "Birth Certificate",
      path: "/certificate",
      icon: Cake,
      Permission: "",
    },
    {
      title: "Bonafide Certificate",
      path: "/certificate",
      icon: NotepadText,
      Permission: "",
    },
    {
      title: "Fee",
      path: "/fee-type",
      icon: Calculator,
      Permission: "Fee Types",
    },
    {
      title: "Exam",
      path: "/exam-template",
      icon: Medal,
      Permission: "Exam",
    },
  ];

  const filteredCard = card.filter((item) => {
    if (isSuperuser) return true; // Show all options for superuser
    if (!item.Permission) return true; // Always show items without a permission requirement
    return permissions.includes(item.Permission);
  });

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 py-4  items-center md:gap-8 md:p-8">
        <div className="w-full grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8">
          {filteredCard.map((item, index) => (
            <CardItem
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
