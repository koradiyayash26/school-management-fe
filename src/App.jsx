import { LoginForm } from "@/components/dashboard/login";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notfound from "./components/dashboard/Notfound";
import Home from "./components/dashboard/home";
import DashboardLayout from "./components/layouts";
import FormCard from "./components/dashboard/form-card";
import StudentEdit from "./components/dashboard/student-edit";
import StudentAddFrom from "./components/dashboard/student-add";
import Standard from "./components/dashboard/standard";
import StandardInfo from "./components/dashboard/standard-info";
import GeneralRegister from "./components/general-register";

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
