import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, MapPin, Briefcase, Users, Calendar, Eye, Edit, Trash2, Download, Mail, Phone, FileText } from "lucide-react";
import { toast } from "sonner";

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedAt: string;
  status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired";
  resume: string;
  coverLetter: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "remote" | "contract";
  status: "open" | "closed" | "draft";
  description: string;
  requirements: string;
  responsibilities: string;
  salary: string;
  postedAt: string;
  applicants: Applicant[];
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Sample data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "full-time",
      status: "open",
      description: "We are looking for an experienced Frontend Developer to join our growing team.",
      requirements: "5+ years of experience with React, TypeScript, and modern web technologies. Strong understanding of UI/UX principles.",
      responsibilities: "Develop and maintain complex web applications, collaborate with designers and backend developers, mentor junior developers.",
      salary: "$120,000 - $150,000",
      postedAt: "2024-01-15",
      applicants: [
        {
          id: "1",
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 234 567 8901",
          appliedAt: "2024-01-20",
          status: "shortlisted",
          resume: "sarah_johnson_resume.pdf",
          coverLetter: "I am excited to apply for the Senior Frontend Developer position..."
        },
        {
          id: "2",
          name: "Michael Chen",
          email: "m.chen@email.com",
          phone: "+1 234 567 8902",
          appliedAt: "2024-01-18",
          status: "reviewing",
          resume: "michael_chen_resume.pdf",
          coverLetter: "With over 6 years of experience in frontend development..."
        },
        {
          id: "3",
          name: "Emily Davis",
          email: "emily.davis@email.com",
          phone: "+1 234 567 8903",
          appliedAt: "2024-01-16",
          status: "new",
          resume: "emily_davis_resume.pdf",
          coverLetter: "I am passionate about creating beautiful user experiences..."
        }
      ]
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "full-time",
      status: "open",
      description: "Join our product team to drive innovation and deliver exceptional user experiences.",
      requirements: "3+ years of product management experience, strong analytical skills, excellent communication.",
      responsibilities: "Define product roadmap, work with cross-functional teams, analyze user feedback and data.",
      salary: "$130,000 - $160,000",
      postedAt: "2024-01-10",
      applicants: [
        {
          id: "4",
          name: "James Wilson",
          email: "j.wilson@email.com",
          phone: "+1 234 567 8904",
          appliedAt: "2024-01-22",
          status: "new",
          resume: "james_wilson_resume.pdf",
          coverLetter: "I have a proven track record of launching successful products..."
        },
        {
          id: "5",
          name: "Lisa Anderson",
          email: "l.anderson@email.com",
          phone: "+1 234 567 8905",
          appliedAt: "2024-01-19",
          status: "shortlisted",
          resume: "lisa_anderson_resume.pdf",
          coverLetter: "My experience in SaaS products aligns perfectly with this role..."
        }
      ]
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "full-time",
      status: "open",
      description: "Create delightful user experiences for our products.",
      requirements: "4+ years of UX design experience, proficiency in Figma, strong portfolio.",
      responsibilities: "Conduct user research, create wireframes and prototypes, collaborate with developers.",
      salary: "$110,000 - $140,000",
      postedAt: "2024-01-12",
      applicants: [
        {
          id: "6",
          name: "Alex Martinez",
          email: "alex.m@email.com",
          phone: "+1 234 567 8906",
          appliedAt: "2024-01-21",
          status: "reviewing",
          resume: "alex_martinez_resume.pdf",
          coverLetter: "I am passionate about creating intuitive and accessible designs..."
        }
      ]
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "full-time",
      status: "open",
      description: "Build and maintain our infrastructure and deployment pipelines.",
      requirements: "Experience with AWS, Docker, Kubernetes, CI/CD pipelines.",
      responsibilities: "Manage cloud infrastructure, automate deployment processes, ensure system reliability.",
      salary: "$125,000 - $155,000",
      postedAt: "2024-01-08",
      applicants: []
    },
    {
      id: "5",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Austin, TX",
      type: "part-time",
      status: "draft",
      description: "Help us grow our brand and reach new customers.",
      requirements: "2+ years of digital marketing experience, SEO knowledge, content creation skills.",
      responsibilities: "Create marketing campaigns, manage social media, analyze metrics.",
      salary: "$60,000 - $80,000",
      postedAt: "2024-01-25",
      applicants: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "default";
      case "closed": return "secondary";
      case "draft": return "outline";
      default: return "default";
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "reviewing": return "secondary";
      case "shortlisted": return "success";
      case "rejected": return "destructive";
      case "hired": return "success";
      default: return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "remote": return "🌐";
      case "full-time": return "⏰";
      case "part-time": return "⏱️";
      case "contract": return "📄";
      default: return "💼";
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = () => {
    toast.success("Job posting created successfully!");
    setIsAddJobOpen(false);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
    toast.success("Job posting deleted");
  };

  const handleUpdateApplicantStatus = (jobId: string, applicantId: string, newStatus: Applicant["status"]) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applicants: job.applicants.map(applicant => 
            applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
          )
        };
      }
      return job;
    }));
    toast.success(`Applicant status updated to ${newStatus}`);
  };

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
  const openPositions = jobs.filter(j => j.status === "open").length;
  const newApplicants = jobs.reduce((sum, job) => 
    sum + job.applicants.filter(a => a.status === "new").length, 0
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Openings</h1>
            <p className="text-muted-foreground mt-1">Manage job postings and review applications</p>
          </div>
          <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post New Job</DialogTitle>
                <DialogDescription>Create a new job posting for your organization</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Frontend Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Remote, New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g. $120,000 - $150,000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" placeholder="Brief overview of the role..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea id="requirements" placeholder="List key requirements..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Textarea id="responsibilities" placeholder="List main responsibilities..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddJobOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddJob}>Create Job Posting</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Jobs</CardDescription>
              <CardTitle className="text-3xl">{jobs.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Open Positions</CardDescription>
              <CardTitle className="text-3xl text-primary">{openPositions}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Applicants</CardDescription>
              <CardTitle className="text-3xl">{totalApplicants}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>New Applications</CardDescription>
              <CardTitle className="text-3xl text-emerald-600">{newApplicants}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge variant={getStatusColor(job.status) as any}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        {getTypeIcon(job.type)} {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {job.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {job.applicants.length} {job.applicants.length === 1 ? 'Applicant' : 'Applicants'}
                      </span>
                      {job.applicants.filter(a => a.status === 'new').length > 0 && (
                        <Badge variant="default" className="ml-2">
                          {job.applicants.filter(a => a.status === 'new').length} New
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJob(job)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                              <DialogDescription className="mt-2 flex items-center gap-4 text-base">
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" />
                                  {job.department}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </span>
                                <Badge variant={getStatusColor(job.status) as any}>
                                  {job.status}
                                </Badge>
                              </DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>

                        <Tabs defaultValue="details" className="mt-6">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Job Details</TabsTrigger>
                            <TabsTrigger value="applicants">
                              Applicants ({job.applicants.length})
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="space-y-6 mt-6">
                            <div>
                              <h4 className="font-semibold mb-2">Salary Range</h4>
                              <p className="text-muted-foreground">{job.salary}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Requirements</h4>
                              <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Responsibilities</h4>
                              <p className="text-muted-foreground whitespace-pre-line">{job.responsibilities}</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                              <Button variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Job
                              </Button>
                              <Button variant="outline" onClick={() => handleDeleteJob(job.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Job
                              </Button>
                            </div>
                          </TabsContent>

                          <TabsContent value="applicants" className="mt-6">
                            {job.applicants.length === 0 ? (
                              <div className="text-center py-12">
                                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h4 className="font-semibold mb-2">No applicants yet</h4>
                                <p className="text-sm text-muted-foreground">
                                  Applications will appear here once candidates apply
                                </p>
                              </div>
                            ) : (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Applied</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {job.applicants.map((applicant) => (
                                    <TableRow key={applicant.id}>
                                      <TableCell>
                                        <div className="flex items-center gap-3">
                                          <Avatar>
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                              {applicant.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <div className="font-medium">{applicant.name}</div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                              <FileText className="w-3 h-3" />
                                              {applicant.resume}
                                            </div>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="space-y-1 text-sm">
                                          <div className="flex items-center gap-1 text-muted-foreground">
                                            <Mail className="w-3 h-3" />
                                            {applicant.email}
                                          </div>
                                          <div className="flex items-center gap-1 text-muted-foreground">
                                            <Phone className="w-3 h-3" />
                                            {applicant.phone}
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-sm text-muted-foreground">
                                        {new Date(applicant.appliedAt).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell>
                                        <Select
                                          value={applicant.status}
                                          onValueChange={(value) => handleUpdateApplicantStatus(job.id, applicant.id, value as Applicant["status"])}
                                        >
                                          <SelectTrigger className="w-32">
                                            <SelectValue>
                                              <Badge variant={getApplicantStatusColor(applicant.status) as any} className="text-xs">
                                                {applicant.status}
                                              </Badge>
                                            </SelectValue>
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="reviewing">Reviewing</SelectItem>
                                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="hired">Hired</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          <Dialog>
                                            <DialogTrigger asChild>
                                              <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                              <DialogHeader>
                                                <DialogTitle>Applicant Details</DialogTitle>
                                                <DialogDescription>{applicant.name}</DialogDescription>
                                              </DialogHeader>
                                              <div className="space-y-4 py-4">
                                                <div className="flex items-center gap-4">
                                                  <Avatar className="w-16 h-16">
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                                      {applicant.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                  <div>
                                                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{applicant.email}</p>
                                                    <p className="text-sm text-muted-foreground">{applicant.phone}</p>
                                                  </div>
                                                </div>

                                                <div>
                                                  <Label>Status</Label>
                                                  <Badge variant={getApplicantStatusColor(applicant.status) as any} className="mt-2">
                                                    {applicant.status}
                                                  </Badge>
                                                </div>

                                                <div>
                                                  <Label>Applied Date</Label>
                                                  <p className="text-sm text-muted-foreground mt-1">
                                                    {new Date(applicant.appliedAt).toLocaleDateString('en-US', { 
                                                      year: 'numeric', 
                                                      month: 'long', 
                                                      day: 'numeric' 
                                                    })}
                                                  </p>
                                                </div>

                                                <div>
                                                  <Label>Resume</Label>
                                                  <Button variant="outline" size="sm" className="mt-2">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    {applicant.resume}
                                                  </Button>
                                                </div>

                                                <div>
                                                  <Label>Cover Letter</Label>
                                                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                                                    {applicant.coverLetter}
                                                  </p>
                                                </div>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                          <Button variant="ghost" size="sm">
                                            <Download className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No jobs found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search" : "Get started by posting your first job"}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsAddJobOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Jobs;