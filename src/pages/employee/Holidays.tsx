import { useState } from "react";
import EmployeeLayout from "@/components/EmployeeLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

interface Holiday {
  id: string;
  title: string;
  date: string;
  description: string;
  recurring: boolean;
}

const Holidays = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Holidays</h1>
            <p className="text-muted-foreground mt-1">View upcoming company holidays and observances</p>
          </div>
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
                <p className="text-sm text-muted-foreground">Next Holiday</p>
                <p className="text-lg font-bold truncate">
                  {upcomingHolidays[0]?.title || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <div className="card-gradient p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Holidays</h2>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-gradient-hero flex flex-col items-center justify-center text-primary-foreground flex-shrink-0">
                    <div className="text-xs font-medium">
                      {new Date(holiday.date).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-2xl font-bold">
                      {new Date(holiday.date).getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
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
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Holidays in Selected Month</h3>
              <div className="space-y-2">
                {upcomingHolidays
                  .filter(
                    (h) =>
                      selectedDate &&
                      new Date(h.date).getMonth() === selectedDate.getMonth() &&
                      new Date(h.date).getFullYear() === selectedDate.getFullYear()
                  )
                  .map((holiday) => (
                    <div key={holiday.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="font-medium">{holiday.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(holiday.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
};

export default Holidays;
