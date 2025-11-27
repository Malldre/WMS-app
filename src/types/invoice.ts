export interface InvoiceItem {
  createdAt: string;
  invoiceId: number;
  materialDescription: string;
  materialId: number;
  materialName: string;
  materialUnit: string;
  quantity: string;
  remark?: string;
  status: string;
  totalValue: string;
  unitValue: string;
  uuid: string;
}

export interface InvoiceItemsResponse {
  items: InvoiceItem[];
  total: number;
}
