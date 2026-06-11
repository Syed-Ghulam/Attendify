import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DashBoardLayout() {
  console.log("DashboardLayout Rendered");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-auto bg-[var(--neutral-100)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default DashBoardLayout;
