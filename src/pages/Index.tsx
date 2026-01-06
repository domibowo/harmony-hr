import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmployeeList } from "@/components/dashboard/EmployeeList";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { LeaveRequests } from "@/components/dashboard/LeaveRequests";
import { Users, UserCheck, CalendarOff, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your team today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value="152"
            change="+12 this month"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary/10 text-primary"
            delay={50}
          />
          <StatCard
            title="Present Today"
            value="145"
            change="95.4% attendance"
            changeType="positive"
            icon={UserCheck}
            iconColor="bg-success/10 text-success"
            delay={100}
          />
          <StatCard
            title="On Leave"
            value="7"
            change="3 pending requests"
            changeType="neutral"
            icon={CalendarOff}
            iconColor="bg-warning/10 text-warning"
            delay={150}
          />
          <StatCard
            title="Open Positions"
            value="8"
            change="24 applications"
            changeType="neutral"
            icon={Briefcase}
            iconColor="bg-accent/10 text-accent"
            delay={200}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Takes 2 cols on large screens */}
          <div className="space-y-6 lg:col-span-2">
            <AttendanceChart />
            <LeaveRequests />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <UpcomingEvents />
          </div>
        </div>

        {/* Employee List - Full Width */}
        <EmployeeList />
      </div>
    </DashboardLayout>
  );
};

export default Index;
