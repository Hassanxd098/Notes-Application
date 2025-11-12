import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { updateNote } from "../features/notes/notesSlice";
import { RxText } from "react-icons/rx";
import { FiFileText, FiPenTool } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { LuSave, LuTag } from "react-icons/lu";
import { PiCalendarLight } from "react-icons/pi";
import { RiFolderLine } from "react-icons/ri";

function Navbar() {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notes.activeNote);
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.notes.isDarkMode);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);

  // Refs to prevent stale closure bugs
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const tagsRef = useRef(tags);

  useEffect(() => { titleRef.current = title; }, [title]);
  useEffect(() => { contentRef.current = content; }, [content]);
  useEffect(() => { tagsRef.current = tags; }, [tags]);

  const menu = [
    { name: "Text", icon: <RxText />, path: "/editor/text" },
    { name: "Rich", icon: <FiFileText />, path: "/editor/rich" },
    { name: "Draw", icon: <FiPenTool />, path: "/draw" },
    { name: "AI", icon: <RiRobot2Line />, path: "/smart" },
  ];

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setTags(activeNote.tags || []);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [activeNote]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle;
  };

  const handleSave = () => {
    if (!activeNote) {
      alert("No note is selected to save.");
      return;
    }
    const currentTitle = titleRef.current;
    const currentContent = contentRef.current;
    const currentTags = tagsRef.current;
    
    dispatch(updateNote({ 
      id: activeNote.id, 
      title: currentTitle, 
      content: currentContent, 
      tags: currentTags 
    }));
    console.log("Note Saved!");
  };

  const addTag = () => {
    if (newTag.trim() && activeNote) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      tagsRef.current = updatedTags;
      setNewTag("");
      
      dispatch(updateNote({ 
        id: activeNote.id, 
        title: titleRef.current, 
        content: contentRef.current, 
        tags: updatedTags 
      }));
    }
  };

  const removeTag = (indexToRemove) => {
    if (!activeNote) return;
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    tagsRef.current = updatedTags;

    dispatch(updateNote({ 
      id: activeNote.id, 
      title: titleRef.current, 
      content: contentRef.current, 
      tags: updatedTags 
    }));
  };

  return (
    <div className={`border-b bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300 w-full`}>
      {/* First Row: Title and Buttons */}
      <div className="px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={handleTitleChange}
            className={`text-gray-600 dark:text-gray-300 text-sm sm:text-[15px] bg-transparent outline-none w-full sm:flex-1 placeholder-gray-400 dark:placeholder-gray-500`}
          />
          
          {/* Menu Items - Responsive Grid */}
          <div className="flex sm:flex-row flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-0">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1 rounded-md border px-2 sm:px-3 py-[6px] text-xs sm:text-sm transition-all ${
                    isActive
                      ? "bg-black text-white border-black dark:bg-white dark:text-black"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon} 
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
            <button
              onClick={handleSave}
              className="flex items-center gap-1 rounded-md border px-2 sm:px-3 py-[6px] text-xs sm:text-sm transition-all bg-gray-500 text-white border-gray-600 hover:bg-black hover:border-black dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              <LuSave /> 
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Folder, Tags, and Dates */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 border-t dark:border-gray-700">
        <div className="pt-3 space-y-3">
          {/* Folder */}
          <div className="flex items-center gap-2">
            <RiFolderLine className="text-gray-600 dark:text-gray-400 text-lg flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Folder:</span>
            <select className="flex-1 max-w-[150px] sm:max-w-[200px] border bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md px-2 py-1 text-sm outline-none text-gray-800 dark:text-gray-200">
              <option>No Folder</option>
              <option>Personal</option>
              <option>Work</option>
              <option>Notes</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 w-[40%]">
            <div className=" w-[50%] flex items-center gap-2 mb-2 ">
              <LuTag className="text-gray-600 text-sm  dark:text-gray-400  flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Tags:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  onClick={() => removeTag(index)}
                  title="Click to remove tag"
                >
                  {tag} ✕
                </span>
              ))}
              <div className="flex items-center gap-1 flex-1 min-w-[120px] sm:min-w-[150px]">
                <input
                  type="text"
                  value={newTag}
                  placeholder="Add tag..."
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-2 py-1 border bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md text-sm outline-none text-gray-800 dark:text-gray-200"
                />
                <button
                  onClick={addTag}
                  className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-md text-sm hover:opacity-80 whitespace-nowrap "
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Created & Updated Dates */}
          <div className="flex sm:flex-row gap-2 sm:gap-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <PiCalendarLight />
              Created: {activeNote ? new Date(activeNote.createdAt).toLocaleDateString() : "N/A"}
            </div>
            <div className="flex items-center gap-1">
              <PiCalendarLight />
              Updated: {activeNote ? new Date(activeNote.updatedAt).toLocaleDateString() : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;