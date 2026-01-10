import { format } from "date-fns";
import {
  FileText,
  Download,
  Trash2,
  Mail,
  MoreHorizontal,
  Eye,
  History,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/types/document";

interface DocumentTableProps {
  documents: Document[];
  onView: (document: Document) => void;
  onDelete: (document: Document) => void;
  onSendEmail: (document: Document) => void;
  onVersionHistory: (document: Document) => void;
}

const typeColors: Record<string, string> = {
  policy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  handbook: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  form: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  announcement: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  training: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export function DocumentTable({
  documents,
  onView,
  onDelete,
  onSendEmail,
  onVersionHistory,
}: DocumentTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Version</TableHead>
            <TableHead className="hidden lg:table-cell">Uploaded By</TableHead>
            <TableHead className="hidden md:table-cell">Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No documents found.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{document.name}</p>
                      {document.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                          {document.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={typeColors[document.type]}>
                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {document.category}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <button
                    onClick={() => onVersionHistory(document)}
                    className="inline-flex items-center gap-1 text-sm hover:text-primary transition-colors"
                  >
                    <History className="h-3 w-3" />
                    v{document.currentVersion}
                  </button>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {document.uploadedBy}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(document.lastModified), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(document)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onVersionHistory(document)}>
                        <History className="mr-2 h-4 w-4" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSendEmail(document)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send via Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(document)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
