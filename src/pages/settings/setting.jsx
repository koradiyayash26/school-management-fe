import CardItem from "@/components/home/card-item";
import { Calculator, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    </div>
  );
};

export default Setting;
