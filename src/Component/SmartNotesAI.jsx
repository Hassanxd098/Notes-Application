import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { FaRobot, FaUserCircle } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { setRightSidePane } from "../features/notes/notesSlice";
const SmartNotesAI = () => {
  // const dispatch = useDispatch();

  const knowledgeBase = [
    {
      question: "what is smart notes?",
      answer:
        "🧠 Smart Notes is a web app that lets you create, edit, and organize your notes intelligently. It helps you manage your thoughts efficiently.",
    },
    {
      question: "how to create a note?",
      answer:
        "📝 Click the 'Add Note' button, type your content, and click Save. Your note will appear instantly in your notes list.",
    },
    {
      question: "how to delete a note?",
      answer:
        "🗑️ Click the delete icon on the note you want to remove. Once deleted, it cannot be recovered.",
    },
    {
      question: "can i edit a note?",
      answer:
        "✏️ Absolutely! Click the edit button to modify your note’s content anytime you want.",
    },
    {
      question: "where are my notes stored?",
      answer:
        "💾 Your notes are stored safely in your browser using localStorage — no internet required!",
    },
    {
      question: "Hi",
      answer: "How can i Help You ?",
    },
    {
      question: "who is the founder of smart notes",
      answer: "PM Hassan ur Rahman, Founder and CEO of Smart Notes",
    },
  ];

  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);

  const handleAsk = () => {
    if (!question.trim()) return;
    const query = question.toLowerCase();

    const found = knowledgeBase.find((item) =>
      query.includes(item.question.toLowerCase())
    );

    const newChat = {
      user: question,
      ai: found
        ? found.answer
        : "🤔 Sorry, I couldn’t find an answer related to that. Try asking about notes, saving, editing, or deleting!",
    };

    setChat((prev) => [...prev, newChat]);
    setQuestion("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-300 relative">



      {/* Header */}
      <header className="text-center py-6 shadow-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
          🤖 Smart Notes Assistant
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
          Ask anything about your Smart Notes app
        </p>
      </header>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 lg:px-20 max-h-[75vh]">
        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          {chat.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mt-10"
            >
              💬 Start by asking — “What is Smart Notes?”
            </motion.div>
          )}

          {chat.map((c, index) => (
            <div key={index} className="space-y-3">
              {/* User Message */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-start justify-end gap-2"
              >
                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-none max-w-[80%] shadow">
                  {c.user}
                </div>
                <FaUserCircle className="text-3xl text-gray-400" />
              </motion.div>

              {/* AI Message */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-start gap-2"
              >
                <FaRobot className="text-2xl text-indigo-500 mt-1" />
                <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] shadow">
                  {c.ai}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <footer className="sticky bottom-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-2xl mx-auto flex items-center gap-3 p-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about Smart Notes..."
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
          />
          <button
            onClick={handleAsk}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl shadow transition-all"
          >
            <FiSend />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SmartNotesAI;
