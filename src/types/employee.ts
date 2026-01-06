export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  startDate: string;
  avatar?: string;
  employeeId: string;
}

export type EmployeeFormData = Omit<Employee, 'id'>;
