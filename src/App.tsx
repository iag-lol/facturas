import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import ClientsPage from './pages/Clients';

type Page = 'dashboard' | 'invoices' | 'clients' | 'settings';

function App() {
  const [page, setPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage setPage={setPage} />;
      case 'invoices':
        return <InvoicesPage />;
      case 'clients':
        return <ClientsPage setPage={setPage} />;
      default:
        return <DashboardPage setPage={setPage} />;
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <DashboardLayout setPage={setPage} currentPage={page}>
        {renderPage()}
      </DashboardLayout>
    </>
  );
}

export default App;
