import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee profiles, org charts, and onboarding workflows"
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Streamlined leave requests, approvals, and balance tracking"
    },
    {
      icon: Clock,
      title: "Time & Attendance",
      description: "Smart check-in/out with real-time attendance monitoring"
    },
    {
      icon: DollarSign,
      title: "Payroll Processing",
      description: "Automated payroll runs with detailed breakdowns and payslips"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Reports",
      description: "Data-driven insights into workforce metrics and trends"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with WCAG AA accessibility"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "50+", label: "Countries" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero" />
            <span className="text-xl font-bold">PraxisHR</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
          </div>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Modern HR Management for Modern Teams
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Human Resources,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Beautifully Simple
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All-in-one HR platform that scales with your team. Manage employees, track attendance, 
              process payroll, and gain insights—all in one elegant interface.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">Watch Demo</Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <Card className="relative p-8 shadow-xl bg-gradient-card border-border/50">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Zap className="w-12 h-12 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Dashboard Preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Everything You Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to simplify HR management and empower your team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Built for the Modern Workplace
              </h2>
              <p className="text-muted-foreground">
                PraxisHR was founded on the belief that HR software should be powerful yet 
                intuitive, comprehensive yet simple. We've built a platform that scales from 
                startups to enterprises while maintaining the elegance and ease of use that 
                modern teams expect.
              </p>
              <div className="space-y-3">
                {[
                  "WCAG AA accessible for all users",
                  "Built with privacy and security first",
                  "Designed for global, distributed teams",
                  "Regular updates based on user feedback"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8 shadow-xl bg-gradient-card border-border/50">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Globe className="w-24 h-24 text-primary animate-pulse-glow" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center space-y-6 shadow-xl bg-gradient-hero border-0">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your HR?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of companies using PraxisHR to streamline operations and empower their teams
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-hero" />
                <span className="font-bold">PraxisHR</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern HR management for modern teams
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 PraxisHR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;