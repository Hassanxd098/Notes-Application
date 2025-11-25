import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  setActiveNote,
  togglePin,
  toggleStar,
  toggleDarkMode,
  addNote,
} from "../features/notes/notesSlice";
import { moveToTrash } from "../features/notes/notesSlice";
import {
  RiSearchLine,
  RiStarLine,
  RiInboxLine,
  RiDeleteBin5Line,
  RiSunLine,
  RiMoonLine,
  RiAddLine,
  RiPushpinLine,
  RiFolderOpenLine,
  RiHashtag,
} from "react-icons/ri";
import { VscPinned, VscSettings } from "react-icons/vsc";
import { PiFolderSimpleBold } from "react-icons/pi";

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

/* ------------------ Side Alert Component ------------------ */
/* ------------------ Modern Right-Side Animated Alert ------------------ */
const SideAlert = ({ show, message, type = "success" }) => {
  const color =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`fixed right-4 top-6 z-[9999] w-72 shadow-2xl rounded-xl overflow-hidden ${color}`}
        >
          {/* Typing effect */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="whitespace-nowrap overflow-hidden text-white font-medium px-4 py-3 text-sm"
          >
            {message}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-1 bg-white/80"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};




export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes.notes);
  const activeNote = useSelector((state) => state.notes.activeNote);
  const isDarkMode = useSelector((state) => state.notes.isDarkMode);

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const [activeTab, setActiveTab] = useState("All");
  const [sortType, setSortType] = useState("Last Created");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { name: "All", icon: <PiFolderSimpleBold /> },
    { name: "Pinned", icon: <VscPinned /> },
    { name: "Starred", icon: <RiStarLine /> },
  ];

  let filtered = notes.filter((n) => !n.deleted);
  if (activeTab === "Pinned") filtered = filtered.filter((n) => n.pinned);
  if (activeTab === "Starred") filtered = filtered.filter((n) => n.starred);
  if (searchQuery) {
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (sortType === "Title A-Z") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }

  /* ---- Alert state + timer management ---- */
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const timerRef = useRef(null);

  const showAlert = (message, type = "success", duration = 3000) => {
    // clear previous timer if exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setAlert({ show: true, message, type });
    timerRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
      timerRef.current = null;
    }, duration);
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  /* ---------------------------------------- */

  const handleAddNote = () => {
    const newNote = {
      title: "Untitled",
      content: "",
      tags: [],
    };
    dispatch(addNote(newNote));
    navigate("/editor/rich");

    // show success alert (3s)
    showAlert("📝 New Note Created!", "success", 3000);

    if (window.innerWidth < 768) closeSidebar();
  };

  const handleCreateFolder = async () => {
    try {
      // Ask user to select a parent directory
      const dirHandle = await window.showDirectoryPicker();
  
      // Ask user for the new folder name
      const folderName = prompt("Enter folder name:");
  
      if (!folderName) return;
  
      // Create folder inside selected directory
      const newFolder = await dirHandle.getDirectoryHandle(folderName, { create: true });
  
      alert(`Folder "${folderName}" created successfully!`);
    } catch (error) {
      console.error(error);
      alert("Folder creation canceled or failed.");
    }
  };
  

  const [showRecent, setShowRecent] = useState(false);
  const [recentFilter, setRecentFilter] = useState("Last Update");
  const recentOptions = ["Last Update", "Created Date", "Title A-Z"];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".sidebar-container") &&
        !e.target.closest(".menu-button")
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* Side Alert (fixed near sidebar) */}
      <SideAlert show={alert.show} message={alert.message} type={alert.type} />

      <button
        onClick={toggleSidebar}
        className={`menu-button fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg md:hidden ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`sidebar-container fixed top-0 left-0 h-full z-40 transform transition-transform duration-300
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 w-64 md:w-80 border-r overflow-y-auto`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between mb-6 items-center">
            <h2 className="text-xl font-semibold">Smart Notes</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => dispatch(toggleDarkMode())}>
                {isDarkMode ? <RiSunLine /> : <RiMoonLine />}
              </button>
              <button
                className="text-lg hover:text-red-500"
                onClick={() => setActiveTab("Trash")}
              >
                <RiDeleteBin5Line />
              </button>
              <button
                onClick={handleAddNote}
                className="bg-black text-white p-2 rounded-lg hover:opacity-80"
              >
                <RiAddLine />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            />
            <div className="absolute left-2 top-2 text-gray-500">
              <RiSearchLine />
            </div>
          </div>

          {/* Sort Options */}
          <div className="p-2 flex items-center gap-2 mb-2">
            <VscSettings className="text-xl" />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className={`border px-2 py-1 text-sm rounded-md ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <option value="Last Created">Last Created</option>
              <option value="Title A-Z">Title A-Z</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex sm:flex-wrap  justify-center sm:justify-start gap-2 mb-4">
            {tabs.map((t) => (
              <button
                key={t.name}
                onClick={() => setActiveTab(t.name)}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${
                  activeTab === t.name
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-base sm:text-lg">{t.icon}</span>
                <span className="whitespace-nowrap">{t.name}</span>
              </button>
            ))}
          </div>

          <h1 className="font-medium mb-1">Recent</h1>
          <div className="flex items-center justify-between mb-2">
            <div className="relative w-full">
              <button
                className={`w-full px-3 py-2 flex justify-between items-center rounded-md ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
                onClick={() => setShowRecent(!showRecent)}
              >
                {recentFilter} <span>▼</span>
              </button>
              {showRecent && (
                <div className="absolute w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 mt-1 border dark:border-gray-700">
                  {recentOptions.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        option === recentFilter
                          ? "bg-gray-200 dark:bg-gray-700 font-medium"
                          : ""
                      }`}
                      onClick={() => {
                        setRecentFilter(option);
                        setShowRecent(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
  onClick={handleCreateFolder}
  className="ml-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
  title="Create Folder"
>
  <RiFolderOpenLine />
</button>
          </div>

        
          <h1 className="text-black dark:text-white p-2 font-medium">All</h1>
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
                <RiInboxLine className="text-4xl mx-auto mb-2" /> No notes
              </div>
            ) : (
              filtered.map((note) => (
                <div
                  key={note.id}
                  onClick={() => {
                    dispatch(setActiveNote(note.id));
                    navigate("/editor/rich");
                    if (window.innerWidth < 768) closeSidebar();
                  }}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 border ${
                    activeNote?.id === note.id
                      ? "bg-gray-100 dark:bg-gray-800 border-l-4 border-black dark:border-white"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent"
                  } ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{note.title}</p>
                      {note.image && (
                        <img
                          src={note.image}
                          alt="Drawing Preview"
                          className="mt-2 w-full rounded-md border border-gray-200 dark:border-gray-700"
                        />
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 text-lg ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(togglePin(note.id));
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <RiPushpinLine
                          className={
                            note.pinned
                              ? "text-black dark:text-white"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleStar(note.id));
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <RiStarLine
                          className={
                            note.starred ? "text-yellow-500" : "text-gray-400"
                          }
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(moveToTrash(note.id));
                        
                          showAlert("🗑️ Note Deleted Successfully!", "error", 3000);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <RiDeleteBin5Line className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      <RiHashtag className="text-gray-400 text-xs flex-shrink-0" />
                      {note.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
