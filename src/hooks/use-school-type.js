export const getSchoolType = () => {
  const school_type = localStorage.getItem("schoolType") || "Primary";
  return school_type;
};
