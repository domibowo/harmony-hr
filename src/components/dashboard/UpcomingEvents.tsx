import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Cake, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: 1,
    title: "Team Meeting",
    description: "Weekly sync with Engineering",
    date: "Today, 2:00 PM",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Birthday - Sarah J.",
    description: "Don't forget to wish her!",
    date: "Tomorrow",
    icon: Cake,
    color: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    title: "Performance Review",
    description: "Q4 reviews deadline",
    date: "Jan 15, 2026",
    icon: Award,
    color: "bg-warning/10 text-warning",
  },
  {
    id: 4,
    title: "Company Holiday",
    description: "Martin Luther King Jr. Day",
    date: "Jan 20, 2026",
    icon: Calendar,
    color: "bg-success/10 text-success",
  },
];

export function UpcomingEvents() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
          >
            <div className={cn("rounded-lg p-2.5 h-fit", event.color)}>
              <event.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {event.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
