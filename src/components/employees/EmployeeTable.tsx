import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Employee } from '@/types/employee';
import { cn } from '@/lib/utils';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

const statusStyles = {
  Active: 'bg-success/10 text-success border-success/20',
  'On Leave': 'bg-warning/10 text-warning border-warning/20',
  Terminated: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function EmployeeTable({ employees, onEdit, onDelete, onView }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No employees found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Employee</TableHead>
            <TableHead className="hidden md:table-cell">Department</TableHead>
            <TableHead className="hidden lg:table-cell">Position</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Start Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                    <AvatarFallback>
                      {employee.firstName[0]}{employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                    <p className="text-xs text-muted-foreground md:hidden">{employee.department}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
              <TableCell className="hidden lg:table-cell">{employee.position}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="outline" className={cn('border', statusStyles[employee.status])}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(employee.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(employee)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(employee)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(employee)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
