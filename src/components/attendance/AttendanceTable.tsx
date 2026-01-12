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
import { AttendanceRecord } from "@/types/attendance";

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const getStatusBadge = (status: AttendanceRecord["status"]) => {
  const styles = {
    present: "bg-success/10 text-success border-success/20",
    absent: "bg-destructive/10 text-destructive border-destructive/20",
    late: "bg-warning/10 text-warning border-warning/20",
    "half-day": "bg-accent/10 text-accent border-accent/20",
    "on-leave": "bg-primary/10 text-primary border-primary/20",
  };

  const labels = {
    present: "Present",
    absent: "Absent",
    late: "Late",
    "half-day": "Half Day",
    "on-leave": "On Leave",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
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

export function AttendanceTable({ records }: AttendanceTableProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No attendance records found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Mobile card view */}
      <div className="block sm:hidden space-y-3 p-3">
        {records.map((record) => (
          <div key={record.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={record.employeeAvatar} alt={record.employeeName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(record.employeeName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{record.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{record.department}</p>
                </div>
              </div>
              {getStatusBadge(record.status)}
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-background rounded-md p-2">
                <p className="text-xs text-muted-foreground">Clock In</p>
                <p className="text-sm font-medium">{record.clockIn || "-"}</p>
              </div>
              <div className="bg-background rounded-md p-2">
                <p className="text-xs text-muted-foreground">Clock Out</p>
                <p className="text-sm font-medium">{record.clockOut || "-"}</p>
              </div>
              <div className="bg-background rounded-md p-2">
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium">{record.workHours ? `${record.workHours.toFixed(1)}h` : "-"}</p>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {record.date}
              {record.notes && <span className="ml-2">• {record.notes}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <Table className="hidden sm:table">
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Employee</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Department</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Date</TableHead>
            <TableHead className="font-semibold">Clock In</TableHead>
            <TableHead className="font-semibold">Clock Out</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Work Hours</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={record.employeeAvatar} alt={record.employeeName} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(record.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{record.employeeName}</p>
                    <p className="text-xs text-muted-foreground">
                      {record.employeeId}
                    </p>
                    <p className="text-xs text-muted-foreground md:hidden">
                      {record.department}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm hidden md:table-cell">{record.department}</TableCell>
              <TableCell className="text-sm hidden lg:table-cell">{record.date}</TableCell>
              <TableCell className="text-sm font-medium">
                {record.clockIn || "-"}
              </TableCell>
              <TableCell className="text-sm font-medium">
                {record.clockOut || "-"}
              </TableCell>
              <TableCell className="text-sm hidden md:table-cell">
                {record.workHours ? `${record.workHours.toFixed(1)}h` : "-"}
              </TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate hidden lg:table-cell">
                {record.notes || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
