import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { AttendanceRecord } from "@/types/attendance";

interface AttendanceStatsProps {
  records: AttendanceRecord[];
  selectedDate: Date | undefined;
}

export function AttendanceStats({ records, selectedDate }: AttendanceStatsProps) {
  const dateStr = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const todayRecords = records.filter((r) => r.date === dateStr);
  const totalEmployees = todayRecords.length || 152;
  const presentCount = todayRecords.filter(
    (r) => r.status === "present" || r.status === "late"
  ).length;
  const absentCount = todayRecords.filter((r) => r.status === "absent").length;
  const lateCount = todayRecords.filter((r) => r.status === "late").length;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Present Today",
      value: presentCount,
      icon: UserCheck,
      color: "bg-success/10 text-success",
    },
    {
      title: "Absent",
      value: absentCount,
      icon: UserX,
      color: "bg-destructive/10 text-destructive",
    },
    {
      title: "Late Arrivals",
      value: lateCount,
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="animate-slide-up"
          style={{ animationDelay: `${(index + 1) * 50}ms` }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
