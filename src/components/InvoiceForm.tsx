import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Invoice } from '../types';
import Button from './Button';
import Card from './Card';
import Input from './Input';

interface InvoiceFormProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, setInvoice }) => {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: Number(e.target.value) || 0 });
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...invoice.items];
    const { name, value } = e.target;
    newItems[index] = {
      ...newItems[index],
      [name]: name === 'name' ? value : Number(value),
    };
    setInvoice({ ...invoice, items: newItems });
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: '', quantity: 1, price: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...invoice.items];
    newItems.splice(index, 1);
    setInvoice({ ...invoice, items: newItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const subtotal = invoice.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const descuento = subtotal * (invoice.discountPct / 100);
    const neto = subtotal - descuento;
    const iva = invoice.includeIva ? neto * 0.19 : 0;
    const total = neto + iva;
    const anticipo = invoice.payMode === 'half' ? total * 0.5 : total;
    const saldo = total - anticipo;
    const { error } = await supabase.from('documentos').insert([
      {
        numero: invoice.invoiceNumber,
        empresa_cliente: invoice.clientName,
        correo: invoice.clientEmail,
        direccion: invoice.clientAddress,
        items: invoice.items,
        total,
        descuento_pct: invoice.discountPct,
        iva_incluye: invoice.includeIva,
        pago_modo: invoice.payMode,
        anticipo,
        saldo,
        estado: invoice.status,
      },
    ]);
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error('Error saving invoice');
    } else {
      toast.success('Invoice saved successfully');
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create Invoice
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Invoice Number"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
          />
          <Input
            label="Invoice Date"
            name="invoiceDate"
            type="date"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
          />
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={invoice.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Input
            label="Descuento (%)"
            name="discountPct"
            type="number"
            value={invoice.discountPct}
            onChange={handleNumberChange}
          />
          <div className="flex items-center space-x-2">
            <input
              id="includeIva"
              type="checkbox"
              checked={invoice.includeIva}
              onChange={(e) =>
                setInvoice({ ...invoice, includeIva: e.target.checked })
              }
              className="h-5 w-5 text-blue-600"
            />
            <label htmlFor="includeIva" className="font-semibold text-gray-700">
              Aplicar IVA 19%
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-semibold text-gray-700">Pago</label>
            <select
              className="border rounded-md px-3 py-2"
              value={invoice.payMode}
              onChange={(e) =>
                setInvoice({ ...invoice, payMode: e.target.value as Invoice['payMode'] })
              }
            >
              <option value="half">50% ahora / 50% al terminar</option>
              <option value="full">100% antes de iniciar</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Bill To
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Client Name"
              name="clientName"
              value={invoice.clientName}
              onChange={handleInputChange}
            />
            <Input
              label="Client Email"
              name="clientEmail"
              value={invoice.clientEmail}
              onChange={handleInputChange}
            />
            <Input
              label="Client Address"
              name="clientAddress"
              value={invoice.clientAddress}
              onChange={handleInputChange}
            />
            <Input
              label="Client City"
              name="clientCity"
              value={invoice.clientCity}
              onChange={handleInputChange}
            />
            <Input
              label="Client State"
              name="clientState"
              value={invoice.clientState}
              onChange={handleInputChange}
            />
            <Input
              label="Client Zip"
              name="clientZip"
              value={invoice.clientZip}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Items
          </h3>
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex space-x-4 items-end">
                <Input
                  className="w-1/2"
                  placeholder="Item Name"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input
                  className="w-1/4"
                  placeholder="Quantity"
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input
                  className="w-1/4"
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button type="button" variant="secondary" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
            <select
              className="border rounded-md px-3 py-2 font-semibold text-gray-700"
              value={invoice.status}
              onChange={(e) =>
                setInvoice({ ...invoice, status: e.target.value as Invoice['status'] })
              }
            >
              <option value="PENDIENTE">PENDIENTE DE PAGO</option>
              <option value="PAGADO">PAGADO</option>
            </select>
            <Button type="submit" loading={loading}>
              Create Invoice
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default InvoiceForm;
