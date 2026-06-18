import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";

import App from "./App.jsx";
import Users from "./Users.jsx";
import NewUser from "./NewUser.jsx";
import ViewUser from "./ViewUser.jsx";
import WorkStation from "./pages/WorkStation.jsx";
import NewWorkStation from "./pages/NewWorkStation.jsx";
import NewGroup from "./NewGroup.jsx";
import NewLine from "./pages/NewLine.jsx";

import DashBoardLayout from "./layout/DashBoardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Facility from "./pages/Facility.jsx";
import NewFacility from "./pages/NewFacility.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Login */}
      <Route path="/login" element={<App />} />

      {/* Protected Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashBoardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Users />} />

        <Route path="users" element={<Users />} />
        <Route path="new-user" element={<NewUser />} />
        <Route path="edit-user/:userId" element={<NewUser />} />
        <Route path="view-user/:userId" element={<ViewUser />} />

        <Route path="new-group" element={<NewGroup />} />
        <Route path="edit-group/:id" element={<NewGroup />} />

        <Route path="workstation" element={<WorkStation />} />
        <Route path="new-workstation" element={<NewWorkStation />} />
        <Route path="edit-workstation/:id" element={<NewWorkStation />} />

        <Route path="/workstation/new-line" element={<NewLine />} />
        <Route path="/workstation/edit-line/:id" element={<NewLine />} />

         <Route path="/workstation/facility" element={<Facility />} />
         <Route path="/workstation/new-facility" element={<NewFacility />} />
         <Route path="/workstation/edit-facility/:id" element={<NewFacility/>} /> 
      </Route>

    </Routes>

    <ToastContainer />
  </BrowserRouter>
);