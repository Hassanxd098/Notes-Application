import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RootLayout from "./Layout/Rootlayout";
import Welcome from "./pages/Welcome";
import RichEditorPage from "./pages/RichEditorpage";
import TextEditorPage from "./pages/TextEditorPage";
import DrawEditorPage from "./pages/DrawEditorPage";
import SmartNotesAI from "./Component/SmartNotesAI";

export default function App() {
  const isDarkMode = useSelector((state) => state?.notes?.isDarkMode ?? false);

  return (
    <div className={isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <BrowserRouter>
        <Routes>
       
          <Route path="/" element={<Welcome />} />
          <Route element={<RootLayout />}>
            <Route path="editor/rich" element={<RichEditorPage />} />
            <Route path="editor/text" element={<TextEditorPage />} />
            <Route path="draw" element={<DrawEditorPage />} />
            <Route path="smart" element={<SmartNotesAI />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
