import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddStudent from "../pages/AddStudent";
import StudentDirectory from "../pages/StudentDirectory";
import MarkAttendance from "../pages/MarkAttendance";
import Reports from "../pages/Reports";
import Classes from "../pages/Classes";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import EditStudent from "../pages/EditStudent";
import SmartParentAlerts from "../pages/SmartParentAlerts";
import AIAssistant from "../pages/AIAssistant";

import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/add-student"
        element={
          <PrivateRoute>
            <AddStudent />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/students"
        element={
          <PrivateRoute>
            <StudentDirectory />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/attendance"
        element={
          <PrivateRoute>
            <MarkAttendance />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/classes"
        element={
          <PrivateRoute>
            <Classes />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/edit-student/:id"
        element={
          <PrivateRoute>
            <EditStudent />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/parent-alerts"
        element={
          <PrivateRoute>
            <SmartParentAlerts />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/ai-assistant"
        element={
          <PrivateRoute>
            <AIAssistant />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
