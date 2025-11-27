import { api } from '@/src/core/api';
import { InvoiceItem, IInvoiceDetails } from '@/src/types/invoice';

export const invoiceService = {
  getInvoiceDetails: async (taskId: string | number): Promise<IInvoiceDetails> => {
    const { data } = await api.get<IInvoiceDetails>(`/tasks/${taskId}`);
    return data;
  },

  getInvoiceItems: async (invoiceId: string | number): Promise<InvoiceItem[]> => {
    const { data } = await api.get<InvoiceItem[]>(`/invoice-items/invoice/${invoiceId}`);
    return data;
  },
};
