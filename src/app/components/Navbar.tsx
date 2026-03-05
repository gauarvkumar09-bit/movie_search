"use client";
import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 py-4 px-6 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Assignment Title as Logo  */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Movie<span className="text-indigo-500">Insight</span>
          </span>
        </div>

        {/* Simple Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">Github</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;