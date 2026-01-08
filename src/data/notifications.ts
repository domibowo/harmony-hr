import { Notification } from "@/types/notification";

export const allNotifications: Notification[] = [
  { id: "1", type: "leave", title: "Leave Request", message: "John Doe requested 3 days annual leave", time: "5 min ago", read: false, actionUrl: "/leave" },
  { id: "2", type: "attendance", title: "Late Clock-in", message: "Sarah Smith clocked in 30 minutes late", time: "1 hour ago", read: false, actionUrl: "/attendance" },
  { id: "3", type: "alert", title: "Document Expiring", message: "Employee contract for Mike Johnson expires in 7 days", time: "2 hours ago", read: true },
  { id: "4", type: "approval", title: "Expense Approved", message: "Your travel expense claim has been approved", time: "3 hours ago", read: true },
  { id: "5", type: "system", title: "System Update", message: "HRIS Pro will undergo maintenance tonight at 11 PM", time: "5 hours ago", read: false },
  { id: "6", type: "leave", title: "Leave Approved", message: "Your sick leave request has been approved", time: "1 day ago", read: true, actionUrl: "/leave" },
  { id: "7", type: "attendance", title: "Missing Clock-out", message: "Emily Davis forgot to clock out yesterday", time: "1 day ago", read: true, actionUrl: "/attendance" },
  { id: "8", type: "alert", title: "Birthday Reminder", message: "James Wilson's birthday is tomorrow", time: "1 day ago", read: false },
  { id: "9", type: "approval", title: "Leave Rejected", message: "Annual leave request for Dec 25-30 was rejected", time: "2 days ago", read: true, actionUrl: "/leave" },
  { id: "10", type: "system", title: "New Feature", message: "Check out the new attendance analytics dashboard", time: "2 days ago", read: true },
  { id: "11", type: "leave", title: "Leave Request", message: "Anna Brown requested 1 week maternity leave", time: "3 days ago", read: true, actionUrl: "/leave" },
  { id: "12", type: "attendance", title: "Perfect Attendance", message: "5 employees achieved perfect attendance this month", time: "3 days ago", read: true },
  { id: "13", type: "alert", title: "Policy Update", message: "New remote work policy has been published", time: "4 days ago", read: true },
  { id: "14", type: "approval", title: "Overtime Approved", message: "Your overtime request for Saturday has been approved", time: "4 days ago", read: true },
  { id: "15", type: "system", title: "Password Reminder", message: "Your password will expire in 14 days", time: "5 days ago", read: true },
  { id: "16", type: "leave", title: "Leave Balance", message: "Your annual leave balance has been updated", time: "1 week ago", read: true },
  { id: "17", type: "attendance", title: "Weekly Report", message: "Your weekly attendance report is ready", time: "1 week ago", read: true },
  { id: "18", type: "alert", title: "Training Due", message: "Mandatory compliance training due in 5 days", time: "1 week ago", read: false },
];
