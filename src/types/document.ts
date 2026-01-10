export interface DocumentVersion {
  id: string;
  version: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  changeNotes?: string;
}

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
  currentVersion: string;
  versions: DocumentVersion[];
}

export type DocumentType = Document['type'];
