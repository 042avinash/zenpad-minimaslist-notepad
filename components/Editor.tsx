
import React from 'react';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Start writing..."
      className="w-full h-full p-2 bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none text-base leading-relaxed"
      spellCheck="false"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
    />
  );
};
