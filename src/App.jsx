import { ThemeProvider } from "@/components/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts";
import Notfound from "./components/not-found";
import HistoricalFeesPage from "./pages/historical-fees/historical-fees-page";
import HistoricalFeesAddPage from "./pages/historical-fees/historical-fee-add-page";
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
import ReportsPage from "./pages/report/reports-page";
import ReportDetailsPage from "./pages/report/report-detail-page";
import PaymentsPage from "./pages/payment/payments-page";
import FeesTypePage from "./pages/fee/fees-page";
import FeetypeUpdatePage from "./pages/fee/fee-update-page";
import FeeTypesAddPage from "./pages/fee/fee-add-page";

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
                  <Route element={<FeesTypePage />} path="/fee-type" />
                  <Route element={<FeeTypesAddPage />} path="/fee-type/add" />
                  <Route
                    element={<FeetypeUpdatePage />}
                    path="/fee-type/edit/:id"
                  />
                  <Route element={<ExamMarksPage />} path="/exam" />
                  <Route element={<ExamMarksAddPage />} path="/exam/add" />
                  <Route
                    element={<ExamMarksEditPage />}
                    path="/exam/edit/:id"
                  />
                  <Route
                    element={<HistoricalFeesPage />}
                    path="/historical-fee"
                  />
                  <Route
                    element={<HistoricalFeesAddPage />}
                    path="/historical-fee/add"
                  />
                  <Route element={<ReportsPage />} path="/report" />
                  <Route
                    element={<ReportDetailsPage />}
                    path="/report/standard/:id"
                  />
                  <Route element={<PaymentsPage />} path="/payment" />
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
