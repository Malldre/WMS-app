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

export interface ConferenceAttachment {
  id: number;
  uuid: string;
  conferenceId: number;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConferenceData {
  id: number;
  uuid: string;
  taskId: number;
  itemId: number;
  quantity: number;
  code: string;
  photoUri?: string;
  attachments: ConferenceAttachment[];
  createdAt: string;
  updatedAt: string;
}
