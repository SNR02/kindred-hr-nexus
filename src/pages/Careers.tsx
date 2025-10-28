import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const Careers = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build beautiful, performant user interfaces for our HR platform"
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "Shape the future of HR software with user-centered design"
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help customers succeed with PraxisHR and drive adoption"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Scale our infrastructure and improve developer experience"
    },
    {
      id: 5,
      title: "Technical Writer",
      department: "Product",
      location: "Remote",
      type: "Contract",
      description: "Create clear, helpful documentation for our platform"
    },
    {
      id: 6,
      title: "Sales Development Rep",
      department: "Sales",
      location: "London, UK",
      type: "Full-time",
      description: "Generate qualified leads and grow our customer base"
    }
  ];

  const benefits = [
    "Competitive salary & equity",
    "Health, dental & vision insurance",
    "Unlimited PTO",
    "Remote-first culture",
    "Learning & development budget",
    "Home office stipend",
    "Company retreats",
    "Parental leave"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero" />
            <span className="text-xl font-bold">PraxisHR</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6 animate-fade-up">
          <div className="inline-block">
            <Badge variant="outline" className="border-primary/50 text-primary">
              We're Hiring
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">
            Join Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of HR management. We're looking for talented, 
            passionate people to join our growing team.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-2">🚀 Move Fast</h3>
              <p className="text-sm text-muted-foreground">
                We ship quickly, iterate rapidly, and learn from our users
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-2">🤝 Collaborate</h3>
              <p className="text-sm text-muted-foreground">
                We win together as a team, supporting each other's growth
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50">
              <h3 className="text-lg font-semibold mb-2">💡 Innovate</h3>
              <p className="text-sm text-muted-foreground">
                We challenge the status quo and embrace new ideas
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Open Positions</h2>
            <p className="text-muted-foreground">Find your next opportunity</p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/50 group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Benefits & Perks</h2>
            <p className="text-muted-foreground">We take care of our team</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="p-4 text-center bg-gradient-card border-border/50 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-medium">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center space-y-6 bg-gradient-hero border-0">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Don't See a Perfect Fit?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll 
              keep you in mind for future opportunities.
            </p>
            <Button size="lg" className="bg-background text-primary hover:bg-background/90 shadow-lg">
              Send Resume
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            ← Back to home
          </Link>
          <p className="mt-4">© 2025 PraxisHR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;