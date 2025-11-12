import React, { useState } from "react";

const SmartNotesAI = () => {
  const knowledgeBase = [
    {
      question: "what is smart notes?",
      answer:
        "Smart Notes is a web app that lets you create, edit, and organize your notes intelligently.",
    },
    {
      question: "how to create a note?",
      answer:
        "Click the 'Add Note' button, type your content, and click Save. The note will be added to your notes list.",
    },
    {
      question: "how to delete a note?",
      answer:
        "Click the delete 🗑️ icon on the note you want to remove. It will be deleted permanently.",
    },
    {
      question: "can i edit a note?",
      answer:
        "Yes! Click the edit ✏️ button to modify your note content anytime.",
    },
    {
      question: "where are my notes stored?",
      answer:
        "Your notes are stored locally in your browser using localStorage, so you don’t lose them on refresh.",
    },
  ];

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = () => {
    const query = question.toLowerCase();
    const found = knowledgeBase.find((item) =>
      query.includes(item.question.toLowerCase())
    );

    if (found) {
      setAnswer(found.answer);
    } else {
      setAnswer("Sorry, I couldn’t find an answer related to that.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🤖 Smart Notes Helper</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Ask about Smart Notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAsk}
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-all"
        >
          Ask
        </button>

        {answer && (
          <div className="mt-4 p-3 bg-gray-50 border rounded-lg text-gray-700">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartNotesAI;
