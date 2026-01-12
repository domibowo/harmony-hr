import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockEmployees, departments } from '@/data/employees';
import { Search, Users, Building2 } from 'lucide-react';

const statusStyles: Record<string, string> = {
  'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'On Leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Terminated': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('');

  const departmentData = useMemo(() => {
    return departments.map(dept => {
      const employees = mockEmployees.filter(emp => 
        emp.department === dept &&
        (searchQuery === '' || 
          emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return {
        name: dept,
        employees,
        activeCount: employees.filter(e => e.status === 'Active').length,
      };
    }).filter(dept => dept.employees.length > 0 || searchQuery === '');
  }, [searchQuery]);

  const totalEmployees = mockEmployees.length;
  const totalDepartments = departments.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            View all departments and their team members
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="stat">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDepartments}</div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees or positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Department Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departmentData.map((dept) => (
            <Card key={dept.name} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <Badge variant="secondary">
                    {dept.employees.length} {dept.employees.length === 1 ? 'member' : 'members'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dept.activeCount} active
                </p>
              </CardHeader>
              <CardContent className="p-4">
                {dept.employees.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No employees found
                  </p>
                ) : (
                  <div className="space-y-3">
                    {dept.employees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                          <AvatarFallback>
                            {employee.firstName[0]}{employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {employee.position}
                          </p>
                        </div>
                        <Badge className={statusStyles[employee.status]} variant="secondary">
                          {employee.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
