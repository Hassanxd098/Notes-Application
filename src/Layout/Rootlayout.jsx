import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { Menu, X } from "lucide-react";
import SidePane from "./SidePane";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pane = useSelector(state => state.notes.rightSidePane || "");

  return (
    <div className="flex min-h-screen relative">

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

     
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "blur-sm md:blur-0" : ""
        } md:ml-80`}
      >
        <Navbar />
        <main className={`p-4 md:p-6 grid  ${pane !== "" ? "grid-cols-[1fr_300px]" : "" }`}>
          <Outlet />
          {pane !== "" &&
            <div className="sidePane">
              <SidePane />
            </div>
          }
        </main>
      </div>
    </div>
  );
}
