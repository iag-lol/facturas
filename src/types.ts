export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientCompany: string;
  clientRut: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  items: InvoiceItem[];
  discountPct: number;
  includeIva: boolean;
  payMode: 'half' | 'full';
  status: 'PAGADO' | 'PENDIENTE';
}

export type Page = 'dashboard' | 'invoices' | 'clients' | 'settings';
