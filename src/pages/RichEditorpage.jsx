import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../features/notes/notesSlice";
import { useState, useEffect } from "react";
import TiptapEditor from "../Component/TipTapEditor";

export default function RichEditorPage() {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notes.activeNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [activeNote]);

  const saveNote = () => {
    if (!title.trim()) {
      alert("Please add a title.");
      return;
    }
    if (activeNote) {
      dispatch(updateNote({ id: activeNote.id, title, content }));
    } else {
      dispatch(addNote({ title, content }));
    }
    console.log("Note Saved!");
  };

  return (
    <div className="h-[70vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex-1 flex flex-col p-6">
        <input
          className="text-xl p-2 mb-3 border-b 
                     bg-transparent focus:outline-none 
                     border-gray-300 dark:border-gray-700 
                     text-gray-900 dark:text-gray-100 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     transition-colors duration-300"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex-1 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <TiptapEditor value={content} onChange={setContent} />
        </div>

        <button
          onClick={saveNote}
          className="mt-3 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors self-start"
        >
          Save
        </button>
      </div>
    </div>
  );
}
