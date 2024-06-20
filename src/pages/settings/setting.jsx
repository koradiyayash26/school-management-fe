import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

const Setting = () => {
  const pageName = [
    { id: 1, name: "Exam" },
    { id: 2, name: "General Register" },
    { id: 3, name: "Student" },
    { id: 4, name: "Historical Fee" },
    { id: 5, name: "Fee History" },
  ];

  const [selectedPages, setSelectedPages] = useState(() => {
    const storedPages = localStorage.getItem("selectedPages");
    return storedPages ? JSON.parse(storedPages) : [];
  });
  const handlePage = (name) => {
    const index = selectedPages.indexOf(name);
    if (index !== -1) {
      setSelectedPages((prevPages) =>
        prevPages.filter((page) => page !== name)
      );
    } else {
      setSelectedPages((prevPages) => [...prevPages, name]);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedPages", JSON.stringify(selectedPages));
  }, [selectedPages]);

  return (
    <div className="w-full">
      <h1>SETTINGS</h1>
      <div className="mt-8">
        <h5 className="capitalize text-[16px]">
          Enable for excel file to upload option.
        </h5>
        <div className="flex items-center space-x-2 mt-4">
          <ul>
            {pageName.map((page) => (
              <li key={page.id}>
                <Checkbox
                  id={page.name}
                  checked={selectedPages.includes(page.name)}
                  onClick={() => handlePage(page.name)}
                  className="mr-2"
                />
                <Label htmlFor={page.name} className="text-center align-middle">
                  {page.name}
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
