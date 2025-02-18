import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="lg:flex lg:gap-4">
      <aside className="bg-sidebar_bg relative z-10">
        <Sidebar />
      </aside>
      <main className="mt-10 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
