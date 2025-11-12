import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { Menu, X } from "lucide-react";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile toggle button */}
      {/* <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button> */}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "blur-sm md:blur-0" : ""
        } md:ml-80`}
      >
        <Navbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
