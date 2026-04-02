import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  Sparkles,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface StudyPlanInput {
  name: string;
  classOrBranch: string;
  dailyHours: string;
  goal: string;
  weakSubjects: string;
}

interface WeekPlan {
  week: number;
  theme: string;
  days: { day: string; morning: string; afternoon: string; evening: string }[];
}

function generatePlan(input: StudyPlanInput): WeekPlan[] {
  const hours = Number(input.dailyHours) || 4;
  const isCompetitive =
    input.goal.toLowerCase().includes("jee") ||
    input.goal.toLowerCase().includes("neet") ||
    input.goal.toLowerCase().includes("upsc") ||
    input.goal.toLowerCase().includes("ssc");
  const isBtech =
    input.classOrBranch.toLowerCase().includes("btech") ||
    input.classOrBranch.toLowerCase().includes("cse") ||
    input.classOrBranch.toLowerCase().includes("engineering");

  const weakList = input.weakSubjects
    ? input.weakSubjects.split(",").map((s) => s.trim())
    : ["Mathematics", "Science"];

  const subjects = isCompetitive
    ? ["Physics", "Chemistry", "Mathematics", "GK/Current Affairs"]
    : isBtech
      ? ["Data Structures", "Algorithms", "Mathematics", "Core Subject"]
      : ["Mathematics", "Science", "English", "Social Studies"];

  const plans: WeekPlan[] = [
    {
      week: 1,
      theme: "Foundation Building - Weak Areas Focus",
      days: [
        {
          day: "Monday",
          morning: `${weakList[0] || subjects[0]} - Basics & Concepts (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[1]} - Chapter 1-3 Revision (${Math.ceil(hours * 0.3)}h)`,
          evening: `Practice Questions + Revision Notes (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Tuesday",
          morning: `${subjects[2]} - Grammar & Comprehension (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${weakList[0] || subjects[0]} - Problem Sets (${Math.ceil(hours * 0.3)}h)`,
          evening: `Mock Quiz + Self Assessment (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Wednesday",
          morning: `${subjects[0]} - Advanced Topics (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[3]} - Chapter Reading (${Math.ceil(hours * 0.3)}h)`,
          evening: `Formula Revision + Flashcards (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Thursday",
          morning: `${weakList[1] || subjects[1]} - Deep Dive (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[2]} - Writing Practice (${Math.ceil(hours * 0.3)}h)`,
          evening: `Previous Year Questions (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Friday",
          morning: `${subjects[0]} + ${subjects[1]} Combined (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `Gyan Mitra AI Doubt Session (${Math.ceil(hours * 0.2)}h)`,
          evening: `Weekly Revision Summary (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Saturday",
          morning: `Full Subject Revision (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `NCERT/Official Textbook Reading (${Math.ceil(hours * 0.3)}h)`,
          evening: `Rest & Light Study (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Sunday",
          morning: "Weekly Mock Test (2h)",
          afternoon: `Error Analysis & Correction (${Math.ceil(hours * 0.3)}h)`,
          evening: "Next Week Planning + Wellness (30min)",
        },
      ],
    },
    {
      week: 2,
      theme: "Concept Deepening - Official NCERT Sources",
      days: [
        {
          day: "Monday",
          morning: `${subjects[0]} - Formulas & Theorems Deep Study (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[1]} - Lab Experiments / Theory (${Math.ceil(hours * 0.3)}h)`,
          evening: `AI Quiz Generator Practice (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Tuesday",
          morning: `${subjects[2]} - Vocabulary & Reading (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[0]} - Problem Solving (${Math.ceil(hours * 0.3)}h)`,
          evening: `Study Group Discussion (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Wednesday",
          morning: `${subjects[3]} - Complete Chapter (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[1]} - Important Diagrams (${Math.ceil(hours * 0.3)}h)`,
          evening: `Video Lecture (NPTEL/DIKSHA) (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Thursday",
          morning: `${weakList[0] || subjects[0]} - Extra Practice (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[2]} - Essay Writing (${Math.ceil(hours * 0.3)}h)`,
          evening: `Revision Notes Creation (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Friday",
          morning: `Cross-subject Integration (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `Previous Year Questions (${Math.ceil(hours * 0.3)}h)`,
          evening: `Doubt Clearing - Gyan Mitra (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Saturday",
          morning: `Full Length Practice Test (${Math.ceil(hours * 0.6)}h)`,
          afternoon: `Analysis + Weak Area ID (${Math.ceil(hours * 0.3)}h)`,
          evening: `Relaxation + Light Reading (${Math.floor(hours * 0.1)}h)`,
        },
        {
          day: "Sunday",
          morning: `Topic-wise Mock (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `NDL Digital Library Research (${Math.ceil(hours * 0.3)}h)`,
          evening: "Week 3 Preparation Planning (30min)",
        },
      ],
    },
    {
      week: 3,
      theme: "Speed & Accuracy - Mock Test Practice",
      days: [
        {
          day: "Monday",
          morning: `High-Speed ${subjects[0]} Problems (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `${subjects[1]} MCQ Practice (${Math.ceil(hours * 0.3)}h)`,
          evening: `Timer-Based Quiz (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Tuesday",
          morning: `${subjects[2]} Timed Writing (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `${subjects[0]} Accuracy Drills (${Math.ceil(hours * 0.3)}h)`,
          evening: `AI Performance Review (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Wednesday",
          morning: `Mixed Subject Sprint (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `${subjects[3]} Rapid Revision (${Math.ceil(hours * 0.3)}h)`,
          evening: `Flashcard Speed Review (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Thursday",
          morning: `Full Mock Test - ${input.goal} Pattern (3h)`,
          afternoon: `Answer Sheet Analysis (${Math.ceil(hours * 0.3)}h)`,
          evening: `Correction + Note Making (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Friday",
          morning: `${weakList[0] || subjects[0]} Speed Practice (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `Shortcut Techniques (${Math.ceil(hours * 0.3)}h)`,
          evening: `Peer Discussion / Study Group (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Saturday",
          morning: `Full Syllabus Rapid Revision (${Math.ceil(hours * 0.6)}h)`,
          afternoon: `Important Formulas Sheet (${Math.ceil(hours * 0.2)}h)`,
          evening: "Wellness Walk + Rest (1h)",
        },
        {
          day: "Sunday",
          morning: "Second Full Mock Test (3h)",
          afternoon: `Comparative Analysis (${Math.ceil(hours * 0.3)}h)`,
          evening: "Week 4 Final Sprint Prep (30min)",
        },
      ],
    },
    {
      week: 4,
      theme: "Final Revision - Exam Ready Mode",
      days: [
        {
          day: "Monday",
          morning: `Complete Syllabus Overview (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `${subjects[0]} Most Important Topics (${Math.ceil(hours * 0.3)}h)`,
          evening: `Formula & Concept Cards (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Tuesday",
          morning: `${subjects[1]} + ${subjects[2]} Combined Revision (${Math.ceil(hours * 0.5)}h)`,
          afternoon: `PYQ - ${input.goal} Pattern (${Math.ceil(hours * 0.3)}h)`,
          evening: `Weak Area Final Touch (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Wednesday",
          morning: `All Subjects Brief Revision (${Math.ceil(hours * 0.6)}h)`,
          afternoon: `Previous Year Important Q's (${Math.ceil(hours * 0.2)}h)`,
          evening: `Light Study + Mental Prep (${Math.floor(hours * 0.2)}h)`,
        },
        {
          day: "Thursday",
          morning: "Final Mock Test - Full Syllabus (3h)",
          afternoon: `Last-minute Topic Coverage (${Math.ceil(hours * 0.3)}h)`,
          evening: "Confidence Building + Motivation (30min)",
        },
        {
          day: "Friday",
          morning: `Most Common Question Types (${Math.ceil(hours * 0.4)}h)`,
          afternoon: `Quick Formula Sheet Review (${Math.ceil(hours * 0.3)}h)`,
          evening: `Relax + Light Revision (${Math.floor(hours * 0.3)}h)`,
        },
        {
          day: "Saturday",
          morning: `Personal Notes Final Reading (${Math.ceil(hours * 0.5)}h)`,
          afternoon: "Exam Day Logistics Prep (1h)",
          evening: "Rest & Good Sleep",
        },
        {
          day: "Sunday",
          morning: "Exam Day - You Are Ready! ⭐",
          afternoon: "Trust Your Preparation",
          evening: "Gyan Tarang is Proud of You!",
        },
      ],
    },
  ];

  return plans;
}

export default function AIStudyPlannerPage() {
  const { t, addXP, earnBadge } = useAppContext();
  const { actor } = useActor();
  const [form, setForm] = useState<StudyPlanInput>({
    name: "",
    classOrBranch: "",
    dailyHours: "4",
    goal: "",
    weakSubjects: "",
  });
  const [plan, setPlan] = useState<WeekPlan[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    if (!form.name || !form.classOrBranch || !form.goal) {
      toast.error("Please fill all required fields");
      return;
    }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    const generated = generatePlan(form);
    setPlan(generated);
    setGenerating(false);
    addXP(50);
    earnBadge("AI Explorer");
    toast.success("⭐ Study Plan Generated! +50 XP earned");
  };

  const handleSave = async () => {
    if (!actor || !plan) return;
    setSaving(true);
    try {
      const planText = JSON.stringify({ input: form, weeks: plan });
      await actor.saveStudyPlan(planText);
      toast.success("Study Plan saved successfully!");
      addXP(20);
    } catch {
      toast.error("Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic page-enter">
      {/* Hero */}
      <div
        className="relative overflow-hidden py-16 px-4"
        style={{ background: "oklch(0.97 0.02 290)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.85 0.20 195 / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.85 0.25 145 / 0.06) 0%, transparent 40%)",
          }}
        />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "oklch(0.50 0.22 290 / 0.12)",
                border: "1px solid oklch(0.50 0.22 290 / 0.25)",
              }}
            >
              <Brain
                className="h-4 w-4"
                style={{ color: "oklch(0.50 0.22 290)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.50 0.22 290)" }}
              >
                AI-Powered Planning
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              AI Study Planner
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.05 220)" }}
            >
              {t(
                "4-week personalized study plan instantly generate karein. Apne goals ke hisaab se tailored schedule.",
                "Generate a personalized 4-week study plan instantly tailored to your goals and schedule.",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-cyan">
                  <Target className="h-5 w-5" />
                  {t("Apni Details Bharein", "Enter Your Details")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label style={{ color: "oklch(0.25 0.03 260)" }}>
                    Name *
                  </Label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-ocid="study_planner.name.input"
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "oklch(0.25 0.03 260)" }}>
                    Class / Branch *
                  </Label>
                  <Select
                    value={form.classOrBranch}
                    onValueChange={(v) =>
                      setForm({ ...form, classOrBranch: v })
                    }
                  >
                    <SelectTrigger
                      style={{
                        background: "oklch(0.97 0.01 260)",
                        borderColor: "oklch(0.88 0.02 270)",
                        color: "white",
                      }}
                      data-ocid="study_planner.class.select"
                    >
                      <SelectValue placeholder="Select Class or Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Class 6",
                        "Class 7",
                        "Class 8",
                        "Class 9",
                        "Class 10",
                        "Class 11 (Science)",
                        "Class 11 (Commerce)",
                        "Class 11 (Arts)",
                        "Class 12 (Science)",
                        "Class 12 (Commerce)",
                        "BTech CSE",
                        "BTech ECE",
                        "BTech ME",
                        "BTech CE",
                        "BA",
                        "BSc",
                        "BCom",
                        "BCA",
                        "MBA",
                        "MSc",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "oklch(0.25 0.03 260)" }}>
                    Daily Study Hours
                  </Label>
                  <Select
                    value={form.dailyHours}
                    onValueChange={(v) => setForm({ ...form, dailyHours: v })}
                  >
                    <SelectTrigger
                      style={{
                        background: "oklch(0.97 0.01 260)",
                        borderColor: "oklch(0.88 0.02 270)",
                        color: "white",
                      }}
                      data-ocid="study_planner.hours.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["2", "3", "4", "5", "6", "7", "8"].map((h) => (
                        <SelectItem key={h} value={h}>
                          {h} Hours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "oklch(0.25 0.03 260)" }}>
                    Goal / Target Exam *
                  </Label>
                  <Select
                    value={form.goal}
                    onValueChange={(v) => setForm({ ...form, goal: v })}
                  >
                    <SelectTrigger
                      style={{
                        background: "oklch(0.97 0.01 260)",
                        borderColor: "oklch(0.88 0.02 270)",
                        color: "white",
                      }}
                      data-ocid="study_planner.goal.select"
                    >
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "JEE Main / Advanced",
                        "NEET",
                        "UPSC CSE",
                        "SSC CGL",
                        "Banking (IBPS/SBI)",
                        "Railway (RRB)",
                        "Board Exam (Class 10)",
                        "Board Exam (Class 12)",
                        "College Semester Exam",
                        "Placement / Campus",
                        "General Studies",
                      ].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "oklch(0.25 0.03 260)" }}>
                    Weak Subjects (comma separated)
                  </Label>
                  <Input
                    placeholder="e.g., Mathematics, Physics"
                    value={form.weakSubjects}
                    onChange={(e) =>
                      setForm({ ...form, weakSubjects: e.target.value })
                    }
                    data-ocid="study_planner.weak_subjects.input"
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                  />
                </div>
                <Button
                  className="w-full font-bold mt-2"
                  onClick={handleGenerate}
                  disabled={generating}
                  data-ocid="study_planner.generate.primary_button"
                  style={{
                    background: "oklch(0.50 0.22 290)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" /> Generate My Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Plan Output */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!plan && !generating && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64 rounded-2xl"
                  style={{
                    border: "1px dashed oklch(0.50 0.22 290 / 0.25)",
                    background: "oklch(0.97 0.01 260)",
                  }}
                  data-ocid="study_planner.empty_state"
                >
                  <Calendar
                    className="h-16 w-16 mb-4"
                    style={{ color: "oklch(0.50 0.22 290 / 0.25)" }}
                  />
                  <p style={{ color: "oklch(0.40 0.03 260)" }}>
                    Fill the form and generate your personalized study plan
                  </p>
                </motion.div>
              )}
              {generating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64"
                  data-ocid="study_planner.loading_state"
                >
                  <div className="relative">
                    <Brain
                      className="h-16 w-16 animate-pulse"
                      style={{ color: "oklch(0.50 0.22 290)" }}
                    />
                  </div>
                  <p className="mt-4 text-neon-cyan font-semibold">
                    AI is creating your personalized plan...
                  </p>
                </motion.div>
              )}
              {plan && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-neon-gradient">
                      {form.name}'s 4-Week Study Plan
                    </h2>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={saving}
                      data-ocid="study_planner.save.button"
                      style={{
                        background: "oklch(0.45 0.20 145 / 0.15)",
                        color: "oklch(0.45 0.20 145)",
                        borderColor: "oklch(0.45 0.20 145 / 0.35)",
                      }}
                      variant="outline"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-1" />
                      )}
                      Save Plan
                    </Button>
                  </div>

                  {plan.map((week) => (
                    <motion.div
                      key={week.week}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: week.week * 0.1 }}
                    >
                      <Card className="cosmic-card">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Badge
                              style={{
                                background: "oklch(0.50 0.22 290 / 0.15)",
                                color: "oklch(0.50 0.22 290)",
                                borderColor: "oklch(0.50 0.22 290 / 0.35)",
                              }}
                            >
                              Week {week.week}
                            </Badge>
                            <span style={{ color: "oklch(0.45 0.20 145)" }}>
                              {week.theme}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {week.days.map((day) => (
                              <div
                                key={day.day}
                                className="rounded-lg p-3"
                                style={{ background: "oklch(0.97 0.01 260)" }}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle
                                    className="h-4 w-4 flex-shrink-0"
                                    style={{ color: "oklch(0.50 0.22 290)" }}
                                  />
                                  <span
                                    className="font-semibold text-sm"
                                    style={{ color: "oklch(0.50 0.22 290)" }}
                                  >
                                    {day.day}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pl-6">
                                  <div>
                                    <span
                                      className="font-medium"
                                      style={{ color: "oklch(0.45 0.20 145)" }}
                                    >
                                      Morning:{" "}
                                    </span>
                                    <span
                                      style={{ color: "oklch(0.45 0.03 260)" }}
                                    >
                                      {day.morning}
                                    </span>
                                  </div>
                                  <div>
                                    <span
                                      className="font-medium"
                                      style={{ color: "oklch(0.55 0.22 55)" }}
                                    >
                                      Afternoon:{" "}
                                    </span>
                                    <span
                                      style={{ color: "oklch(0.45 0.03 260)" }}
                                    >
                                      {day.afternoon}
                                    </span>
                                  </div>
                                  <div>
                                    <span
                                      className="font-medium"
                                      style={{ color: "oklch(0.45 0.22 290)" }}
                                    >
                                      Evening:{" "}
                                    </span>
                                    <span
                                      style={{ color: "oklch(0.45 0.03 260)" }}
                                    >
                                      {day.evening}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  <Card
                    className="cosmic-card"
                    style={{ borderColor: "oklch(0.45 0.20 145 / 0.35)" }}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <Clock
                        className="h-8 w-8"
                        style={{ color: "oklch(0.45 0.20 145)" }}
                      />
                      <div>
                        <p
                          className="font-semibold"
                          style={{ color: "oklch(0.45 0.20 145)" }}
                        >
                          Resources: All government-approved, copyright-free
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.40 0.03 260)" }}
                        >
                          NCERT, NPTEL, SWAYAM, DIKSHA, e-PG Pathshala, IGNOU
                          eGyankosh
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
