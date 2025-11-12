// import { useDispatch, useSelector } from "react-redux";
// import { addNote, updateNote, moveToTrash } from "../features/notes/notesSlice";
// import { useState, useEffect } from "react";
// import TiptapEditor from "../Component/TipTapEditor";
// import TextEditor from "../Component/TextEditor";

// export default function Notes() {
//   const dispatch = useDispatch();
//   const activeNote = useSelector((state) => state.notes.activeNote);
//   const editorMode = useSelector((state) => state.notes.editorMode);

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     if (activeNote) {
//       setTitle(activeNote.title);
//       setContent(activeNote.content);
//     } else {
//       setTitle("");
//       setContent("");
//     }
//   }, [activeNote]);

//   const saveNote = () => {
//     if (!title.trim()) {
//       alert("Please add a title.");
//       return;
//     }
//     if (activeNote) {
//       dispatch(updateNote({ id: activeNote.id, title, content }));
//     } else {
//       dispatch(addNote({ title, content }));
//     }
//   };

//   // This component now decides which editor to show
//   if (editorMode === 'rich') {
//     return (
//       <div className="h-full flex flex-col p-6">
//         <input
//           className="text-xl p-2 border-b mb-3 bg-transparent focus:outline-none"
//           placeholder="Note title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <div className="flex-1 overflow-hidden">
//           <TiptapEditor value={content} onChange={setContent} />
//         </div>
//         <button onClick={saveNote} className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
//           Save
//         </button>
//       </div>
//     );
//   }

//   // Default to Text Editor
//   return (
//     <div className="h-full flex flex-col p-6">
//       <input
//         className="text-xl p-2 border-b mb-3 bg-transparent focus:outline-none"
//         placeholder="Note title..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <div className="flex-1 overflow-hidden">
//         <TextEditor value={content} onChange={setContent} />
//       </div>
//       <button onClick={saveNote} className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
//         Save
//       </button>
//     </div>
//   );
// }