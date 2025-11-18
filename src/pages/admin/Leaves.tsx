import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, CheckCircle, XCircle, Calendar } from "lucide-react";

type LeaveStatus = "pending" | "approved" | "rejected";

interface Leave {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  appliedAt: string;
}

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [actionNote, setActionNote] = useState("");

  const leaves: Leave[] = [
    {
      id: "1",
      employeeName: "Sarah Chen",
      type: "Paid Leave",
      startDate: "2025-12-01",
      endDate: "2025-12-05",
      days: 5,
      status: "pending",
      reason: "Family vacation",
      appliedAt: "2025-11-10",
    },
    {
      id: "2",
      employeeName: "Michael Torres",
      type: "Sick Leave",
      startDate: "2025-11-20",
      endDate: "2025-11-22",
      days: 3,
      status: "approved",
      reason: "Medical treatment",
      appliedAt: "2025-11-18",
    },
    {
      id: "3",
      employeeName: "Emily Johnson",
      type: "Unpaid Leave",
      startDate: "2025-12-10",
      endDate: "2025-12-15",
      days: 6,
      status: "pending",
      reason: "Personal matters",
      appliedAt: "2025-11-12",
    },
    {
      id: "4",
      employeeName: "David Kim",
      type: "Paid Leave",
      startDate: "2025-11-15",
      endDate: "2025-11-16",
      days: 2,
      status: "rejected",
      reason: "Short trip",
      appliedAt: "2025-11-14",
    },
  ];

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || leave.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (leave: Leave) => {
    setSelectedLeave(leave);
  };

  const handleReject = (leave: Leave) => {
    setSelectedLeave(leave);
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const variants = {
      pending: "bg-warning/10 text-warning border-warning/20",
      approved: "bg-success/10 text-success border-success/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground mt-1">Review and manage employee leave requests</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">
                  {leaves.filter((l) => l.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">
                  {leaves.filter((l) => l.status === "approved").length}
                </p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">
                  {leaves.filter((l) => l.status === "rejected").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell className="font-medium">{leave.employeeName}</TableCell>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(leave.status)}>
                        {leave.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {leave.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleApprove(leave)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(leave)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedLeave} onOpenChange={() => setSelectedLeave(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>Review and take action on this leave request</DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="font-medium">{selectedLeave.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedLeave.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedLeave.days} days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied</p>
                  <p className="font-medium">{new Date(selectedLeave.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Reason</p>
                <p className="text-sm p-3 bg-muted rounded-lg">{selectedLeave.reason}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Add Note (Optional)</label>
                <Textarea
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="Add a note about this decision..."
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLeave(null)}>
              Cancel
            </Button>
            <Button variant="success">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button variant="destructive">
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Leaves;
