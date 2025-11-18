import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Globe, Clock, DollarSign, Users, Shield, Download } from "lucide-react";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your company and system preferences</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="workweek">Work Week</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <div className="card-gradient p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Company Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your company details and branding
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="PraxisHR" />
                  </div>
                  <div className="space-y-2">
                    <Label>Legal Name</Label>
                    <Input defaultValue="PraxisHR Inc." />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Company Description</Label>
                  <Textarea
                    defaultValue="Modern Human Resource Management platform designed for efficiency and employee satisfaction."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      <Globe className="w-4 h-4 inline mr-2" />
                      Timezone
                    </Label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">UTC</SelectItem>
                        <SelectItem value="utc+1">Central European (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Default Currency
                    </Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workweek" className="space-y-6">
            <div className="card-gradient p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Work Week Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure working days and hours
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Working Days</h3>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (day) => (
                      <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                        <Label className="cursor-pointer">{day}</Label>
                        <Switch defaultChecked={!["Saturday", "Sunday"].includes(day)} />
                      </div>
                    )
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Standard Start Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Standard End Time</Label>
                    <Input type="time" defaultValue="17:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Weekly Working Hours</Label>
                  <Input type="number" defaultValue="40" />
                  <p className="text-xs text-muted-foreground">
                    Standard hours per week for full-time employees
                  </p>
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="card-gradient p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Roles & Permissions</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage user roles and access permissions
                  </p>
                </div>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Administrator",
                    users: 2,
                    permissions: "Full system access",
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    name: "Manager",
                    users: 5,
                    permissions: "Team management, approvals",
                    color: "bg-success/10 text-success",
                  },
                  {
                    name: "Employee",
                    users: 45,
                    permissions: "Self-service access",
                    color: "bg-accent/10 text-accent",
                  },
                ].map((role) => (
                  <div key={role.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${role.color}`}>
                            {role.name}
                          </div>
                          <span className="text-sm text-muted-foreground">{role.users} users</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.permissions}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-gradient p-6">
              <h3 className="font-semibold mb-4">Audit Logs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track all administrative actions and changes
              </p>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Audit Logs
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="card-gradient p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Integrations</h2>
                  <p className="text-sm text-muted-foreground">
                    Connect with third-party services
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    name: "Slack",
                    description: "Team communication and notifications",
                    connected: false,
                  },
                  {
                    name: "Google Workspace",
                    description: "Email and calendar sync",
                    connected: true,
                  },
                  {
                    name: "Stripe",
                    description: "Payment processing",
                    connected: false,
                  },
                  {
                    name: "QuickBooks",
                    description: "Accounting integration",
                    connected: false,
                  },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                      <Switch checked={integration.connected} />
                    </div>
                    {integration.connected ? (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Configure
                      </Button>
                    ) : (
                      <Button size="sm" className="w-full mt-2">
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
