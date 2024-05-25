import { LoginForm } from "@/components/dashboard/login";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notfound from "./components/dashboard/Notfound";
import Home from "./components/dashboard/home";
import DashboardLayout from "./components/layouts";
import StudentEdit from "./components/student/student-edit";
import StudentAddFrom from "./components/student/student-add";
import StandardInfo from "./components/standard/standard-info";
import GeneralRegister from "./components/general-register";
import Standard from "./components/standard";
import BonafideCertificate from "./components/school";
import Bonafide from "./components/school/bonafide";
import BirthCertificate from "./components/school/birth-certificate";
import MyDocument from "./components/pdf";
import FeesType from "./components/payment";
import FeeTypesAdd from "./components/payment/feetype-add";
import FeetypeUpdate from "./components/payment/feetype-update";
import ExamMarks from "./components/student/exam";
import ExamUpdate from "./components/student/exam/exam-update";
import ExamMarksAdd from "./components/student/exam/exam-add";
import HistoricalFees from "./components/payment/historical-fees";
import HistoricalFeesAdd from "./components/payment/historical-fees/historical-fee-add";
import Reports from "./components/school/reports";

const App = () => {
  return (
    <>
      <div className="App">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Home />} />
                  <Route element={<GeneralRegister />} path="/student/" />
                  <Route element={<StudentAddFrom />} path="/student/add" />
                  <Route element={<StudentEdit />} path="/student/edit/:id" />
                  <Route element={<Standard />} path="/standard" />
                  <Route element={<StandardInfo />} path="/standard/:id" />
                  <Route
                    element={<BonafideCertificate />}
                    path="/certificate/"
                  />
                  <Route element={<Bonafide />} path="/bonafide/:id" />
                  <Route element={<BirthCertificate />} path="/birth/:id" />
                  <Route element={<MyDocument />} path="/pdf" />
                  <Route element={<FeesType />} path="/fee-type" />
                  <Route element={<FeeTypesAdd />} path="/fee-type/add" />
                  <Route
                    element={<FeetypeUpdate />}
                    path="/fee-type/edit/:id"
                  />
                  <Route element={<ExamMarks />} path="/exam" />
                  <Route element={<ExamMarksAdd />} path="/exam/add" />
                  <Route element={<ExamUpdate />} path="/exam/edit/:id" />
                  <Route element={<HistoricalFees />} path="/historical-fee" />
                  <Route
                    element={<HistoricalFeesAdd />}
                    path="/historical-fee/add"
                  />
                  <Route element={<Reports />} path="/report" />
                  <Route element={<Notfound />} path="*" />
                </Route>
              </Route>
              <Route element={<LoginForm />} path="/login" />
            </Routes>
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;
