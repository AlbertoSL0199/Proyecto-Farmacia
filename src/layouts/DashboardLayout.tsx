import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard";

export const DashboardLayout = () => {
  return (
    <div  className="flex bg-gray-300 min-h-screen font-prueba">

      <Sidebar/>
      <main className="containe m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]">
        
      <Outlet />
      </main>
    </div>
  );
};
