import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut } from "lucide-react";
import { ClockStatus } from "@/types/attendance";
import { toast } from "@/hooks/use-toast";

export function ClockInOut() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockStatus, setClockStatus] = useState<ClockStatus>({
    isClockedIn: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClockIn = () => {
    const time = formatTime(new Date());
    setClockStatus({
      isClockedIn: true,
      clockInTime: time,
    });
    toast({
      title: "Clocked In Successfully",
      description: `You clocked in at ${time}`,
    });
  };

  const handleClockOut = () => {
    const time = formatTime(new Date());
    setClockStatus((prev) => ({
      ...prev,
      isClockedIn: false,
      clockOutTime: time,
    }));
    toast({
      title: "Clocked Out Successfully",
      description: `You clocked out at ${time}`,
    });
  };

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-primary" />
          Time Clock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          {/* Current Time Display */}
          <div className="py-4">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              {formatTime(currentTime)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(currentTime)}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              variant={clockStatus.isClockedIn ? "default" : "secondary"}
              className={`px-4 py-1 ${
                clockStatus.isClockedIn
                  ? "bg-success/10 text-success border-success/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {clockStatus.isClockedIn ? "Currently Working" : "Not Clocked In"}
            </Badge>
          </div>

          {/* Clock Times */}
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Clock In</p>
              <p className="font-semibold text-foreground">
                {clockStatus.clockInTime || "--:--"}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Clock Out</p>
              <p className="font-semibold text-foreground">
                {clockStatus.clockOutTime || "--:--"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={handleClockIn}
              disabled={clockStatus.isClockedIn}
              variant={clockStatus.isClockedIn ? "outline" : "default"}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Clock In
            </Button>
            <Button
              className="flex-1"
              onClick={handleClockOut}
              disabled={!clockStatus.isClockedIn}
              variant={!clockStatus.isClockedIn ? "outline" : "destructive"}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Clock Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
