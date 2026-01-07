import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { LeaveRequest } from "@/types/leave";
import { parseISO, isWithinInterval, format } from "date-fns";

interface LeaveCalendarProps {
  requests: LeaveRequest[];
}

export function LeaveCalendar({ requests }: LeaveCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const approvedLeaves = requests.filter((r) => r.status === "approved");

  // Get leaves for a specific date
  const getLeavesForDate = (date: Date) => {
    return approvedLeaves.filter((leave) => {
      const start = parseISO(leave.startDate);
      const end = parseISO(leave.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  // Get modifiers for calendar styling
  const leaveDates = approvedLeaves.flatMap((leave) => {
    const dates: Date[] = [];
    const start = parseISO(leave.startDate);
    const end = parseISO(leave.endDate);
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const selectedDateLeaves = selectedDate ? getLeavesForDate(selectedDate) : [];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays className="h-5 w-5 text-primary" />
          Leave Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            leave: leaveDates,
          }}
          modifiersStyles={{
            leave: {
              backgroundColor: "hsl(var(--primary) / 0.15)",
              color: "hsl(var(--primary))",
              fontWeight: "bold",
            },
          }}
          className="rounded-md border pointer-events-auto"
        />

        {/* Selected Date Info */}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </p>
          {selectedDateLeaves.length > 0 ? (
            <div className="space-y-2">
              {selectedDateLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">
                      {leave.employeeName}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {leave.leaveType}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No leaves scheduled for this date
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
