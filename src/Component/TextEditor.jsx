import React from "react";

const TextEditor = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="w-full h-full p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 
                 bg-white dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 
                 border-gray-200 dark:border-gray-700 
                 placeholder-gray-400 dark:placeholder-gray-500 
                 transition-colors duration-300"
      placeholder={placeholder || "Write your note..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextEditor;
