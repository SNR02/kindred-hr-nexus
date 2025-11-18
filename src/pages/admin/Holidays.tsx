import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Calendar as CalendarIcon, Trash2, Edit } from "lucide-react";

interface Holiday {
  id: string;
  title: string;
  date: string;
  description: string;
  recurring: boolean;
}

const Holidays = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newHoliday, setNewHoliday] = useState({
    title: "",
    description: "",
    recurring: false,
  });

  const holidays: Holiday[] = [
    {
      id: "1",
      title: "New Year's Day",
      date: "2025-01-01",
      description: "Beginning of the new year",
      recurring: true,
    },
    {
      id: "2",
      title: "Independence Day",
      date: "2025-07-04",
      description: "National Independence Day celebration",
      recurring: true,
    },
    {
      id: "3",
      title: "Thanksgiving",
      date: "2025-11-27",
      description: "Thanksgiving holiday",
      recurring: true,
    },
    {
      id: "4",
      title: "Christmas Day",
      date: "2025-12-25",
      description: "Christmas celebration",
      recurring: true,
    },
    {
      id: "5",
      title: "Company Anniversary",
      date: "2025-06-15",
      description: "Company founding anniversary",
      recurring: true,
    },
  ];

  const upcomingHolidays = holidays
    .filter((h) => new Date(h.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddHoliday = () => {
    console.log("Adding holiday:", newHoliday, selectedDate);
    setShowAddDialog(false);
    setNewHoliday({ title: "", description: "", recurring: false });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Holidays</h1>
            <p className="text-muted-foreground mt-1">Manage company holidays and observances</p>
          </div>
          <div className="flex gap-3">
            <div className="border rounded-lg p-1 flex gap-1">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                List
              </Button>
              <Button
                variant={view === "calendar" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                Calendar
              </Button>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Holiday
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Holidays</p>
                <p className="text-2xl font-bold">{holidays.length}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingHolidays.length}</p>
              </div>
            </div>
          </div>
          <div className="card-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recurring</p>
                <p className="text-2xl font-bold">
                  {holidays.filter((h) => h.recurring).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <div className="card-gradient p-6">
            <div className="space-y-4">
              {upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-hero flex flex-col items-center justify-center text-primary-foreground">
                      <div className="text-xs font-medium">
                        {new Date(holiday.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-2xl font-bold">
                        {new Date(holiday.date).getDate()}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{holiday.title}</h3>
                        {holiday.recurring && (
                          <Badge variant="outline" className="text-xs">
                            Recurring
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{holiday.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(holiday.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-gradient p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
            />
          </div>
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Holiday</DialogTitle>
            <DialogDescription>Create a new company holiday or observance</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Holiday Title</Label>
              <Input
                value={newHoliday.title}
                onChange={(e) => setNewHoliday({ ...newHoliday, title: e.target.value })}
                placeholder="e.g., New Year's Day"
                className="mt-2"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-2"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newHoliday.description}
                onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                placeholder="Brief description of the holiday..."
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Recurring Annually</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Holiday repeats every year on this date
                </p>
              </div>
              <Switch
                checked={newHoliday.recurring}
                onCheckedChange={(checked) =>
                  setNewHoliday({ ...newHoliday, recurring: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddHoliday}>Add Holiday</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Holidays;
