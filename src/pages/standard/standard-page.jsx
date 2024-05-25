import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { Link } from "react-router-dom";

const StandardPage = () => {
  const [standardDataCount, setStandardDataCount] = useState();
  const getStudentCount = async () => {
    try {
      const token = localStorage.getItem("Token");
      const config = { headers: { Authorization: `Token ${token}` } };
      const response = await axios.get(
        "http://127.0.0.1:8000/standards/standard-counter/",
        config
      );
      setStandardDataCount(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentCount();
  }, []);

  const handleCalculate = (standard, gender) => {
    const boys_count = standard.boys_count;
    const girls_count = standard.girls_count;
    const total_count = boys_count + girls_count;
    if (gender === "MALE") {
      return (boys_count * 100) / total_count;
    } else {
      return (girls_count * 100) / total_count;
    }
  };

  return (
    <>
      <h1 className="uppercase">{"STANDARD'S INFORMATION"}</h1>
      {/* Total Student COunt */}
      <Card className="">
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>The Display Data Of All Students.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <span className="text-sm text-muted-foreground">
                <FaMale className="inline h-5 w-5 mr-1" />
                <Label htmlFor="Boys">Total Male</Label> -&nbsp;
                {standardDataCount ? standardDataCount.total_boys : "0"}
              </span>
              <Progress
                value={
                  standardDataCount
                    ? (standardDataCount.total_boys /
                        standardDataCount.total_students) *
                      100
                    : 0
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className="text-sm text-muted-foreground">
                <FaFemale className="inline h-5 w-5 mr-1" />
                <Label htmlFor="Girls">Total Female</Label> -&nbsp;
                {standardDataCount ? standardDataCount.total_girls : "0"}
              </span>
              <Progress
                value={
                  standardDataCount
                    ? (standardDataCount.total_girls /
                        standardDataCount.total_students) *
                      100
                    : 0
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Total">{"Total Student's"}</Label>
              <span>
                {standardDataCount ? standardDataCount.total_students : "0"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/student">
            <Button>
              <ClipboardList className="h-4 w-4 mr-2" />
              <span className="">Get List</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      {/* Each Standard  Student COunt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardDataCount &&
          standardDataCount.standards.map((standard, index) => (
            <Card className="" key={index}>
              <CardHeader>
                <CardTitle>{standard.standard}</CardTitle>
                <CardDescription>
                  The Display Data Of {standard.standard}&nbsp;Students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-sm text-muted-foreground">
                        <FaMale className="inline h-5 w-5 mr-1" />
                        <Label htmlFor="Male">Male</Label> -&nbsp;
                        {standard.boys_count}
                      </span>
                      <Progress
                        value={handleCalculate(standard, "MALE")}
                        className="w-[60%]"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <span className="text-sm text-muted-foreground">
                        <FaFemale className="inline h-5 w-5 mr-1" />
                        <Label htmlFor="Female">Female</Label> -&nbsp;
                        {standard.girls_count}
                      </span>
                      <Progress
                        value={handleCalculate(standard, "FEMALE")}
                        className="w-[60%]"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Total">Total</Label>
                      <span> {standard.boys_count + standard.girls_count}</span>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={standard.standard}>
                  <Button>
                    <ClipboardList className="h-4 w-4 mr-2" />
                    <span className="">Get List</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default StandardPage;
