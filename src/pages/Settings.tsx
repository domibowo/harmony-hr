import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, LogOut, Camera, Mail, Phone, Building, MapPin, Bell } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Human Resources",
    position: "HR Manager",
    location: "New York, NY",
    bio: "Experienced HR professional with over 10 years in talent management and employee relations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notifications, setNotifications] = useState({
    emailLeaveRequests: true,
    emailAttendanceAlerts: true,
    emailDocumentUpdates: false,
    emailWeeklyDigest: true,
    emailAnnouncements: true,
    pushLeaveRequests: true,
    pushAttendanceAlerts: false,
    pushDocumentUpdates: true,
    pushReminders: true,
    pushAnnouncements: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password changed",
      description: "Your password has been successfully updated.",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would redirect to login page
    window.location.href = "/";
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preference updated",
      description: "Your notification preference has been saved.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-medium">{profile.firstName} {profile.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{profile.position}</p>
                      <p className="text-sm text-muted-foreground">{profile.department}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Information */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        Department
                      </Label>
                      <Input
                        id="department"
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      placeholder="Tell us a little about yourself..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Choose which email notifications you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailLeaveRequests">Leave Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about leave request submissions and approvals
                    </p>
                  </div>
                  <Switch
                    id="emailLeaveRequests"
                    checked={notifications.emailLeaveRequests}
                    onCheckedChange={(value) => handleNotificationChange("emailLeaveRequests", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailAttendanceAlerts">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about attendance irregularities and late arrivals
                    </p>
                  </div>
                  <Switch
                    id="emailAttendanceAlerts"
                    checked={notifications.emailAttendanceAlerts}
                    onCheckedChange={(value) => handleNotificationChange("emailAttendanceAlerts", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailDocumentUpdates">Document Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when documents are uploaded or updated
                    </p>
                  </div>
                  <Switch
                    id="emailDocumentUpdates"
                    checked={notifications.emailDocumentUpdates}
                    onCheckedChange={(value) => handleNotificationChange("emailDocumentUpdates", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailWeeklyDigest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of HR activities and updates
                    </p>
                  </div>
                  <Switch
                    id="emailWeeklyDigest"
                    checked={notifications.emailWeeklyDigest}
                    onCheckedChange={(value) => handleNotificationChange("emailWeeklyDigest", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailAnnouncements">Company Announcements</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important company-wide announcements
                    </p>
                  </div>
                  <Switch
                    id="emailAnnouncements"
                    checked={notifications.emailAnnouncements}
                    onCheckedChange={(value) => handleNotificationChange("emailAnnouncements", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
                <CardDescription>
                  Control in-app and browser push notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushLeaveRequests">Leave Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Instant notifications for leave request updates
                    </p>
                  </div>
                  <Switch
                    id="pushLeaveRequests"
                    checked={notifications.pushLeaveRequests}
                    onCheckedChange={(value) => handleNotificationChange("pushLeaveRequests", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushAttendanceAlerts">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Real-time alerts for attendance issues
                    </p>
                  </div>
                  <Switch
                    id="pushAttendanceAlerts"
                    checked={notifications.pushAttendanceAlerts}
                    onCheckedChange={(value) => handleNotificationChange("pushAttendanceAlerts", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushDocumentUpdates">Document Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new documents are shared with you
                    </p>
                  </div>
                  <Switch
                    id="pushDocumentUpdates"
                    checked={notifications.pushDocumentUpdates}
                    onCheckedChange={(value) => handleNotificationChange("pushDocumentUpdates", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushReminders">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for pending tasks and deadlines
                    </p>
                  </div>
                  <Switch
                    id="pushReminders"
                    checked={notifications.pushReminders}
                    onCheckedChange={(value) => handleNotificationChange("pushReminders", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushAnnouncements">Announcements</Label>
                    <p className="text-sm text-muted-foreground">
                      Important company announcements and updates
                    </p>
                  </div>
                  <Switch
                    id="pushAnnouncements"
                    checked={notifications.pushAnnouncements}
                    onCheckedChange={(value) => handleNotificationChange("pushAnnouncements", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      placeholder="Enter your new password"
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="Confirm your new password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Logout Section */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Logout</CardTitle>
                <CardDescription>
                  Sign out of your account on this device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be signed out of your account and redirected to the home page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Log Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
