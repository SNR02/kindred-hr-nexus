import EmployeeLayout from "@/components/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, LogIn, LogOut, FileText, Plus } from "lucide-react";

const EmployeeDashboard = () => {
  const quickStats = [
    {
      title: "Leave Balance",
      value: "18 days",
      subtitle: "5 days used",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Next Payroll",
      value: "Jan 5",
      subtitle: "$12,083",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Hours This Week",
      value: "38.5h",
      subtitle: "1.5h remaining",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const recentActivity = [
    { id: 1, type: "Check-in", time: "09:02 AM", date: "Today", status: "On time" },
    { id: 2, type: "Check-out", time: "05:45 PM", date: "Yesterday", status: "Complete" },
    { id: 3, type: "Leave Approved", time: "10:30 AM", date: "Dec 20", status: "Success" },
  ];

  const upcomingHolidays = [
    { name: "New Year's Day", date: "Jan 1, 2025", days: "5 days away" },
    { name: "Martin Luther King Jr. Day", date: "Jan 20, 2025", days: "24 days away" },
  ];

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-muted-foreground">Here's your day at a glance</p>
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            Quick Action
          </Button>
        </div>

        {/* Check-in/out Card */}
        <Card className="p-6 bg-gradient-hero border-0 text-primary-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">Time to Check In!</h3>
              <p className="text-primary-foreground/80">Start your workday</p>
              <div className="text-4xl font-bold mt-4">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-background text-primary hover:bg-background/90 gap-2 shadow-lg">
                <LogIn className="w-5 h-5" />
                Check In
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                <LogOut className="w-5 h-5" />
                Check Out
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity & Holidays */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {activity.type === "Check-in" ? (
                      <LogIn className="w-4 h-4 text-primary" />
                    ) : activity.type === "Check-out" ? (
                      <LogOut className="w-4 h-4 text-primary" />
                    ) : (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-xs text-muted-foreground">{activity.date} at {activity.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Holidays */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="font-semibold text-lg mb-4">Upcoming Holidays</h3>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="text-sm font-medium mb-1">{holiday.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{holiday.date}</div>
                  <div className="text-xs font-medium text-primary">{holiday.days}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Apply Leave</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Clock className="w-5 h-5" />
              <span className="text-sm">View Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Payslips</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Documents</span>
            </Button>
          </div>
        </Card>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;