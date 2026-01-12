import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  onClearFilters: () => void;
}

const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Finance",
  "Sales",
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "half-day", label: "Half Day" },
  { value: "on-leave", label: "On Leave" },
];

export function AttendanceFilters({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  selectedStatus,
  onStatusChange,
  selectedDepartment,
  onDepartmentChange,
  onClearFilters,
}: AttendanceFiltersProps) {
  const hasActiveFilters =
    searchQuery ||
    selectedDate ||
    selectedStatus !== "all" ||
    selectedDepartment !== "All Departments";

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:items-center">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[150px] justify-start text-left font-normal text-sm",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">{selectedDate ? format(selectedDate, "PP") : "Date"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department Filter */}
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="shrink-0 w-full sm:w-auto">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
