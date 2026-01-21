
-- Create enums for status types
CREATE TYPE public.employee_status AS ENUM ('Active', 'On Leave', 'Terminated');
CREATE TYPE public.attendance_status AS ENUM ('present', 'absent', 'late', 'half-day', 'on-leave');
CREATE TYPE public.leave_type AS ENUM ('annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected');

-- Create employees table
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  status employee_status NOT NULL DEFAULT 'Active',
  start_date DATE NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance_records table
CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  clock_in TIME,
  clock_out TIME,
  status attendance_status NOT NULL DEFAULT 'present',
  work_hours DECIMAL(4,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, date)
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  leave_type leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status leave_status NOT NULL DEFAULT 'pending',
  applied_on DATE NOT NULL DEFAULT CURRENT_DATE,
  reviewed_by TEXT,
  reviewed_on DATE,
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for employees (authenticated users can read, insert, update, delete)
CREATE POLICY "Authenticated users can view employees"
ON public.employees FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert employees"
ON public.employees FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update employees"
ON public.employees FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete employees"
ON public.employees FOR DELETE TO authenticated USING (true);

-- RLS policies for attendance_records
CREATE POLICY "Authenticated users can view attendance"
ON public.attendance_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert attendance"
ON public.attendance_records FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update attendance"
ON public.attendance_records FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete attendance"
ON public.attendance_records FOR DELETE TO authenticated USING (true);

-- RLS policies for leave_requests
CREATE POLICY "Authenticated users can view leave requests"
ON public.leave_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert leave requests"
ON public.leave_requests FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update leave requests"
ON public.leave_requests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete leave requests"
ON public.leave_requests FOR DELETE TO authenticated USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_records_updated_at
BEFORE UPDATE ON public.attendance_records
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at
BEFORE UPDATE ON public.leave_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_employees_department ON public.employees(department);
CREATE INDEX idx_employees_status ON public.employees(status);
CREATE INDEX idx_attendance_employee_id ON public.attendance_records(employee_id);
CREATE INDEX idx_attendance_date ON public.attendance_records(date);
CREATE INDEX idx_leave_requests_employee_id ON public.leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON public.leave_requests(status);
