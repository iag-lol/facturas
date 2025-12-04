import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceForm from '../components/InvoiceForm';
import InvoicePreview from '../components/InvoicePreview';
import { Invoice } from '../types';
import Button from '../components/Button';

const InvoicesPage: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: '',
    clientName: 'John Doe',
    clientEmail: 'john.doe@example.com',
    clientAddress: '123 Main St',
    clientCity: 'San Francisco',
    clientState: 'CA',
    clientZip: '94103',
    items: [
      { name: 'Regalo personalizado', quantity: 2, price: 25 },
      { name: 'Empaque premium', quantity: 1, price: 8 },
    ],
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handlePrint}>Print / Download PDF</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        </div>
        <div ref={componentRef}>
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
