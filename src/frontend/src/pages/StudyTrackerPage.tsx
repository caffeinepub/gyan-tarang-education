import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Flame,
  Plus,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface StudySession {
  id: string;
  date: string;
  subject: string;
  hours: number;
  notes: string;
}

interface DailyGoal {
  hours: number;
}

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Civics",
  "BTech CSE",
  "BTech ECE",
  "BTech ME",
  "BTech CE",
  "BTech EE",
  "JEE Prep",
  "NEET Prep",
  "UPSC Prep",
  "SSC Prep",
  "Banking Prep",
  "General Knowledge",
  "Other",
];

const subjectColors: Record<string, string> = {
  Mathematics: "oklch(0.72 0.18 55)",
  Physics: "oklch(0.45 0.18 220)",
  Chemistry: "oklch(0.56 0.18 145)",
  Biology: "oklch(0.50 0.18 150)",
  English: "oklch(0.55 0.15 30)",
  Hindi: "oklch(0.65 0.16 50)",
  "Computer Science": "oklch(0.45 0.18 270)",
  "JEE Prep": "oklch(0.72 0.18 55)",
  "NEET Prep": "oklch(0.56 0.18 145)",
  "UPSC Prep": "oklch(0.22 0.12 260)",
};

const getSubjectColor = (sub: string) =>
  subjectColors[sub] ?? "oklch(0.55 0.12 260)";

const STORAGE_KEY = "gt-study-sessions";
const GOAL_KEY = "gt-daily-goal";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function getDayLabel(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-IN", { weekday: "short" });
}

export default function StudyTrackerPage() {
  const { t } = useAppContext();

  const [sessions, setSessions] = useState<StudySession[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(() => {
    try {
      return JSON.parse(localStorage.getItem(GOAL_KEY) || '{"hours":6}');
    } catch {
      return { hours: 6 };
    }
  });

  const [subject, setSubject] = useState("Mathematics");
  const [hours, setHours] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(GOAL_KEY, JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  const addSession = () => {
    if (!subject || hours <= 0) {
      toast.error("Subject aur hours required hai");
      return;
    }
    const session: StudySession = {
      id: Date.now().toString(),
      date: getTodayDate(),
      subject,
      hours,
      notes,
    };
    setSessions((prev) => [session, ...prev]);
    setNotes("");
    toast.success(`${hours}h ${subject} session logged! 📚`);
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session deleted");
  };

  const todaySessions = sessions.filter((s) => s.date === getTodayDate());
  const todayHours = todaySessions.reduce((sum, s) => sum + s.hours, 0);
  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);

  // Streak calculation
  const streak = (() => {
    let count = 0;
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const has = sessions.some((s) => s.date === dateStr);
      if (has) count++;
      else if (i > 0) break;
    }
    return count;
  })();

  // Subject breakdown
  const subjectBreakdown = subjects.reduce(
    (acc, sub) => {
      const total = sessions
        .filter((s) => s.subject === sub)
        .reduce((sum, s) => sum + s.hours, 0);
      if (total > 0) acc[sub] = total;
      return acc;
    },
    {} as Record<string, number>,
  );

  const maxSubjectHours = Math.max(...Object.values(subjectBreakdown), 1);

  // Weekly chart data
  const last7 = getLast7Days();
  const weeklyData = last7.map((date) => ({
    date,
    label: getDayLabel(date),
    hours: sessions
      .filter((s) => s.date === date)
      .reduce((sum, s) => sum + s.hours, 0),
  }));
  const maxWeeklyHours = Math.max(...weeklyData.map((d) => d.hours), 1);

  const progressPct = Math.min((todayHours / dailyGoal.hours) * 100, 100);

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("Study Tracker", "Study Tracker")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "अपनी पढ़ाई track करें, streak बनाएं, goals achieve करें",
                "Track your study, build streak, achieve goals",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            {
              icon: Flame,
              label: t("Study Streak", "Study Streak"),
              value: `${streak} ${t("दिन", "days")}`,
              color: "oklch(0.72 0.18 55)",
              bg: "oklch(0.72 0.18 55 / 0.1)",
            },
            {
              icon: Clock,
              label: t("आज की पढ़ाई", "Today's Study"),
              value: `${todayHours.toFixed(1)}h`,
              color: "oklch(0.22 0.12 260)",
              bg: "oklch(0.22 0.12 260 / 0.1)",
            },
            {
              icon: TrendingUp,
              label: t("Total Hours", "Total Hours"),
              value: `${totalHours.toFixed(1)}h`,
              color: "oklch(0.56 0.18 145)",
              bg: "oklch(0.56 0.18 145 / 0.1)",
            },
            {
              icon: Target,
              label: t("आज का Goal", "Today's Goal"),
              value: `${dailyGoal.hours}h`,
              color: "oklch(0.55 0.18 200)",
              bg: "oklch(0.55 0.18 200 / 0.1)",
            },
          ].map((stat, _idx) => (
            <Card key={stat.label} className="border border-border/50">
              <CardContent className="p-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: stat.bg }}
                >
                  <stat.icon
                    className="h-5 w-5"
                    style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="font-display text-2xl font-black mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Today's Progress */}
        <Card className="mb-8 border border-border/50 overflow-hidden">
          <div className="h-1" style={{ background: "oklch(0.72 0.18 55)" }} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-foreground">
                🎯 {t("आज का Progress", "Today's Progress")}
              </h3>
              <span className="text-sm font-semibold text-muted-foreground">
                {todayHours.toFixed(1)} / {dailyGoal.hours}h
              </span>
            </div>
            <Progress value={progressPct} className="h-3 mb-2" />
            <p className="text-xs text-muted-foreground">
              {progressPct >= 100
                ? "🎉 Goal complete! Kal bhi karo!"
                : `${(dailyGoal.hours - todayHours).toFixed(1)}h aur baaki hai`}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Log Session */}
          <div className="lg:col-span-1">
            <Card className="border border-border/50 sticky top-20">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Plus
                    className="h-4 w-4"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  />
                  {t("Session Log करें", "Log a Session")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-1 block">
                    {t("Subject", "Subject")}
                  </Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger data-ocid="tracker.subject.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-1 block">
                    {t("Hours", "Hours")}: {hours}h
                  </Label>
                  <Slider
                    min={0.5}
                    max={12}
                    step={0.5}
                    value={[hours]}
                    onValueChange={([v]) => setHours(v)}
                    className="mt-2"
                    data-ocid="tracker.hours.input"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.5h</span>
                    <span>12h</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-1 block">
                    {t("Notes (optional)", "Notes (optional)")}
                  </Label>
                  <Textarea
                    placeholder={t(
                      "Aaj kya padha? Topics, doubts...",
                      "What did you study? Topics, doubts...",
                    )}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-20 text-sm"
                    data-ocid="tracker.notes.textarea"
                  />
                </div>

                <Button
                  className="w-full gap-2 font-bold"
                  style={{
                    background: "oklch(0.72 0.18 55)",
                    color: "white",
                  }}
                  onClick={addSession}
                  data-ocid="tracker.log.primary_button"
                >
                  <Plus className="h-4 w-4" />
                  {t("Session Add Karein", "Add Session")}
                </Button>

                {/* Goal Setting */}
                <div className="pt-3 border-t border-border/50">
                  <Label className="text-sm font-semibold mb-2 block">
                    🎯 {t("Daily Goal:", "Daily Goal:")} {dailyGoal.hours}h
                  </Label>
                  <Slider
                    min={1}
                    max={16}
                    step={1}
                    value={[dailyGoal.hours]}
                    onValueChange={([v]) => setDailyGoal({ hours: v })}
                    data-ocid="tracker.goal.input"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1h</span>
                    <span>16h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts & Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Chart */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Calendar
                    className="h-4 w-4"
                    style={{ color: "oklch(0.22 0.12 260)" }}
                  />
                  {t("इस हफ्ते की पढ़ाई", "This Week's Study")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-32">
                  {weeklyData.map((day) => (
                    <div
                      key={day.date}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-xs font-semibold text-foreground/80">
                        {day.hours > 0 ? `${day.hours}h` : ""}
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{
                          height: `${Math.max((day.hours / maxWeeklyHours) * 96, day.hours > 0 ? 8 : 2)}px`,
                          background:
                            day.date === getTodayDate()
                              ? "oklch(0.72 0.18 55)"
                              : day.hours > 0
                                ? "oklch(0.22 0.12 260 / 0.7)"
                                : "oklch(0.90 0.01 80)",
                        }}
                      />
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {day.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "oklch(0.72 0.18 55)" }}
                    />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "oklch(0.22 0.12 260 / 0.7)" }}
                    />
                    <span>Past days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Breakdown */}
            {Object.keys(subjectBreakdown).length > 0 && (
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <BookOpen
                      className="h-4 w-4"
                      style={{ color: "oklch(0.56 0.18 145)" }}
                    />
                    {t("Subject Breakdown", "Subject Breakdown")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(subjectBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 8)
                    .map(([sub, hrs]) => (
                      <div key={sub}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-foreground">
                            {sub}
                          </span>
                          <span className="text-muted-foreground font-semibold">
                            {hrs.toFixed(1)}h
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(hrs / maxSubjectHours) * 100}%`,
                              background: getSubjectColor(sub),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Sessions */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-base flex items-center gap-2">
                  <Clock
                    className="h-4 w-4"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  />
                  {t("Recent Sessions", "Recent Sessions")}
                  <Badge className="ml-auto bg-saffron/10 text-saffron border-saffron/20">
                    {sessions.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <div
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="tracker.sessions.empty_state"
                  >
                    <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">
                      {t(
                        "Koi session nahi yet. Pehla session add karein!",
                        "No sessions yet. Add your first session!",
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sessions.slice(0, 10).map((session, idx) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card"
                        data-ocid={`tracker.session.item.${idx + 1}`}
                      >
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            background: getSubjectColor(session.subject),
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">
                              {session.subject}
                            </span>
                            <Badge
                              className="text-[10px]"
                              style={{
                                background: `${getSubjectColor(session.subject)}15`,
                                color: getSubjectColor(session.subject),
                                borderColor: `${getSubjectColor(session.subject)}30`,
                              }}
                            >
                              {session.hours}h
                            </Badge>
                          </div>
                          {session.notes && (
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {session.notes}
                            </p>
                          )}
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {session.date}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                          onClick={() => deleteSession(session.id)}
                          data-ocid={`tracker.session.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
