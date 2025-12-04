import React from 'react';

interface SidebarProps {
  setPage: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setPage, currentPage }) => {
  const linkClasses = (page: string) =>
    `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg ${
      currentPage === page ? 'bg-gray-800 text-white' : ''
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="h-20 flex items-center justify-center text-2xl font-bold">
        <span>Logo</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" onClick={() => setPage('dashboard')} className={linkClasses('dashboard')}>
          Dashboard
        </a>
        <a href="#" onClick={() => setPage('invoices')} className={linkClasses('invoices')}>
          Invoices
        </a>
        <a href="#" onClick={() => setPage('clients')} className={linkClasses('clients')}>
          Clients
        </a>
        <a href="#" onClick={() => setPage('settings')} className={linkClasses('settings')}>
          Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
