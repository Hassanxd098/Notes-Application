import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';


import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaAlignJustify, FaListOl, FaListUl, FaQuoteLeft, FaLink, FaTable, FaImage,
  FaHeading, FaCode
} from "react-icons/fa";

const TiptapEditor = ({ value, onChange }) => {
  
  const addImage = (editor) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          editor.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const setLink = (editor) => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const Toolbar = () => (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
    
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Bold"><FaBold /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Italic"><FaItalic /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Underline"><FaUnderline /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Strikethrough"><FaStrikethrough /></button>
      </div>
   
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Align Left"><FaAlignLeft /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Align Center"><FaAlignCenter /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Align Right"><FaAlignRight /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Justify"><FaAlignJustify /></button>
      </div>
    
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Bullet List"><FaListUl /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Numbered List"><FaListOl /></button>
      </div>

      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Heading 1"><FaHeading /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Blockquote"><FaQuoteLeft /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Code Block"><FaCode /></button>
      </div>
     
      <div className="flex items-center gap-1">
        <button onClick={() => setLink(editor)} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-300 text-black' : 'text-gray-600'}`} title="Set Link"><FaLink /></button>
        <button onClick={() => addImage(editor)} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Insert Image"><FaImage /></button>
        <input type="color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} className="w-8 h-8 p-0 border-0 rounded cursor-pointer" title="Text Color" />
        <input type="color" onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} className="w-8 h-8 p-0 border-0 rounded cursor-pointer" title="Highlight Color" />
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Insert Table"><FaTable /></button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200">
      <Toolbar />
      <EditorContent editor={editor} className="flex-1 p-4  overflow-y-auto prose prose-sm max-w-none " />
    </div>
  );
};

export default TiptapEditor;