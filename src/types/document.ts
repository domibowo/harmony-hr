export interface Document {
  id: string;
  name: string;
  type: 'policy' | 'handbook' | 'form' | 'announcement' | 'training' | 'other';
  category: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  departments: string[];
  description?: string;
}

export type DocumentType = Document['type'];
