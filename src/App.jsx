import { ThemeProvider } from "@/components/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts";
import Notfound from "./components/not-found";
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
import ReportsPage from "./pages/report/reports-page";
import ReportDetailsPage from "./pages/report/report-detail-page";
import PaymentsPage from "./pages/payment/payments-page";
import FeesTypePage from "./pages/fee/fees-page";
import FeetypeUpdatePage from "./pages/fee/fee-update-page";
import FeeTypesAddPage from "./pages/fee/fee-add-page";
import PaymentReceiptPage from "./pages/payment/payment-receipt-page";
import PaymentFeeFormPage from "./pages/payment/payment-fee-form-page";
import StudentHistoricalPage from "./pages/student-historical/student-historical-page";
import StudentUpdatePage from "./pages/student-update/student-update-page";
import StudentUpdateAddPage from "./pages/student-update/student-update-add-page";
import StudentUpdateStdYearPage from "./pages/student-update/student-update-std-year-page";
import FeesAssingPage from "./pages/fee/fee-assing-page";
import Setting from "./pages/settings/setting";
import ExamTemplatePage from "./pages/exam-template/exam-page";
import ExamTemplateEditPage from "./pages/exam-template/exam-edit-page";
import ExamTemplateAddPage from "./pages/exam-template/exam-add-page";
import ExamAssingMarkPage from "./pages/exam-template/exam-assing-mark-page";
import ExamAssingMarkEditPage from "./pages/exam-template/exam-assing-mark-edit-page";
import StandardMasterList from "./pages/settings/standard-master/standard-master-list-page";
import StandardMasterAdd from "./pages/settings/standard-master/standard-master-add-page";
import StandardMasterUpdate from "./pages/settings/standard-master/standard-master-update-page";
import FeeTypeMasterList from "./pages/settings/fee-type-master/fee-type-master-list-page";
import FeeTypeMasterAddPage from "./pages/settings/fee-type-master/fee-type-master-add-page";
import FeeTypeMasterUpdate from "./pages/settings/fee-type-master/fee-type-master-update-page";
import UserAddPage from "./pages/settings/user/user-add-page";
import UserDetailsPage from "./pages/settings/user/user-details-page";
import { UserPermissionsProvider } from "./contextAPI";
import Chats from "./pages/chats";
import AcademicYearList from "./pages/settings/academic-year/academic-year-list-page";
import AcademicYearAddPage from "./pages/settings/academic-year/academic-year-add";
import AcademicYearUpdate from "./pages/settings/academic-year/academic-year-update";

const App = () => {
  return (
    <>
      <div className="App">
        <UserPermissionsProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<HomePage />} />
                    {/* General Register */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="General Register" />
                      }
                    >
                      <Route element={<StudentsPage />} path="/student/" />
                      <Route element={<StudentAddPage />} path="/student/add" />
                      <Route
                        element={<StudentEditPage />}
                        path="/student/edit/:id"
                      />
                    </Route>
                    {/* General Register */}
                    {/*Chats*/}
                    <Route element={<Chats />} path="/chats/" />
                    {/*Chats*/}
                    {/* Standard Report */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Standard Report" />
                      }
                    >
                      <Route element={<StandardPage />} path="/standard" />
                      <Route
                        element={<StandardDetailPage />}
                        path="/standard/:id"
                      />
                    </Route>
                    {/* Standard Report */}
                    {/* Certificate */}
                    <Route element={<CertificatePage />} path="/certificate/" />
                    <Route
                      element={<BonafideCertificatePage />}
                      path="/bonafide/:id"
                    />
                    <Route
                      element={<BirthCertificatePage />}
                      path="/birth/:id"
                    />
                    {/* Certificate */}

                    <Route element={<MyDocument />} path="/pdf" />
                    {/* Fee Types */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Fee Types" />
                      }
                    >
                      <Route element={<FeesTypePage />} path="/fee-type" />
                      <Route
                        element={<FeeTypesAddPage />}
                        path="/fee-type/add"
                      />
                      <Route
                        element={<FeetypeUpdatePage />}
                        path="/fee-type/edit/:id"
                      />
                      <Route
                        element={<FeesAssingPage />}
                        path="/fee-type/:id/:std/:year/student-assign"
                      />
                    </Route>
                    {/* Fee Report */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Fee Report" />
                      }
                    >
                      <Route element={<ReportsPage />} path="/report" />
                      <Route
                        element={<ReportDetailsPage />}
                        path="/report/standard/:id"
                      />
                    </Route>
                    {/* Fee Report */}
                    {/* Student Update History */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Student Update and History" />
                      }
                    >
                      <Route
                        element={<StudentHistoricalPage />}
                        path="/educational"
                      />
                    </Route>
                    {/* Student Update History */}
                    {/* STudent Update */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Student Update and History" />
                      }
                    >
                      <Route element={<StudentUpdatePage />} path="/update" />
                      <Route
                        element={<StudentUpdateAddPage />}
                        path="/update/add"
                      />
                      <Route
                        element={<StudentUpdateStdYearPage />}
                        path="/update/students/:std/:year"
                      />
                    </Route>
                    {/* STudent Update */}
                    {/* Payment */}
                    <Route
                      element={<ProtectedRoutes requiredPermission="Payment" />}
                    >
                      <Route element={<PaymentsPage />} path="/payment" />
                      <Route
                        element={<PaymentFeeFormPage />}
                        path="/payment/:id/"
                      />
                      <Route
                        element={<PaymentReceiptPage />}
                        path="/receipt/:id"
                      />
                    </Route>
                    {/* Payment */}
                    {/* Settings */}
                    <Route
                      element={
                        <ProtectedRoutes requiredPermission="Settings" />
                      }
                    >
                      <Route element={<Setting />} path="/setting" />
                      <Route
                        element={<StandardMasterList />}
                        path="/setting/standard-master"
                      />
                      <Route
                        element={<StandardMasterAdd />}
                        path="/setting/standard-master/add"
                      />
                      <Route
                        element={<StandardMasterUpdate />}
                        path="/setting/standard-master/edit/:id"
                      />
                      <Route
                        element={<FeeTypeMasterList />}
                        path="/setting/fee-type-master"
                      />
                      <Route
                        element={<FeeTypeMasterAddPage />}
                        path="/setting/fee-type-master/add"
                      />
                      <Route
                        element={<FeeTypeMasterUpdate />}
                        path="/setting/fee-type-master/edit/:id"
                      />
                      <Route
                        element={<UserAddPage />}
                        path="/setting/user/add"
                      />
                      <Route
                        element={<UserDetailsPage />}
                        path="/setting/user/details/:id"
                      />
                      <Route
                        element={<AcademicYearList />}
                        path="/setting/academic-year"
                      />
                      <Route
                        element={<AcademicYearAddPage />}
                        path="/setting/academic-year/add"
                      />
                      <Route
                        element={<AcademicYearUpdate />}
                        path="/setting/academic-year/edit/:id"
                      />
                    </Route>
                    {/* Settings */}
                    {/* Exam Template */}
                    <Route
                      element={<ProtectedRoutes requiredPermission="Exam" />}
                    >
                      <Route
                        element={<ExamTemplatePage />}
                        path="/exam-template"
                      />
                      <Route
                        element={<ExamTemplateAddPage />}
                        path="/exam-template/add"
                      />
                      <Route
                        element={<ExamTemplateEditPage />}
                        path="/exam-template/edit/:id"
                      />
                      <Route
                        element={<ExamAssingMarkPage />}
                        path="/exam-template/mark-assign/:std/:id"
                      />
                      <Route
                        element={<ExamAssingMarkEditPage />}
                        path="/exam-template/mark-assign-edit/:std/:id"
                      />
                    </Route>
                    {/* Exam Template */}
                    <Route element={<Notfound />} path="*" />
                  </Route>
                </Route>
                <Route element={<LoginPage />} path="/login" />
              </Routes>
            </Router>
          </ThemeProvider>
        </UserPermissionsProvider>
      </div>
    </>
  );
};

export default App;
