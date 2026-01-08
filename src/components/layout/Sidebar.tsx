import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  Building2,
  Clock,
  Briefcase,
  Menu,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Employees", icon: Users, path: "/employees" },
  { title: "Attendance", icon: Clock, path: "/attendance" },
  { title: "Leave Management", icon: Calendar, path: "/leave" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Recruitment", icon: Briefcase, path: "/recruitment" },
  { title: "Documents", icon: FileText, path: "/documents" },
  { title: "Department", icon: Building2, path: "/department" },
];

const bottomNavItems = [
  { title: "Settings", icon: Settings, path: "/settings" },
  { title: "Help Center", icon: HelpCircle, path: "/help" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:relative",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            {isOpen && (
              <span className="text-lg font-semibold animate-fade-in">
                HRIS Pro
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <div className="mb-4">
            {isOpen && (
              <span className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">
                Main Menu
              </span>
            )}
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen && <span className="animate-fade-in">{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom navigation */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen && <span className="animate-fade-in">{item.title}</span>}
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed left-4 top-4 z-40 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
