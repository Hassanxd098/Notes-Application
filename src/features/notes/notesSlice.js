import { createSlice } from "@reduxjs/toolkit";

const loadNotes = () => {
  const saved = localStorage.getItem("notes");
  return saved ? JSON.parse(saved) : [];
};

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const notesSlice = createSlice({  
  name: "notes",
  initialState: {
    notes: loadNotes(),
    activeNote: null,
    editorMode: 'text',
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    hasSeenWelcome: localStorage.getItem('hasSeenWelcome') === 'true',
    rightSidePane: ""
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title || "Untitled",
        content: action.payload.content || "",
        tags: action.payload.tags || [],
        pinned: false,
        starred: false,
        deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.notes.unshift(newNote);
      state.activeNote = newNote;
      saveNotes(state.notes);
    },
    setActiveNote: (state, action) => {
      state.activeNote = state.notes.find(n => n.id === action.payload) || null;
    },
    setRightSidePane: (state, action) => {
      console.log(action);
      state.rightSidePane = action.payload;
    },
  
    updateNote: (state, action) => {
      const { id, title, content, tags } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.title = title || note.title;
        note.content = content || note.content;
        
        if (tags) {
          note.tags = tags;
        }
        note.updatedAt = new Date().toISOString();
        if (state.activeNote && state.activeNote.id === id) {
          state.activeNote = { ...note };
        }
      }
      saveNotes(state.notes);
    },
    togglePin: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
        note.updatedAt = new Date().toISOString();
        if (state.activeNote && state.activeNote.id === action.payload) {
          state.activeNote.pinned = note.pinned;
          state.activeNote.updatedAt = note.updatedAt;
        }
      }
      saveNotes(state.notes);
    },
    toggleStar: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.starred = !note.starred;
        note.updatedAt = new Date().toISOString();
        if (state.activeNote && state.activeNote.id === action.payload) {
          state.activeNote.starred = note.starred;
          state.activeNote.updatedAt = note.updatedAt;
        }
      }
      saveNotes(state.notes);
    },
    moveToTrash: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.deleted = true;
        note.updatedAt = new Date().toISOString();
        if (state.activeNote && state.activeNote.id === action.payload) {
          state.activeNote = null;
        }
      }
      saveNotes(state.notes);
    },
    setEditorMode: (state, action) => {
      state.editorMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', state.isDarkMode);
    },
    setHasSeenWelcome: (state) => {
      state.hasSeenWelcome = true;
      localStorage.setItem('hasSeenWelcome', 'true');
    },
  },
});

export const {
  addNote,
  updateNote,
  moveToTrash,
  togglePin,
  toggleStar,
  setActiveNote,
  setEditorMode,
  toggleDarkMode,
  setHasSeenWelcome,
  setRightSidePane
} = notesSlice.actions;

export default notesSlice.reducer;