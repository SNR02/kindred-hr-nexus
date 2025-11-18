import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Briefcase, Upload, FileText } from "lucide-react";

const Profile = () => {
  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and documents</p>
        </div>

        <div className="card-gradient p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">SC</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>
            <div className="flex-1 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Full Name</span>
                </div>
                <p className="font-semibold text-lg">Sarah Chen</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Position</span>
                </div>
                <p className="font-semibold text-lg">Senior Engineer</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-semibold">sarah.chen@praxishr.com</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-semibold">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="card-gradient p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Chen" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="sarah.chen@praxishr.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea defaultValue="123 Main Street, San Francisco, CA 94105" rows={3} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" defaultValue="1990-05-15" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Input defaultValue="United States" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>

            <div className="card-gradient p-6">
              <h2 className="text-xl font-semibold mb-6">Emergency Contact</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Contact Name</Label>
                    <Input defaultValue="John Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input defaultValue="Spouse" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="john.chen@email.com" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <div className="card-gradient p-6">
              <h2 className="text-xl font-semibold mb-6">Employment Details</h2>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Employee ID</Label>
                    <p className="font-medium">EMP-2023-001</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Join Date</Label>
                    <p className="font-medium">January 15, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Department</Label>
                    <p className="font-medium">Engineering</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Position</Label>
                    <p className="font-medium">Senior Engineer</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Employment Type</Label>
                    <p className="font-medium">Full-time</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Work Location</Label>
                    <p className="font-medium">San Francisco Office</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Manager</Label>
                    <p className="font-medium">Michael Torres</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Base Salary</Label>
                    <p className="font-medium">$15,000/month</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="card-gradient p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Documents</h2>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Employment Contract", date: "2023-01-15", size: "245 KB" },
                  { name: "Tax Form W-2", date: "2024-01-31", size: "182 KB" },
                  { name: "Certification - AWS", date: "2024-06-20", size: "512 KB" },
                  { name: "ID Proof", date: "2023-01-10", size: "1.2 MB" },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} • Uploaded {new Date(doc.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
};

export default Profile;
