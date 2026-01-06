import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const requests = [
  {
    id: 1,
    name: "Alex Thompson",
    type: "Vacation",
    dates: "Jan 10 - Jan 15",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 2,
    name: "Maria Garcia",
    type: "Sick Leave",
    dates: "Jan 8 - Jan 9",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 3,
    name: "David Park",
    type: "Personal",
    dates: "Jan 12",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    status: "pending",
  },
];

export function LeaveRequests() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "350ms" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Pending Leave Requests
        </CardTitle>
        <Badge variant="secondary" className="font-medium">
          {requests.length} pending
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center gap-4 rounded-lg border border-border p-4"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={request.avatar} alt={request.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {request.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{request.name}</p>
              <p className="text-sm text-muted-foreground">
                {request.type} • {request.dates}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 hover:bg-success/10 hover:text-success hover:border-success/30"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
