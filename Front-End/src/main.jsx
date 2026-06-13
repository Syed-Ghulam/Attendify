import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";

import App from "./App.jsx";
import Users from "./Users.jsx";
import NewUser from "./NewUser.jsx";
import EditUser from "./EditUser.jsx";
import ViewUser from "./ViewUser.jsx";
import WorkStation from "./pages/WorkStation.jsx";
import NewWorkStation from "./NewWorkStation.jsx";
import EditWorkStation from "./EditWorkStation.jsx";
import NewGroup from "./NewGroup.jsx";
import EditGroup from "./EditGroup.jsx";
import NewLine from "./pages/NewLine.jsx";

import DashBoardLayout from "./layout/DashBoardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import EditLine from "./pages/EditLine.jsx";
import Facility from "./pages/Facility.jsx";
import NewFacility from "./pages/NewFacility.jsx";
import EditFacility from "./pages/EditFacility.jsx";

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
        <Route path="edit-user/:userId" element={<EditUser />} />
        <Route path="view-user/:userId" element={<ViewUser />} />

        <Route path="new-group" element={<NewGroup />} />
        <Route path="edit-group/:id" element={<EditGroup />} />

        <Route path="workstation" element={<WorkStation />} />
        <Route path="new-workstation" element={<NewWorkStation />} />
        <Route path="edit-workstation/:id" element={<EditWorkStation />} />

        <Route path="/workstation/new-line" element={<NewLine />} />
        <Route path="/workstation/edit-line/:id" element={<EditLine />} />

         <Route path="/workstation/new-facility" element={<NewFacility />} />
         <Route path="/workstation/edit-facility/:id" element={<EditFacility/>} /> 
      </Route>

    </Routes>

    <ToastContainer />
  </BrowserRouter>
);