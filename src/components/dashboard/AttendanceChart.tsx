import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", present: 145, absent: 7 },
  { day: "Tue", present: 148, absent: 4 },
  { day: "Wed", present: 142, absent: 10 },
  { day: "Thu", present: 150, absent: 2 },
  { day: "Fri", present: 140, absent: 12 },
  { day: "Sat", present: 45, absent: 2 },
  { day: "Sun", present: 0, absent: 0 },
];

export function AttendanceChart() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Weekly Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  boxShadow: "var(--shadow-card-hover)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="present"
                stroke="hsl(217, 91%, 45%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPresent)"
                name="Present"
              />
              <Area
                type="monotone"
                dataKey="absent"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAbsent)"
                name="Absent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
