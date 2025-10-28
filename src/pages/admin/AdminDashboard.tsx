import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, Clock } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      change: "+12%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Active Today",
      value: "236",
      change: "95%",
      icon: UserCheck,
      trend: "up"
    },
    {
      title: "Pending Leaves",
      value: "8",
      change: "-3",
      icon: Calendar,
      trend: "down"
    },
    {
      title: "Payroll Cost YTD",
      value: "$4.2M",
      change: "+8%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const recentActivity = [
    { id: 1, type: "New Hire", name: "Sarah Chen", time: "2 hours ago", department: "Engineering" },
    { id: 2, type: "Leave Approved", name: "Michael Ross", time: "3 hours ago", department: "Sales" },
    { id: 3, type: "Payroll Complete", name: "December 2024", time: "1 day ago", department: "Finance" },
    { id: 4, type: "New Hire", name: "Emma Wilson", time: "2 days ago", department: "Design" },
  ];

  const upcomingHolidays = [
    { name: "New Year's Day", date: "Jan 1, 2025", days: "5 days" },
    { name: "Martin Luther King Jr. Day", date: "Jan 20, 2025", days: "24 days" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'bg-success-light text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Headcount Trend */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Headcount Trend</h3>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="h-48 bg-muted/30 rounded-lg flex items-end justify-around gap-2 p-4">
              {[180, 195, 210, 225, 240, 248].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-hero rounded-t opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${(value / 248) * 100}%` }}
                  />
                  <div className="text-xs text-muted-foreground">{value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Attendance Overview */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Attendance Today</h3>
                <p className="text-sm text-muted-foreground">Real-time status</p>
              </div>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Present</span>
                <span className="text-sm font-bold text-success">236</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: '95%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">On Leave</span>
                <span className="text-sm font-bold text-warning">8</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: '3%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Late</span>
                <span className="text-sm font-bold text-destructive">4</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive rounded-full" style={{ width: '2%' }} />
              </div>
            </div>
          </Card>
        </div>

        {/* Activity & Holidays */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card border-border/50">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.name}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
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
                  <div className="text-xs font-medium text-primary">in {holiday.days}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;