
import React from 'react';
import type { Theme } from '../types';
import { IconButton } from './IconButton';
import { SunIcon, MoonIcon, NewFileIcon, OpenFolderIcon, SaveIcon } from '../constants/icons';

interface HeaderProps {
  fileName: string;
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
  onToggleTheme: () => void;
  theme: Theme;
}

export const Header: React.FC<HeaderProps> = ({
  fileName,
  onNew,
  onOpen,
  onSave,
  onToggleTheme,
  theme,
}) => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ZenPad
            </h1>
            <span className="h-6 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true"></span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{fileName}</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <IconButton onClick={onNew} aria-label="New File">
              <NewFileIcon />
            </IconButton>
            <IconButton onClick={onOpen} aria-label="Open File">
              <OpenFolderIcon />
            </IconButton>
            <IconButton onClick={onSave} aria-label="Save File">
              <SaveIcon />
            </IconButton>
            <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block" aria-hidden="true"></span>
            <IconButton onClick={onToggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
};
