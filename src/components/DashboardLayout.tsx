import React from 'react';
import Sidebar from './Sidebar';
import type { Page } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  setPage: (page: Page) => void;
  currentPage: Page;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, setPage, currentPage }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setPage={setPage} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{currentPage}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/32"
                alt="User avatar"
              />
              <span className="text-gray-800 font-semibold">Isaac Avila</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
