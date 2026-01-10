import { format } from "date-fns";
import { History, Upload, User, Calendar, FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Document, DocumentVersion } from "@/types/document";

interface VersionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: Document | null;
  onUploadNewVersion: (document: Document) => void;
}

export function VersionHistoryDialog({
  open,
  onOpenChange,
  document,
  onUploadNewVersion,
}: VersionHistoryDialogProps) {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Version History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{document.name}</h3>
              <p className="text-sm text-muted-foreground">
                Current version: <span className="font-medium">{document.currentVersion}</span>
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                onUploadNewVersion(document);
                onOpenChange(false);
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              New Version
            </Button>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {document.versions.map((version, index) => (
                <VersionCard
                  key={version.id}
                  version={version}
                  isCurrent={version.version === document.currentVersion}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VersionCard({
  version,
  isCurrent,
  isFirst,
}: {
  version: DocumentVersion;
  isCurrent: boolean;
  isFirst: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg border p-4 ${
        isCurrent ? "border-primary bg-primary/5" : "bg-card"
      }`}
    >
      {!isFirst && (
        <div className="absolute -top-3 left-6 h-3 w-px bg-border" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
              isCurrent ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <FileText className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">v{version.version}</span>
              {isCurrent && (
                <Badge variant="default" className="text-xs">
                  Current
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {version.uploadedBy}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(version.uploadedAt), "MMM d, yyyy")}
              </span>
              <span>{version.size}</span>
            </div>
            {version.changeNotes && (
              <p className="text-sm text-muted-foreground pt-1">
                {version.changeNotes}
              </p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
