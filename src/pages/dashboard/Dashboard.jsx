import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="flex gap-8">
      <aside className="">
        <Sidebar />
      </aside>
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
