import React, { useRef, useState, useEffect } from "react";
import {
  LuPenLine,
  LuEraser,
  LuSquare,
  LuCircle,
  LuTrash2,
  LuDownload,
  LuSave,
} from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/notesSlice"; // ✅ import from your notesSlice

export default function DrawEditorPage() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [tool, setTool] = useState("pen");
  const [size, setSize] = useState(2);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ratio = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = parent;
      canvas.width = clientWidth * ratio;
      canvas.height = clientHeight * ratio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      const context = canvas.getContext("2d");
      context.scale(ratio, ratio);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#000";
      setCtx(context);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e) => {
    if (!ctx) return;
    const { x, y } = getMousePos(e);
    setStartPos({ x, y });
    setDrawing(true);
    ctx.lineWidth = size;

    ctx.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.moveTo(x, y);
    setSnapshot(
      ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
  };

  const draw = (e) => {
    if (!drawing || !ctx) return;
    const { x, y } = getMousePos(e);
    ctx.putImageData(snapshot, 0, 0);

    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "square") {
      const width = x - startPos.x;
      const height = y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    } else if (tool === "circle") {
      const radius = Math.sqrt(
        (x - startPos.x) ** 2 + (y - startPos.y) ** 2
      );
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const stopDraw = () => {
    setDrawing(false);
    if (ctx) ctx.globalCompositeOperation = "source-over";
  };

  const clearCanvas = () =>
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // ✅ Save drawing as note
  const saveDrawing = () => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL("image/png");
    const newNote = {
      title: "Drawing Note",
      content: "<p>Drawing saved</p>",
      image: imageData,   // ✅ this is key
      tags: ["drawing"],
    };
    dispatch(addNote(newNote));
  };
  return (
    <div className="flex flex-col h-[70vh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-none md:rounded-xl shadow-sm mb-2 md:mb-4 transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          {[{ name: "pen", icon: <LuPenLine /> },
            { name: "eraser", icon: <LuEraser /> },
            { name: "square", icon: <LuSquare /> },
            { name: "circle", icon: <LuCircle /> }].map((t) => (
            <button
              key={t.name}
              onClick={() => setTool(t.name)}
              className={`p-2 rounded-md text-lg sm:text-base transition-colors duration-300 ${
                tool === t.name
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t.icon}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span>Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-20 accent-black dark:accent-white"
            />
            <span>{size}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0 justify-center sm:justify-end w-full sm:w-auto">
          <button onClick={clearCanvas} title="Clear">
            <LuTrash2 className="text-gray-700 dark:text-gray-300 hover:text-red-500 text-lg sm:text-base" />
          </button>
          <button onClick={downloadCanvas} title="Download">
            <LuDownload className="text-gray-700 dark:text-gray-300 hover:text-green-500 text-lg sm:text-base" />
          </button>
          {/* ✅ New Save Button */}
          <button onClick={saveDrawing} title="Save to Sidebar">
            <LuSave className="text-gray-700 dark:text-gray-300 hover:text-blue-500 text-lg sm:text-base" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden transition-colors duration-300">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={(e) => startDraw(e.touches[0])}
          onTouchMove={(e) => draw(e.touches[0])}
          onTouchEnd={stopDraw}
        />
      </div>
    </div>
  );
}
