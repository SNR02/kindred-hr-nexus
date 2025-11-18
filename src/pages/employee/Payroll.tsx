import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DollarSign, Download, Eye, Calendar } from "lucide-react";

type PayrollStatus = "draft" | "complete" | "paid";

interface Payslip {
  id: string;
  month: string;
  status: PayrollStatus;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  gross: number;
  net: number;
  paidDate?: string;
}

const Payroll = () => {
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const payslips: Payslip[] = [
    {
      id: "1",
      month: "November 2025",
      status: "paid",
      baseSalary: 15000,
      bonuses: 2000,
      deductions: 1500,
      gross: 17000,
      net: 15500,
      paidDate: "2025-11-30",
    },
    {
      id: "2",
      month: "October 2025",
      status: "paid",
      baseSalary: 15000,
      bonuses: 1500,
      deductions: 1500,
      gross: 16500,
      net: 15000,
      paidDate: "2025-10-31",
    },
    {
      id: "3",
      month: "September 2025",
      status: "paid",
      baseSalary: 15000,
      bonuses: 1000,
      deductions: 1500,
      gross: 16000,
      net: 14500,
      paidDate: "2025-09-30",
    },
    {
      id: "4",
      month: "December 2025",
      status: "complete",
      baseSalary: 15000,
      bonuses: 3000,
      deductions: 1500,
      gross: 18000,
      net: 16500,
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

  const yearToDate = payslips
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.net, 0);

  const handleViewDetails = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
    setShowDetailsDialog(true);
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payroll</h1>
          <p className="text-muted-foreground mt-1">View your payslips and payment history</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Salary</p>
                <p className="text-2xl font-bold">$15,000</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year to Date</p>
                <p className="text-2xl font-bold">${yearToDate.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-lg font-bold">Dec 31</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="space-y-4">
            {payslips.map((payslip) => (
              <div
                key={payslip.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">{payslip.month}</h3>
                      <Badge variant="outline" className={getStatusBadge(payslip.status)}>
                        {payslip.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Base Salary</p>
                        <p className="font-medium">${payslip.baseSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Bonuses</p>
                        <p className="font-medium text-success">+${payslip.bonuses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deductions</p>
                        <p className="font-medium text-destructive">-${payslip.deductions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gross Pay</p>
                        <p className="font-medium">${payslip.gross.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Pay</p>
                        <p className="font-bold text-lg">${payslip.net.toLocaleString()}</p>
                      </div>
                    </div>
                    {payslip.paidDate && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Paid on {new Date(payslip.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(payslip)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {payslip.status === "paid" && (
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

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payslip Details - {selectedPayslip?.month}</DialogTitle>
            <DialogDescription>Detailed breakdown of your payment</DialogDescription>
          </DialogHeader>
          {selectedPayslip && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-hero text-primary-foreground rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Net Pay</p>
                    <p className="text-4xl font-bold">${selectedPayslip.net.toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className="bg-background/20 text-primary-foreground border-primary-foreground/20">
                    {selectedPayslip.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Earnings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-muted rounded">
                    <span>Base Salary</span>
                    <span className="font-medium">${selectedPayslip.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded">
                    <span>Bonuses</span>
                    <span className="font-medium text-success">+${selectedPayslip.bonuses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-primary/5 rounded font-medium">
                    <span>Gross Pay</span>
                    <span>${selectedPayslip.gross.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Deductions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-muted rounded">
                    <span>Tax & Insurance</span>
                    <span className="font-medium text-destructive">-${selectedPayslip.deductions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-primary/5 rounded font-bold text-lg">
                    <span>Net Pay</span>
                    <span>${selectedPayslip.net.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedPayslip.paidDate && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Payment Date: {new Date(selectedPayslip.paidDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </EmployeeLayout>
  );
};

export default Payroll;
