import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../features/notes/notesSlice";
import { useState, useEffect } from "react";
import TextEditor from "../Component/TextEditor";

export default function TextEditorPage() {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notes.activeNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      
     
      const plainTextContent = stripHtml(activeNote.content);
      setContent(plainTextContent);

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
    <div className="h-[70vh] flex flex-col p-6">
      <input
        className="text-xl p-2 border-b mb-3 bg-transparent focus:outline-none"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
   
      <div className="flex-1 overflow-hidden">
        <TextEditor value={content} onChange={setContent} />
      </div>

    
      <button onClick={saveNote} className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors self-start">
        Save
      </button>
    </div>
  );
}