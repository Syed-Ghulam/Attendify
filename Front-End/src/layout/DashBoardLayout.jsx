import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DashBoardLayout(){
    return(
        <div className="h-screen flex flex-col overflow-hidden">
             <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />

                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default DashBoardLayout;
