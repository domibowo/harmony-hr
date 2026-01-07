import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { LeaveRequest, LeaveBalance } from "@/types/leave";

interface LeaveStatsProps {
  requests: LeaveRequest[];
  balance: LeaveBalance;
}

export function LeaveStats({ requests, balance }: LeaveStatsProps) {
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  const stats = [
    {
      title: "Leave Balance",
      value: balance.remaining,
      subtitle: `${balance.used} used`,
      icon: Calendar,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Pending Requests",
      value: pendingCount,
      subtitle: "Awaiting approval",
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
    {
      title: "Approved",
      value: approvedCount,
      subtitle: "This year",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
    {
      title: "Rejected",
      value: rejectedCount,
      subtitle: "This year",
      icon: XCircle,
      color: "bg-destructive/10 text-destructive",
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
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
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
