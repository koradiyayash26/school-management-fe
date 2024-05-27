import FormCard from "@/components/student";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const StudentEditPage = () => {
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <>Loading</>;
  }

 const cleanedData = Object.fromEntries(
    Object.entries(initialData).map(([key, value]) => [key, value === null ? "" : value])
  );
  console.log(cleanedData);
  return <FormCard defaultValues={cleanedData} mode="edit" id={id}/>;
};

export default StudentEditPage;
