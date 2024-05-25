import React from "react";
import FormCard from ".";

const StudentAddFrom = () => {
  const defaultValues = {
    grno: 0,
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
    account_no: "",
    name_on_passbook: "",
    bank_name: "",
    ifsc_code: "",
    left_school_std: "",
    reason: "",
    progress: "1",
    assesment: "1",
    left_school_date: "2005-04-26",
    bank_address: "",
  };

  return <FormCard defaultValues={defaultValues}/>;
};

export default StudentAddFrom;
