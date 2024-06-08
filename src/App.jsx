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
import PaymentReceiptPage from "./pages/payment/payment-receipt-page";
import PaymentFeeFormPage from "./pages/payment/payment-fee-form-page";
import SchoolStudentPage from "./pages/school-student/school-student-page";
import SchoolStudentAddPage from "./pages/school-student/school-student-add-page";
import SchoolStudentUpdatePage from "./pages/school-student/school-student-update-page";
import CustomTable from "./components/data-table";
import StudentHistoricalPage from "./pages/student-historical/student-historical-page";
import StudentUpdatePage from "./pages/student-update/student-update-page";
import StudentUpdateAddPage from "./pages/student-update/student-update-add-page";
import StudentUpdateStdYearPage from "./pages/student-update/student-update-std-year-page";
import FeesAssingPage from "./pages/fee/fee-assing-page";

const App = () => {
  return (
    <>
      <div className="App">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              <Route path="/data-table" element={<CustomTable />} />
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
                  <Route
                    element={<FeesAssingPage />}
                    path="/fee-type/:id/:std/:year/student-assign"
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
                  <Route
                    element={<SchoolStudentPage />}
                    path="/school-student"
                  />
                  <Route
                    element={<SchoolStudentAddPage />}
                    path="/school-student/add"
                  />
                  <Route
                    element={<SchoolStudentUpdatePage />}
                    path="/school-student/edit/:id"
                  />
                  <Route
                    element={<StudentHistoricalPage />}
                    path="/educational"
                  />
                  <Route element={<StudentUpdatePage />} path="/update" />
                  <Route
                    element={<StudentUpdateAddPage />}
                    path="/update/add"
                  />
                  <Route
                    element={<StudentUpdateStdYearPage />}
                    path="/update/students/:std/:year"
                  />
                  <Route element={<PaymentsPage />} path="/payment" />
                  <Route
                    element={<PaymentFeeFormPage />}
                    path="/payment/:id/:year"
                  />
                  <Route element={<PaymentReceiptPage />} path="/receipt/:id" />
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
