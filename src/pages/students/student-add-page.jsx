import StudentForm from "@/components/student";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StudentAddPage = () => {
  const navigate = useNavigate();


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

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      birth_date: format(new Date(data.birth_date), "yyyy-MM-dd"),
      left_school_date: format(new Date(data.left_school_date), "yyyy-MM-dd"),
    };
    const token = localStorage.getItem("Token");

    // STudent add Api Called Here

    axios
      .post("http://127.0.0.1:8000/students/add/", formattedData, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate("/student");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return <StudentForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export default StudentAddPage;
