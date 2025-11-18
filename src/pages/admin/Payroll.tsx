import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, DollarSign, CheckCircle, Clock, Download, Eye } from "lucide-react";

type PayrollStatus = "draft" | "complete" | "paid";

interface PayrollRun {
  id: string;
  month: string;
  status: PayrollStatus;
  employeeCount: number;
  totalGross: number;
  totalNet: number;
  createdAt: string;
}

interface PayrollItem {
  employeeName: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  gross: number;
  net: number;
}

const Payroll = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const payrollRuns: PayrollRun[] = [
    {
      id: "1",
      month: "November 2025",
      status: "paid",
      employeeCount: 12,
      totalGross: 156000,
      totalNet: 142000,
      createdAt: "2025-11-01",
    },
    {
      id: "2",
      month: "October 2025",
      status: "paid",
      employeeCount: 12,
      totalGross: 156000,
      totalNet: 142000,
      createdAt: "2025-10-01",
    },
    {
      id: "3",
      month: "September 2025",
      status: "complete",
      employeeCount: 11,
      totalGross: 143000,
      totalNet: 130000,
      createdAt: "2025-09-01",
    },
    {
      id: "4",
      month: "December 2025",
      status: "draft",
      employeeCount: 12,
      totalGross: 160000,
      totalNet: 145000,
      createdAt: "2025-11-15",
    },
  ];

  const payrollItems: PayrollItem[] = [
    {
      employeeName: "Sarah Chen",
      baseSalary: 15000,
      bonuses: 2000,
      deductions: 1500,
      gross: 17000,
      net: 15500,
    },
    {
      employeeName: "Michael Torres",
      baseSalary: 12000,
      bonuses: 1000,
      deductions: 1200,
      gross: 13000,
      net: 11800,
    },
    {
      employeeName: "Emily Johnson",
      baseSalary: 13000,
      bonuses: 1500,
      deductions: 1300,
      gross: 14500,
      net: 13200,
    },
  ];

  const getStatusBadge = (status: PayrollStatus) => {
    const variants = {
      draft: "bg-muted text-muted-foreground border-muted",
      complete: "bg-success/10 text-success border-success/20",
      paid: "bg-primary/10 text-primary border-primary/20",
    };
    return variants[status];
  };

  const stats = {
    totalRuns: payrollRuns.length,
    draftRuns: payrollRuns.filter((r) => r.status === "draft").length,
    totalPaidThisYear: 1850000,
    avgSalary: 13000,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payroll Management</h1>
            <p className="text-muted-foreground mt-1">Manage payroll runs and employee payments</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Payroll Run
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Runs</p>
                <p className="text-2xl font-bold">{stats.totalRuns}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft Runs</p>
                <p className="text-2xl font-bold">{stats.draftRuns}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid YTD</p>
                <p className="text-2xl font-bold">${(stats.totalPaidThisYear / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Salary</p>
                <p className="text-2xl font-bold">${(stats.avgSalary / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6">
          <h2 className="text-xl font-semibold mb-4">Payroll Runs</h2>
          <div className="space-y-4">
            {payrollRuns.map((run) => (
              <div
                key={run.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{run.month}</h3>
                      <Badge variant="outline" className={getStatusBadge(run.status)}>
                        {run.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Employees</p>
                        <p className="font-medium">{run.employeeCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Gross</p>
                        <p className="font-medium">${run.totalGross.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Net</p>
                        <p className="font-medium">${run.totalNet.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-medium">{new Date(run.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRun(run);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {run.status === "draft" && (
                      <Button variant="success" size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Finalize
                      </Button>
                    )}
                    {run.status === "complete" && (
                      <Button variant="default" size="sm">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Mark Paid
                      </Button>
                    )}
                    {run.status === "paid" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Payroll Run</DialogTitle>
            <DialogDescription>
              Create a new payroll run for the upcoming month
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will create a new payroll run for December 2025 with all active employees.
            </p>
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Employees</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Estimated Gross</span>
                <span className="font-medium">$160,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Estimated Net</span>
                <span className="font-medium">$145,000</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>Create Run</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Payroll Run Details - {selectedRun?.month}</DialogTitle>
            <DialogDescription>Detailed breakdown of payroll items</DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Bonuses</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Net Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.employeeName}</TableCell>
                    <TableCell>${item.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-success">${item.bonuses.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive">
                      -${item.deductions.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">${item.gross.toLocaleString()}</TableCell>
                    <TableCell className="font-bold">${item.net.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Payroll;
