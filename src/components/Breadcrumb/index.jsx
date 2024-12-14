import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export function BreadcrumbComponent({ customItems }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            to="/"
            className="dark:hover:text-white hover:text-black dark:border-b-2 border-b-2 border-transparent dark:hover:border-white hover:border-black transition-colors duration-200"
          >
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {customItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.path ? (
                <Link
                  to={item.path}
                  className="dark:hover:text-white hover:text-black dark:border-b-2 border-b-2 border-transparent dark:hover:border-white hover:border-black transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <BreadcrumbPage className="dark:text-white dark:font-normal font-semibold">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < customItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
