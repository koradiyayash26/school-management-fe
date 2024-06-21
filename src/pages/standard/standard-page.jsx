import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaFemale, FaMale } from "react-icons/fa";
import { Link } from "react-router-dom";
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
import { ClipboardList } from "lucide-react";
import { useStandard } from "@/hooks/use-standard";

const StandardPage = () => {
  const { data, isLoading, refetch } = useStandard();
  let standardDataCount = data?.data;

  const calculateProgress = (boysCount, girlsCount, totalCount, gender) => {
    if (gender === "MALE") {
      return (boysCount * 100) / totalCount;
    } else {
      return (girlsCount * 100) / totalCount;
    }
  };

  const [progressValues, setProgressValues] = useState({});

  useEffect(() => {
    if (standardDataCount) {
      const initialProgressValues = {};
      standardDataCount.standards.forEach((standard, index) => {
        initialProgressValues[index] = { male: 0, female: 0 };
      });
      setProgressValues(initialProgressValues);

      const timer = setTimeout(() => {
        const updatedProgressValues = {};
        standardDataCount.standards.forEach((standard, index) => {
          updatedProgressValues[index] = {
            male: calculateProgress(
              standard.boys_count,
              standard.girls_count,
              standard.boys_count + standard.girls_count,
              "MALE"
            ),
            female: calculateProgress(
              standard.boys_count,
              standard.girls_count,
              standard.boys_count + standard.girls_count,
              "FEMALE"
            ),
          };
        });
        setProgressValues(updatedProgressValues);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [standardDataCount]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1 className="uppercase">STANDARD'S INFORMATION</h1>
      {/* Total Student Count */}
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
              <Label htmlFor="Total">Total Student's</Label>
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
      {/* Each Standard Student Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardDataCount &&
          standardDataCount.standards.map((standard, index) => (
            <Card className="" key={index}>
              <CardHeader>
                <CardTitle>
                  {standard.standard == 13 ? "Balvatika" : standard.standard}
                </CardTitle>
                <CardDescription>
                  The Display Data Of{" "}
                  {standard.standard == 13 ? "Balvatika" : standard.standard}
                  &nbsp;Students.
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
                        value={progressValues[index]?.male || 0}
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
                        value={progressValues[index]?.female || 0}
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
