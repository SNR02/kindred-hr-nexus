import { useState } from "react";
import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Calendar, CheckCircle, Timer } from "lucide-react";

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  status: "present" | "late" | "absent";
}

const Attendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const attendanceRecords: AttendanceRecord[] = [
    {
      date: "2025-11-18",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      duration: "8h 30m",
      status: "present",
    },
    {
      date: "2025-11-17",
      checkIn: "09:05 AM",
      checkOut: "05:35 PM",
      duration: "8h 30m",
      status: "present",
    },
    {
      date: "2025-11-16",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      duration: "8h 30m",
      status: "late",
    },
    {
      date: "2025-11-15",
      checkIn: "08:55 AM",
      checkOut: "05:25 PM",
      duration: "8h 30m",
      status: "present",
    },
  ];

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-success/10 text-success border-success/20",
      late: "bg-warning/10 text-warning border-warning/20",
      absent: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status as keyof typeof variants];
  };

  const stats = {
    thisMonth: attendanceRecords.length,
    present: attendanceRecords.filter((r) => r.status === "present").length,
    late: attendanceRecords.filter((r) => r.status === "late").length,
    avgHours: "8.5",
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your daily attendance and work hours</p>
        </div>

        <div className="card-gradient p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Today's Attendance</h2>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {isCheckedIn ? (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-success/10 text-success rounded-lg">
                <CheckCircle className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">Checked In</p>
                  <p className="text-sm">{checkInTime}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Timer className="w-5 h-5" />
                <span className="text-lg font-mono">Working: 4h 30m</span>
              </div>
              <Button size="lg" variant="outline" onClick={handleCheckOut}>
                <Clock className="w-5 h-5 mr-2" />
                Check Out
              </Button>
            </div>
          ) : (
            <Button size="lg" className="px-12" onClick={handleCheckIn}>
              <Clock className="w-5 h-5 mr-2" />
              Check In Now
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold">{stats.present}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold">{stats.late}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Timer className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Hours</p>
                <p className="text-2xl font-bold">{stats.avgHours}h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-gradient p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default Attendance;
