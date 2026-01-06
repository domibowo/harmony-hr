import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Briefcase,
  Clock,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Employees', href: '/employees' },
  { icon: Clock, label: 'Attendance', href: '/attendance' },
  { icon: Calendar, label: 'Leave', href: '/leave' },
  { icon: DollarSign, label: 'Payroll', href: '/payroll' },
  { icon: Briefcase, label: 'Recruitment', href: '/recruitment' },
  { icon: FileText, label: 'Reports', href: '/reports' },
];

const bottomNavItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50 lg:hidden animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">HRIS Pro</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 w-full">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
