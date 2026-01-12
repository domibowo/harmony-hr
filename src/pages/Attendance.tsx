import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockInOut } from "@/components/attendance/ClockInOut";
import { AttendanceFilters } from "@/components/attendance/AttendanceFilters";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AttendanceStats } from "@/components/attendance/AttendanceStats";
import { attendanceRecords } from "@/data/attendance";
import { CalendarCheck } from "lucide-react";

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      // Search filter
      if (
        searchQuery &&
        !record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Date filter
      if (selectedDate) {
        const dateStr = selectedDate.toISOString().split("T")[0];
        if (record.date !== dateStr) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== "all" && record.status !== selectedStatus) {
        return false;
      }

      // Department filter
      if (
        selectedDepartment !== "All Departments" &&
        record.department !== selectedDepartment
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDate, selectedStatus, selectedDepartment]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDate(undefined);
    setSelectedStatus("all");
    setSelectedDepartment("All Departments");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Attendance Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Track employee attendance and manage clock-in/clock-out records.
          </p>
        </div>

        {/* Stats Overview */}
        <AttendanceStats records={attendanceRecords} selectedDate={selectedDate} />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Clock In/Out Card */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ClockInOut />
          </div>

          {/* Attendance Records */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  Daily Attendance Records
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-3 sm:px-6">
                <AttendanceFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={setSelectedDepartment}
                  onClearFilters={handleClearFilters}
                />
                <AttendanceTable records={filteredRecords} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
