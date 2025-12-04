import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import Button from '../components/Button';

interface ClientsPageProps {
    setPage: (page: string) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ setPage }) => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('documentos').select('*');
      if (error) {
        console.error(error);
        alert('Error fetching invoices');
      } else {
        setInvoices(data);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
        <Button onClick={() => setPage('invoices')}>Create Invoice</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Invoice #</th>
              <th className="py-3 px-6 text-left">Client</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-right">Total</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{invoice.numero}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{invoice.empresa_cliente}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{new Date(invoice.created_at).toLocaleDateString()}</span>
                </td>
                <td className="py-3 px-6 text-right">
                  <span>${invoice.total.toFixed(2)}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default ClientsPage;
