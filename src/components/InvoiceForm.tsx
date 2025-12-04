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
    try {
      const { error } = await supabase.from('documentos').insert([
        {
          numero: invoice.invoiceNumber,
          empresa_cliente: invoice.clientCompany || invoice.clientName,
          contacto: invoice.clientName,
          rut: invoice.clientRut,
          correo: invoice.clientEmail,
          telefono: invoice.clientPhone,
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
      if (error) {
        console.error(error);
        toast.error('Error al guardar la factura');
      } else {
        toast.success('Factura guardada');
      }
    } catch (err) {
      console.error(err);
      toast.error('No se pudo guardar la factura');
    }
    setLoading(false);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create Invoice
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Número de factura"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
          />
          <Input
            label="Fecha de factura"
            name="invoiceDate"
            type="date"
            value={invoice.invoiceDate}
            onChange={handleInputChange}
          />
          <Input
            label="Fecha vencimiento"
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
            Cobrar a
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre del cliente"
              name="clientName"
              value={invoice.clientName}
              onChange={handleInputChange}
            />
            <Input
              label="Colegio / Empresa"
              name="clientCompany"
              value={invoice.clientCompany}
              onChange={handleInputChange}
            />
            <Input
              label="RUT"
              name="clientRut"
              value={invoice.clientRut}
              onChange={handleInputChange}
            />
            <Input
              label="Celular"
              name="clientPhone"
              value={invoice.clientPhone}
              onChange={handleInputChange}
            />
            <Input
              label="Correo electrónico"
              name="clientEmail"
              value={invoice.clientEmail}
              onChange={handleInputChange}
            />
            <Input
              label="Dirección del cliente"
              name="clientAddress"
              value={invoice.clientAddress}
              onChange={handleInputChange}
            />
            <Input
              label="Ciudad Cliente"
              name="clientCity"
              value={invoice.clientCity}
              onChange={handleInputChange}
            />
            <Input
              label="Estado del cliente"
              name="clientState"
              value={invoice.clientState}
              onChange={handleInputChange}
            />
            <Input
              label="Código postal del cliente"
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
                  placeholder="Nombre del producto o servicio"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input
                  className="w-1/4"
                  placeholder="Cantidad"
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
                <Input
                  className="w-1/4"
                  placeholder="Precio"
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
                  Eliminar
                </Button>
              </div>
            ))}
        </div>
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={handleAddItem}>
              Agregar Item
          </Button>
        </div>
      </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="ghost">
              Cancelar
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
              Crear factura
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default InvoiceForm;
