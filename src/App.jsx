import { ThemeProvider } from "@/components/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts";
import Notfound from "./components/not-found";
import FeesType from "./components/payment";
import FeeTypesAdd from "./components/payment/feetype-add";
import FeetypeUpdate from "./components/payment/feetype-update";
import HistoricalFees from "./components/payment/historical-fees";
import HistoricalFeesAdd from "./components/payment/historical-fees/historical-fee-add";
import MyDocument from "./components/pdf";
import ProtectedRoutes from "./components/protected-routes";
import BirthCertificatePage from "./pages/certificate/birth-certificate-page";
import BonafideCertificatePage from "./pages/certificate/bonafide-certificate-page";
import CertificatePage from "./pages/certificate/certificate-page";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import StandardDetailPage from "./pages/standard/standard-detail-page";
import StandardPage from "./pages/standard/standard-page";
import StudentsPage from "./pages/students/students-page";
import StudentAddPage from "./pages/students/student-add-page";
import StudentEditPage from "./pages/students/student-edit-page";
import ExamMarksPage from "./pages/exam/exam-page";
import ExamMarksAddPage from "./pages/exam/exam-add-page";
import ExamMarksEditPage from "./pages/exam/exam-edit-page";

const App = () => {
  return (
    <>
      <div className="App">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<HomePage />} />
                  <Route element={<StudentsPage />} path="/student/" />
                  <Route element={<StudentAddPage />} path="/student/add" />
                  <Route
                    element={<StudentEditPage />}
                    path="/student/edit/:id"
                  />
                  <Route element={<StandardPage />} path="/standard" />
                  <Route
                    element={<StandardDetailPage />}
                    path="/standard/:id"
                  />
                  <Route element={<CertificatePage />} path="/certificate/" />
                  <Route
                    element={<BonafideCertificatePage />}
                    path="/bonafide/:id"
                  />
                  <Route element={<BirthCertificatePage />} path="/birth/:id" />
                  <Route element={<MyDocument />} path="/pdf" />
                  <Route element={<FeesType />} path="/fee-type" />
                  <Route element={<FeeTypesAdd />} path="/fee-type/add" />
                  <Route
                    element={<FeetypeUpdate />}
                    path="/fee-type/edit/:id"
                  />
                  <Route element={<ExamMarksPage />} path="/exam" />
                  <Route element={<ExamMarksAddPage />} path="/exam/add" />
                  <Route element={<ExamMarksEditPage />} path="/exam/edit/:id" />
                  <Route element={<HistoricalFees />} path="/historical-fee" />
                  <Route
                    element={<HistoricalFeesAdd />}
                    path="/historical-fee/add"
                  />
                  <Route element={<Notfound />} path="*" />
                </Route>
              </Route>
              <Route element={<LoginPage />} path="/login" />
            </Routes>
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;
