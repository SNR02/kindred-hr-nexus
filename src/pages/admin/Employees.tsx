import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus,
  Download,
  Mail,
  Phone
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Employees = () => {
  const navigate = useNavigate();
  const employees = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      phone: "+1 (555) 123-4567",
      designation: "Senior Software Engineer",
      department: "Engineering",
      salary: "$145,000",
      status: "active",
      manager: "David Kim",
      initials: "SC"
    },
    {
      id: 2,
      name: "Michael Ross",
      email: "michael.ross@example.com",
      phone: "+1 (555) 234-5678",
      designation: "Sales Manager",
      department: "Sales",
      salary: "$120,000",
      status: "active",
      manager: "Jennifer Lee",
      initials: "MR"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 345-6789",
      designation: "Product Designer",
      department: "Design",
      salary: "$110,000",
      status: "active",
      manager: "Lisa Park",
      initials: "EW"
    },
    {
      id: 4,
      name: "James Anderson",
      email: "james.anderson@example.com",
      phone: "+1 (555) 456-7890",
      designation: "DevOps Engineer",
      department: "Engineering",
      salary: "$135,000",
      status: "active",
      manager: "David Kim",
      initials: "JA"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      email: "lisa.martinez@example.com",
      phone: "+1 (555) 567-8901",
      designation: "HR Specialist",
      department: "Human Resources",
      salary: "$85,000",
      status: "active",
      manager: "Admin User",
      initials: "LM"
    },
    {
      id: 6,
      name: "David Thompson",
      email: "david.thompson@example.com",
      phone: "+1 (555) 678-9012",
      designation: "Marketing Coordinator",
      department: "Marketing",
      salary: "$75,000",
      status: "inactive",
      manager: "Rachel Green",
      initials: "DT"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employees</h1>
            <p className="text-muted-foreground">Manage your team and employee information</p>
          </div>
          <Button variant="hero" className="gap-2" onClick={() => navigate("/admin/add-employee")}>
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, or designation..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-card border-border/50">
            <div className="text-2xl font-bold">248</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </Card>
          <Card className="p-4 bg-gradient-card border-border/50">
            <div className="text-2xl font-bold text-success">242</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </Card>
          <Card className="p-4 bg-gradient-card border-border/50">
            <div className="text-2xl font-bold text-muted-foreground">6</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </Card>
          <Card className="p-4 bg-gradient-card border-border/50">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">New This Month</div>
          </Card>
        </div>

        {/* Table */}
        <Card className="bg-gradient-card border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead>Employee</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} className="border-border hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {employee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate max-w-[150px]">
                          {employee.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{employee.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{employee.designation}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {employee.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{employee.salary}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === 'active' ? 'default' : 'secondary'}
                      className={employee.status === 'active' ? 'bg-success/10 text-success border-success/20' : ''}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {employee.manager}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 1-6 of 248 employees
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employees;