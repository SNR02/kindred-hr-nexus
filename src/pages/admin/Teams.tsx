import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Users,
  Mail,
  Phone,
  Crown,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Teams = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    department: "",
    manager: "",
    description: "",
  });

  const teams = [
    {
      id: 1,
      name: "Engineering Team",
      department: "Engineering",
      manager: "David Kim",
      managerEmail: "david.kim@example.com",
      memberCount: 8,
      description: "Core product development and infrastructure",
    },
    {
      id: 2,
      name: "Sales Team",
      department: "Sales",
      manager: "Jennifer Lee",
      managerEmail: "jennifer.lee@example.com",
      memberCount: 6,
      description: "Customer acquisition and revenue growth",
    },
    {
      id: 3,
      name: "Design Team",
      department: "Design",
      manager: "Lisa Park",
      managerEmail: "lisa.park@example.com",
      memberCount: 5,
      description: "Product design and user experience",
    },
    {
      id: 4,
      name: "Marketing Team",
      department: "Marketing",
      manager: "Rachel Green",
      managerEmail: "rachel.green@example.com",
      memberCount: 4,
      description: "Brand and growth marketing",
    },
  ];

  const teamMembers: Record<number, any[]> = {
    1: [
      {
        id: 1,
        name: "David Kim",
        email: "david.kim@example.com",
        phone: "+1 (555) 111-2222",
        designation: "Engineering Manager",
        isManager: true,
        initials: "DK",
      },
      {
        id: 2,
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        phone: "+1 (555) 123-4567",
        designation: "Senior Software Engineer",
        isManager: false,
        initials: "SC",
      },
      {
        id: 3,
        name: "James Anderson",
        email: "james.anderson@example.com",
        phone: "+1 (555) 456-7890",
        designation: "DevOps Engineer",
        isManager: false,
        initials: "JA",
      },
      {
        id: 4,
        name: "Alex Turner",
        email: "alex.turner@example.com",
        phone: "+1 (555) 789-0123",
        designation: "Software Engineer",
        isManager: false,
        initials: "AT",
      },
    ],
    2: [
      {
        id: 5,
        name: "Jennifer Lee",
        email: "jennifer.lee@example.com",
        phone: "+1 (555) 222-3333",
        designation: "Sales Director",
        isManager: true,
        initials: "JL",
      },
      {
        id: 6,
        name: "Michael Ross",
        email: "michael.ross@example.com",
        phone: "+1 (555) 234-5678",
        designation: "Sales Manager",
        isManager: false,
        initials: "MR",
      },
    ],
    3: [
      {
        id: 7,
        name: "Lisa Park",
        email: "lisa.park@example.com",
        phone: "+1 (555) 333-4444",
        designation: "Design Lead",
        isManager: true,
        initials: "LP",
      },
      {
        id: 8,
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        phone: "+1 (555) 345-6789",
        designation: "Product Designer",
        isManager: false,
        initials: "EW",
      },
    ],
    4: [
      {
        id: 9,
        name: "Rachel Green",
        email: "rachel.green@example.com",
        phone: "+1 (555) 444-5555",
        designation: "Marketing Director",
        isManager: true,
        initials: "RG",
      },
      {
        id: 10,
        name: "David Thompson",
        email: "david.thompson@example.com",
        phone: "+1 (555) 678-9012",
        designation: "Marketing Coordinator",
        isManager: false,
        initials: "DT",
      },
    ],
  };

  const handleCreateTeam = () => {
    toast({
      title: "Team Created",
      description: `${newTeam.name} has been successfully created.`,
    });
    setCreateDialogOpen(false);
    setNewTeam({ name: "", department: "", manager: "", description: "" });
  };

  const selectedTeamData = teams.find((t) => t.id === selectedTeam);
  const members = selectedTeam ? teamMembers[selectedTeam] || [] : [];

  if (selectedTeam && selectedTeamData) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-fade-in">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedTeam(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{selectedTeamData.name}</h1>
              <p className="text-muted-foreground">{selectedTeamData.description}</p>
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{members.length}</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{selectedTeamData.manager}</div>
                  <div className="text-sm text-muted-foreground">Team Manager</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Badge className="text-xs">{selectedTeamData.department}</Badge>
                </div>
                <div>
                  <div className="text-lg font-semibold">Department</div>
                  <div className="text-sm text-muted-foreground">{selectedTeamData.department}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Team Members List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
            <div className="space-y-3">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className={`p-4 hover:shadow-md transition-shadow ${
                    member.isManager ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback
                        className={
                          member.isManager
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.isManager && (
                          <Badge variant="default" className="gap-1">
                            <Crown className="w-3 h-3" />
                            Manager
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.designation}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams</h1>
            <p className="text-muted-foreground">
              Manage your organization's teams and structure
            </p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={newTeam.name}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, name: e.target.value })
                    }
                    placeholder="e.g., Product Team"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={newTeam.department}
                    onValueChange={(value) =>
                      setNewTeam({ ...newTeam, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Team Manager *</Label>
                  <Select
                    value={newTeam.manager}
                    onValueChange={(value) =>
                      setNewTeam({ ...newTeam, manager: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="david-kim">David Kim</SelectItem>
                      <SelectItem value="jennifer-lee">Jennifer Lee</SelectItem>
                      <SelectItem value="lisa-park">Lisa Park</SelectItem>
                      <SelectItem value="admin">Admin User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTeam.description}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, description: e.target.value })
                    }
                    placeholder="Brief description of the team"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleCreateTeam}>
                    Create Team
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search teams..." className="pl-10" />
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold">{teams.length}</div>
            <div className="text-sm text-muted-foreground">Total Teams</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {teams.reduce((sum, t) => sum + t.memberCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {new Set(teams.map((t) => t.department)).size}
            </div>
            <div className="text-sm text-muted-foreground">Departments</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(
                teams.reduce((sum, t) => sum + t.memberCount, 0) / teams.length
              )}
            </div>
            <div className="text-sm text-muted-foreground">Avg Team Size</div>
          </Card>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedTeam(team.id)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary">{team.department}</Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {team.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {team.manager
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{team.manager}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{team.memberCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Teams;
