import { useState, useMemo } from "react";
import { Upload, FileText, FolderOpen, Send } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentFilters } from "@/components/documents/DocumentFilters";
import { DocumentTable } from "@/components/documents/DocumentTable";
import { UploadDocumentDialog } from "@/components/documents/UploadDocumentDialog";
import { SendEmailDialog } from "@/components/documents/SendEmailDialog";
import { DocumentViewDialog } from "@/components/documents/DocumentViewDialog";
import { VersionHistoryDialog } from "@/components/documents/VersionHistoryDialog";
import { UploadVersionDialog } from "@/components/documents/UploadVersionDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockDocuments } from "@/data/documents";
import { Document } from "@/types/document";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 5;

export default function Documents() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Dialogs
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [sendEmailDialogOpen, setSendEmailDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [uploadVersionOpen, setUploadVersionOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || doc.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [documents, searchQuery, typeFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Stats
  const stats = useMemo(() => ({
    total: documents.length,
    policies: documents.filter((d) => d.type === "policy").length,
    forms: documents.filter((d) => d.type === "form").length,
    announcements: documents.filter((d) => d.type === "announcement").length,
  }), [documents]);

  const handleUpload = (data: {
    name: string;
    type: string;
    category: string;
    description: string;
    departments: string[];
    file: File | null;
  }) => {
    const today = new Date().toISOString().split("T")[0];
    const size = data.file ? `${(data.file.size / 1024).toFixed(1)} KB` : "0 KB";
    const newDocument: Document = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type as Document["type"],
      category: data.category,
      size,
      uploadedBy: "Current User",
      uploadedAt: today,
      lastModified: today,
      departments: data.departments,
      description: data.description,
      currentVersion: "1.0",
      versions: [
        { id: `${Date.now()}-v1`, version: "1.0", size, uploadedBy: "Current User", uploadedAt: today, changeNotes: "Initial upload" },
      ],
    };
    setDocuments((prev) => [newDocument, ...prev]);
    toast({
      title: "Document Uploaded",
      description: `"${data.name}" has been uploaded successfully.`,
    });
  };

  const handleView = (document: Document) => {
    setSelectedDocument(document);
    setViewDialogOpen(true);
  };

  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDocument) {
      setDocuments((prev) => prev.filter((d) => d.id !== selectedDocument.id));
      toast({
        title: "Document Deleted",
        description: `"${selectedDocument.name}" has been deleted.`,
      });
      setDeleteDialogOpen(false);
      setSelectedDocument(null);
    }
  };

  const handleSendEmail = (document: Document) => {
    setSelectedDocument(document);
    setSendEmailDialogOpen(true);
  };

  const handleSendEmailSubmit = (data: {
    document: Document;
    sendTo: "all" | "departments";
    departments: string[];
    message: string;
  }) => {
    const recipients =
      data.sendTo === "all" ? "all employees" : data.departments.join(", ");
    toast({
      title: "Email Sent",
      description: `"${data.document.name}" has been sent to ${recipients}.`,
    });
  };

  const handleVersionHistory = (document: Document) => {
    setSelectedDocument(document);
    setVersionHistoryOpen(true);
  };

  const handleUploadNewVersion = (document: Document) => {
    setSelectedDocument(document);
    setUploadVersionOpen(true);
  };

  const handleUploadVersion = (documentId: string, data: { file: File | null; changeNotes: string }) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== documentId) return doc;
        const currentParts = doc.currentVersion.split(".");
        const nextMinor = parseInt(currentParts[1] || "0") + 1;
        const newVersion = `${currentParts[0]}.${nextMinor}`;
        const today = new Date().toISOString().split("T")[0];
        const size = data.file ? `${(data.file.size / 1024).toFixed(1)} KB` : doc.size;
        return {
          ...doc,
          currentVersion: newVersion,
          size,
          lastModified: today,
          versions: [
            { id: `${doc.id}-v${Date.now()}`, version: newVersion, size, uploadedBy: "Current User", uploadedAt: today, changeNotes: data.changeNotes || undefined },
            ...doc.versions,
          ],
        };
      })
    );
    toast({
      title: "Version Uploaded",
      description: "New document version has been uploaded successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">
              Manage and distribute company documents
            </p>
          </div>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Policies</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.policies}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.forms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.announcements}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <DocumentFilters
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          typeFilter={typeFilter}
          onTypeFilterChange={(value) => {
            setTypeFilter(value);
            setCurrentPage(1);
          }}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
        />

        {/* Documents Table */}
        <DocumentTable
          documents={paginatedDocuments}
          onView={handleView}
          onDelete={handleDelete}
          onSendEmail={handleSendEmail}
          onVersionHistory={handleVersionHistory}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* Dialogs */}
      <UploadDocumentDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUpload}
      />

      <SendEmailDialog
        open={sendEmailDialogOpen}
        onOpenChange={setSendEmailDialogOpen}
        document={selectedDocument}
        onSend={handleSendEmailSubmit}
      />

      <DocumentViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        document={selectedDocument}
      />

      <VersionHistoryDialog
        open={versionHistoryOpen}
        onOpenChange={setVersionHistoryOpen}
        document={selectedDocument}
        onUploadNewVersion={handleUploadNewVersion}
      />

      <UploadVersionDialog
        open={uploadVersionOpen}
        onOpenChange={setUploadVersionOpen}
        document={selectedDocument}
        onUpload={handleUploadVersion}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
