import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeaveRequest } from "@/types/leave";
import { Check, X } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isManager?: boolean;
}

const getStatusBadge = (status: LeaveRequest["status"]) => {
  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    approved: "bg-success/10 text-success border-success/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const labels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
};

const getLeaveTypeBadge = (type: LeaveRequest["leaveType"]) => {
  const styles: Record<string, string> = {
    annual: "bg-primary/10 text-primary border-primary/20",
    sick: "bg-destructive/10 text-destructive border-destructive/20",
    personal: "bg-accent/10 text-accent border-accent/20",
    maternity: "bg-success/10 text-success border-success/20",
    paternity: "bg-success/10 text-success border-success/20",
    unpaid: "bg-muted text-muted-foreground border-muted",
  };

  const labels: Record<string, string> = {
    annual: "Annual",
    sick: "Sick",
    personal: "Personal",
    maternity: "Maternity",
    paternity: "Paternity",
    unpaid: "Unpaid",
  };

  return (
    <Badge variant="outline" className={styles[type]}>
      {labels[type]}
    </Badge>
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export function LeaveRequestsTable({
  requests,
  onApprove,
  onReject,
  isManager = true,
}: LeaveRequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No leave requests found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Employee</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Duration</TableHead>
            <TableHead className="font-semibold">Days</TableHead>
            <TableHead className="font-semibold">Reason</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            {isManager && <TableHead className="font-semibold">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const days =
              differenceInDays(
                parseISO(request.endDate),
                parseISO(request.startDate)
              ) + 1;

            return (
              <TableRow key={request.id} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={request.employeeAvatar}
                        alt={request.employeeName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(request.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{request.employeeName}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.department}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getLeaveTypeBadge(request.leaveType)}</TableCell>
                <TableCell className="text-sm">
                  <div>
                    <p>{format(parseISO(request.startDate), "MMM d")}</p>
                    <p className="text-muted-foreground">
                      to {format(parseISO(request.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{days}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                  {request.reason}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                {isManager && (
                  <TableCell>
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-success hover:text-success hover:bg-success/10"
                          onClick={() => onApprove(request.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => onReject(request.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {request.reviewedBy && `by ${request.reviewedBy}`}
                      </span>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
