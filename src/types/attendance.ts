export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: "present" | "absent" | "late" | "half-day" | "on-leave";
  workHours?: number;
  notes?: string;
}

export interface ClockStatus {
  isClockedIn: boolean;
  clockInTime?: string;
  clockOutTime?: string;
}
