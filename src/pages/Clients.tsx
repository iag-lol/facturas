import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import Button from '../components/Button';
import type { Page } from '../types';

interface ClientsPageProps {
  setPage: (page: Page) => void;
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
        <h2 className="text-2xl font-bold text-gray-800">Facturas</h2>
        <Button onClick={() => setPage('invoices')}>Crear factura</Button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Factura #</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-center">Fecha</th>
              <th className="py-3 px-6 text-right">Total</th>
              <th className="py-3 px-6 text-center">Acciones</th>
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
                      Ver
                    </Button>
                    <Button size="sm" variant="ghost">
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost">
                      Eliminar
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
