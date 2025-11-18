import { useState } from "react";
import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from "lucide-react";

type LeaveStatus = "pending" | "approved" | "rejected";

interface Leave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  adminNote?: string;
}

const Leaves = () => {
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState("paid");
  const [reason, setReason] = useState("");

  const leaves: Leave[] = [
    {
      id: "1",
      type: "Paid Leave",
      startDate: "2025-12-01",
      endDate: "2025-12-05",
      days: 5,
      status: "pending",
      reason: "Family vacation",
    },
    {
      id: "2",
      type: "Sick Leave",
      startDate: "2025-11-10",
      endDate: "2025-11-12",
      days: 3,
      status: "approved",
      reason: "Medical appointment",
      adminNote: "Approved. Get well soon!",
    },
    {
      id: "3",
      type: "Paid Leave",
      startDate: "2025-10-15",
      endDate: "2025-10-16",
      days: 2,
      status: "rejected",
      reason: "Personal matters",
      adminNote: "Peak season, please reschedule",
    },
  ];

  const leaveBalance = {
    paid: { available: 12, used: 5, total: 17 },
    sick: { available: 7, used: 3, total: 10 },
    unpaid: { available: "Unlimited", used: 0, total: "-" },
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const variants = {
      pending: "bg-warning/10 text-warning border-warning/20",
      approved: "bg-success/10 text-success border-success/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status];
  };

  const handleApplyLeave = () => {
    console.log("Applying leave:", { leaveType, startDate, endDate, reason });
    setShowApplyDialog(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground mt-1">Apply for leaves and track your requests</p>
          </div>
          <Button onClick={() => setShowApplyDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Apply for Leave
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-gradient p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Paid Leave</h3>
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available</span>
                <span className="font-bold text-success">{leaveBalance.paid.available} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{leaveBalance.paid.used} days</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{leaveBalance.paid.total} days</span>
              </div>
            </div>
          </div>

          <div className="card-gradient p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Sick Leave</h3>
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available</span>
                <span className="font-bold text-success">{leaveBalance.sick.available} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{leaveBalance.sick.used} days</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{leaveBalance.sick.total} days</span>
              </div>
            </div>
          </div>

          <div className="card-gradient p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Unpaid Leave</h3>
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available</span>
                <span className="font-bold text-success">{leaveBalance.unpaid.available}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{leaveBalance.unpaid.used} days</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{leaveBalance.unpaid.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6">
          <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
          <div className="space-y-4">
            {leaves.map((leave) => (
              <div key={leave.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{leave.type}</h3>
                      <Badge variant="outline" className={getStatusBadge(leave.status)}>
                        {leave.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {new Date(leave.startDate).toLocaleDateString()} -{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </span>
                      <span>{leave.days} days</span>
                    </div>
                  </div>
                  {leave.status === "pending" && (
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                </div>
                <p className="text-sm mb-2">
                  <span className="text-muted-foreground">Reason:</span> {leave.reason}
                </p>
                {leave.adminNote && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Admin Note</p>
                    <p className="text-sm">{leave.adminNote}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription>Submit a new leave request for approval</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Leave Type</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid Leave ({leaveBalance.paid.available} days available)</SelectItem>
                  <SelectItem value="sick">Sick Leave ({leaveBalance.sick.available} days available)</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md border mt-2"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md border mt-2"
                  disabled={(date) => startDate ? date < startDate : false}
                />
              </div>
            </div>

            <div>
              <Label>Reason</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for your leave request..."
                className="mt-2"
                rows={4}
              />
            </div>

            {startDate && endDate && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyLeave}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EmployeeLayout>
  );
};

export default Leaves;
