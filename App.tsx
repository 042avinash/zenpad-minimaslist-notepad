
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import type { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [content, setContent] = useState<string>(
    '# Welcome to ZenPad\n\nStart typing your notes here.\n\n- Click "New" to clear the editor.\n- Use "Open" to load a .txt file.\n- "Save" will download your work as a .txt file.'
  );
  const [fileName, setFileName] = useState<string>('untitled.txt');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleNewFile = useCallback(() => {
    setContent('');
    setFileName('untitled.txt');
  }, []);

  const handleOpenFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
    // Reset file input value to allow opening the same file again
    event.target.value = '';
  }, []);

  const handleSaveFile = useCallback(() => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, fileName]);

  return (
    <div className="flex flex-col h-screen font-sans antialiased text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900">
      <Header
        fileName={fileName}
        onNew={handleNewFile}
        onOpen={handleOpenFileClick}
        onSave={handleSaveFile}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Editor content={content} setContent={setContent} />
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt, .md, .text"
      />
    </div>
  );
};

export default App;
