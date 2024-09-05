import CardItem from "@/components/home/card-item";
import { Cake, Calculator, ClipboardList, Medal, NotepadText, Plus } from "lucide-react";

function HomePage() {
  const card = [
    {
      title: "New Admission Form",
      path: "/student/add",
      icon: Plus,
    },
    {
      title: "General Register",
      path: "/student",
      icon: ClipboardList,
    },
    {
      title: "Birth Certificate",
      path: "/certificate",
      icon: Cake,
    },
    {
      title: "Bonafide Certificate",
      path: "/certificate",
      icon: NotepadText,
    },
    {
      title: "Fee",
      path: "/fee-type",
      icon: Calculator,
    },
    {
      title: "Exam",
      path: "/exam-template",
      icon: Medal,
    },
  ];
  return (
    <>
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
    </>
  );
}

export default HomePage;
