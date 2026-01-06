import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    department: "Engineering",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    department: "Product",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UX Designer",
    department: "Design",
    status: "on-leave",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Marketing Lead",
    department: "Marketing",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "HR Specialist",
    department: "Human Resources",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
];

export function EmployeeList() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Employees</CardTitle>
        <a href="/employees" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </CardHeader>
      <CardContent className="space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-secondary/50"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{employee.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {employee.role} • {employee.department}
              </p>
            </div>
            <Badge
              variant={employee.status === "active" ? "default" : "secondary"}
              className={
                employee.status === "active"
                  ? "bg-success/10 text-success hover:bg-success/20 border-0"
                  : "bg-warning/10 text-warning hover:bg-warning/20 border-0"
              }
            >
              {employee.status === "active" ? "Active" : "On Leave"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
