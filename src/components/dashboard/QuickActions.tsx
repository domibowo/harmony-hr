import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText, Calendar, Send } from "lucide-react";

const actions = [
  {
    title: "Add Employee",
    description: "Register new team member",
    icon: UserPlus,
  },
  {
    title: "Create Report",
    description: "Generate HR reports",
    icon: FileText,
  },
  {
    title: "Schedule Interview",
    description: "Book candidate meetings",
    icon: Calendar,
  },
  {
    title: "Send Announcement",
    description: "Broadcast to all staff",
    icon: Send,
  },
];

export function QuickActions() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto flex-col gap-2 p-4 hover:bg-primary/5 hover:border-primary/30"
          >
            <action.icon className="h-5 w-5 text-primary" />
            <div className="text-center">
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
