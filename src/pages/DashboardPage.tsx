import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import type { Page } from '../types';

interface DashboardPageProps {
  setPage: (page: Page) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setPage }) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setPage('invoices')}>Create Invoice</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-800">$45,231.89</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">
            Subscriptions
          </h3>
          <p className="text-3xl font-bold text-gray-800">+2350</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">Sales</h3>
          <p className="text-3xl font-bold text-gray-800">+12,234</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">
            Active Now
          </h3>
          <p className="text-3xl font-bold text-gray-800">+573</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
