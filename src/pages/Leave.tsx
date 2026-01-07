import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveStats } from "@/components/leave/LeaveStats";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { LeaveRequestsTable } from "@/components/leave/LeaveRequestsTable";
import { LeaveCalendar } from "@/components/leave/LeaveCalendar";
import { leaveRequests as initialRequests, leaveBalance } from "@/data/leaves";
import { LeaveRequest } from "@/types/leave";
import { ClipboardList } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Leave = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [activeTab, setActiveTab] = useState("all");

  const handleSubmitRequest = (data: {
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason: string;
  }) => {
    const newRequest: LeaveRequest = {
      id: `${requests.length + 1}`,
      employeeId: "EMP001",
      employeeName: "John Doe",
      department: "Engineering",
      leaveType: data.leaveType as LeaveRequest["leaveType"],
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      reason: data.reason,
      status: "pending",
      appliedOn: format(new Date(), "yyyy-MM-dd"),
    };
    setRequests([newRequest, ...requests]);
  };

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "approved" as const,
              reviewedBy: "John Manager",
              reviewedOn: format(new Date(), "yyyy-MM-dd"),
            }
          : r
      )
    );
    toast({
      title: "Request Approved",
      description: "The leave request has been approved",
    });
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "rejected" as const,
              reviewedBy: "John Manager",
              reviewedOn: format(new Date(), "yyyy-MM-dd"),
            }
          : r
      )
    );
    toast({
      title: "Request Rejected",
      description: "The leave request has been rejected",
      variant: "destructive",
    });
  };

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests;
    return requests.filter((r) => r.status === activeTab);
  }, [requests, activeTab]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Leave Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Submit leave requests and manage team approvals.
          </p>
        </div>

        {/* Stats Overview */}
        <LeaveStats requests={requests} balance={leaveBalance} />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Form and Calendar */}
          <div className="space-y-6 lg:col-span-1">
            <LeaveRequestForm onSubmit={handleSubmitRequest} />
            <LeaveCalendar requests={requests} />
          </div>

          {/* Right Column - Requests Table */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Leave Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab} className="mt-4">
                    <LeaveRequestsTable
                      requests={filteredRequests}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
