import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Careers from "./pages/Careers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import Jobs from "./pages/admin/Jobs";
import AdminLeaves from "./pages/admin/Leaves";
import AdminHolidays from "./pages/admin/Holidays";
import AdminAttendance from "./pages/admin/Attendance";
import AdminPayroll from "./pages/admin/Payroll";
import AdminSettings from "./pages/admin/Settings";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeLeaves from "./pages/employee/Leaves";
import EmployeeHolidays from "./pages/employee/Holidays";
import EmployeePayroll from "./pages/employee/Payroll";
import EmployeeProfile from "./pages/employee/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/jobs" element={<Jobs />} />
          <Route path="/admin/leaves" element={<AdminLeaves />} />
          <Route path="/admin/holidays" element={<AdminHolidays />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/leaves" element={<EmployeeLeaves />} />
          <Route path="/employee/holidays" element={<EmployeeHolidays />} />
          <Route path="/employee/payroll" element={<EmployeePayroll />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
