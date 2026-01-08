import { useState } from "react";
import { Mail, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { departments } from "@/data/employees";
import { Document } from "@/types/document";

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: Document | null;
  onSend: (data: {
    document: Document;
    sendTo: "all" | "departments";
    departments: string[];
    message: string;
  }) => void;
}

export function SendEmailDialog({
  open,
  onOpenChange,
  document,
  onSend,
}: SendEmailDialogProps) {
  const [sendTo, setSendTo] = useState<"all" | "departments">("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleSubmit = () => {
    if (!document) return;
    
    onSend({
      document,
      sendTo,
      departments: sendTo === "all" ? [] : selectedDepartments,
      message,
    });
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setSendTo("all");
    setSelectedDepartments([]);
    setMessage("");
  };

  const isValid = sendTo === "all" || selectedDepartments.length > 0;

  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Document via Email
          </DialogTitle>
          <DialogDescription>
            Send "{document.name}" to employees via email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Send To Selection */}
          <div className="space-y-3">
            <Label>Send To</Label>
            <RadioGroup
              value={sendTo}
              onValueChange={(value) => setSendTo(value as "all" | "departments")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <label htmlFor="all" className="text-sm font-medium">
                  Blast to All Employees
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departments" id="departments" />
                <label htmlFor="departments" className="text-sm font-medium">
                  Send to Specific Departments
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Department Selection */}
          {sendTo === "departments" && (
            <div className="space-y-2">
              <Label>Select Departments</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto border rounded-md p-3">
                {departments.map((department) => (
                  <div key={department} className="flex items-center space-x-2">
                    <Checkbox
                      id={`email-${department}`}
                      checked={selectedDepartments.includes(department)}
                      onCheckedChange={() => handleDepartmentToggle(department)}
                    />
                    <label
                      htmlFor={`email-${department}`}
                      className="text-sm leading-none"
                    >
                      {department}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Custom Message (optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a custom message to include in the email..."
              rows={3}
            />
          </div>

          {/* Preview */}
          <div className="rounded-md bg-muted p-3 space-y-2">
            <p className="text-sm font-medium">Email Preview</p>
            <div className="text-sm text-muted-foreground">
              <p><strong>Subject:</strong> New Document: {document.name}</p>
              <p><strong>Attachment:</strong> {document.name}</p>
              <p>
                <strong>Recipients:</strong>{" "}
                {sendTo === "all"
                  ? "All Employees"
                  : selectedDepartments.length > 0
                  ? selectedDepartments.join(", ")
                  : "No departments selected"}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
