import StudentForm from "@/components/student";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentEditPage = () => {
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const { id } = useParams();

  const getData = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    setIsLoading(true);
    return axios
      .get(`http://127.0.0.1:8000/students/${id}/search/`, config)
      .then(function (response) {
        setInitialData(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      birth_date: format(new Date(data.birth_date), "yyyy-MM-dd"),
      left_school_date: format(new Date(data.left_school_date), "yyyy-MM-dd"),
    };
    const token = localStorage.getItem("Token");

    // STudent Update Api Called Here

    axios
      .patch(`http://127.0.0.1:8000/students/${id}/edit/`, formattedData, {
        headers: {
          Authorization: `Token ${token}`,
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

  if (isLoading) {
    return <>Loading</>;
  }

  const cleanedData = Object.fromEntries(
    Object.entries(initialData).map(([key, value]) => [
      key,
      value === null ? "" : value,
    ])
  );
  console.log(cleanedData);
  return <StudentForm defaultValues={cleanedData} onSubmit={onSubmit}  />;
};

export default StudentEditPage;
