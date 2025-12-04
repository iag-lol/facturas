import React from 'react';
import { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

const InvoicePreview = React.forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const subtotal = invoice.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );
    const tax = subtotal * 0.19;
    const total = subtotal + tax;

    return (
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto font-sans relative overflow-hidden textured"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/150x50"
              alt="logo"
              className="h-12 mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Love Presents SPA
              </h1>
              <p className="text-gray-500">RUT 77.674.431-K</p>
              <p className="text-gray-500">Santiago, Chile</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-serif text-gray-700">INVOICE</h2>
            <p className="text-gray-500">#{invoice.invoiceNumber}</p>
            <p className="text-gray-500">Date: {invoice.invoiceDate}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Bill To:
          </h3>
          <p className="text-gray-700">{invoice.clientName}</p>
          <p className="text-gray-700">{invoice.clientAddress}</p>
          <p className="text-gray-700">
            {invoice.clientCity}, {invoice.clientState} {invoice.clientZip}
          </p>
          <p className="text-gray-700">{invoice.clientEmail}</p>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-right">Price</th>
              <th className="py-3 px-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {invoice.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{item.name}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{item.quantity}</span>
                </td>
                <td className="py-3 px-6 text-right">
                  <span>${Number(item.price).toFixed(2)}</span>
                </td>
                <td className="py-3 px-6 text-right">
                  <span>
                    ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-1/2">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Tax (19%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-800 font-bold text-lg mt-2 pt-2 border-t">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
          <p>Love Presents SPA · contacto@lovepresents.cl</p>
        </div>

        {/* Stamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12">
          <div className="border-4 border-red-500 text-red-500 text-6xl font-bold uppercase p-4 rounded-lg opacity-20">
            Paid
          </div>
        </div>
      </div>
    );
  }
);

export default InvoicePreview;
