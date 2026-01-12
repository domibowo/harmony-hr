import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmployeeFilters } from '@/components/employees/EmployeeFilters';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeDialog } from '@/components/employees/EmployeeDialog';
import { EmployeeViewDialog } from '@/components/employees/EmployeeViewDialog';
import { DeleteConfirmDialog } from '@/components/employees/DeleteConfirmDialog';
import { mockEmployees } from '@/data/employees';
import { Employee, EmployeeFormData } from '@/types/employee';
import { UserPlus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Employees = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dialog states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = searchQuery === '' || 
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchQuery, departmentFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsAddEditOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddEditOpen(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteOpen(true);
  };

  const handleSubmitEmployee = (data: EmployeeFormData) => {
    if (selectedEmployee) {
      // Edit existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, ...data } : emp
        )
      );
      toast({
        title: 'Employee Updated',
        description: `${data.firstName} ${data.lastName}'s profile has been updated.`,
      });
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...data,
        id: String(Date.now()),
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      toast({
        title: 'Employee Added',
        description: `${data.firstName} ${data.lastName} has been added to the team.`,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== selectedEmployee.id));
      toast({
        title: 'Employee Deleted',
        description: `${selectedEmployee.firstName} ${selectedEmployee.lastName} has been removed.`,
        variant: 'destructive',
      });
      setIsDeleteOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleEditFromView = () => {
    setIsViewOpen(false);
    setIsAddEditOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their information
            </p>
          </div>
          <Button onClick={handleAddEmployee} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold">{employees.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-success/10 shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold">
                    {employees.filter((e) => e.status === 'Active').length}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-warning/10 shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold">
                    {employees.filter((e) => e.status === 'On Leave').length}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-muted shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold">
                    {new Set(employees.map((e) => e.department)).size}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Table */}
        <Card variant="elevated">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Employee Directory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-3 sm:px-6">
            <EmployeeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              departmentFilter={departmentFilter}
              onDepartmentChange={setDepartmentFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onClearFilters={handleClearFilters}
            />
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              onView={handleViewEmployee}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <EmployeeDialog
        open={isAddEditOpen}
        onOpenChange={setIsAddEditOpen}
        employee={selectedEmployee}
        onSubmit={handleSubmitEmployee}
      />
      <EmployeeViewDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        employee={selectedEmployee}
        onEdit={handleEditFromView}
      />
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        employee={selectedEmployee}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  );
};

export default Employees;
