import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BADGE_LIST,
  MOCK_LEADERBOARD,
  useAppContext,
} from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  Heart,
  Library,
  LineChart,
  Map as MapIcon,
  MessageSquare,
  Settings,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  {
    to: "/ncert",
    icon: BookOpen,
    labelHi: "NCERT Books",
    labelEn: "NCERT Books",
    color: "oklch(0.50 0.22 290)",
    badge: "Class 1-12",
    ocid: "dashboard.ncert.link",
  },
  {
    to: "/videos",
    icon: Video,
    labelHi: "Video Lectures",
    labelEn: "Video Lectures",
    color: "oklch(0.45 0.20 145)",
    badge: "Official NCERT",
    ocid: "dashboard.videos.link",
  },
  {
    to: "/competitive",
    icon: Trophy,
    labelHi: "Competitive Exams",
    labelEn: "Competitive Exams",
    color: "oklch(0.55 0.22 55)",
    badge: "50+ Exams",
    ocid: "dashboard.exams.link",
  },
  {
    to: "/placement",
    icon: Briefcase,
    labelHi: "Placement Prep",
    labelEn: "Placement Prep",
    color: "oklch(0.45 0.22 290)",
    badge: "BTech All Branches",
    ocid: "dashboard.placement.link",
  },
  {
    to: "/gyan-mitra",
    icon: Brain,
    labelHi: "Gyan Mitra AI",
    labelEn: "Gyan Mitra AI",
    color: "oklch(0.50 0.22 290)",
    badge: "AI Doubt Solver",
    ocid: "dashboard.gyan_mitra.link",
  },
  {
    to: "/ai-study-planner",
    icon: MapIcon,
    labelHi: "Study Planner AI",
    labelEn: "Study Planner AI",
    color: "oklch(0.45 0.20 145)",
    badge: "AI Powered",
    ocid: "dashboard.study_planner.link",
  },
  {
    to: "/ai-quiz-generator",
    icon: Zap,
    labelHi: "Quiz Generator AI",
    labelEn: "Quiz Generator AI",
    color: "oklch(0.55 0.22 55)",
    badge: "AI Powered",
    ocid: "dashboard.quiz_gen.link",
  },
  {
    to: "/ai-performance",
    icon: LineChart,
    labelHi: "Performance AI",
    labelEn: "Performance AI",
    color: "oklch(0.45 0.22 290)",
    badge: "AI Analytics",
    ocid: "dashboard.performance.link",
  },
  {
    to: "/ai-career",
    icon: GraduationCap,
    labelHi: "Career Counselor AI",
    labelEn: "Career Counselor AI",
    color: "oklch(0.50 0.22 290)",
    badge: "AI Powered",
    ocid: "dashboard.career_ai.link",
  },
  {
    to: "/ai-summarizer",
    icon: Sparkles,
    labelHi: "AI Summarizer",
    labelEn: "AI Summarizer",
    color: "oklch(0.45 0.20 145)",
    badge: "AI Powered",
    ocid: "dashboard.summarizer.link",
  },
  {
    to: "/maths-tutor",
    icon: Brain,
    labelHi: "AI Maths Tutor",
    labelEn: "AI Maths Tutor",
    color: "oklch(0.55 0.22 55)",
    badge: "AI Powered",
    ocid: "dashboard.maths.link",
  },
  {
    to: "/english-coach",
    icon: MessageSquare,
    labelHi: "AI English Coach",
    labelEn: "AI English Coach",
    color: "oklch(0.50 0.22 290)",
    badge: "AI Powered",
    ocid: "dashboard.english.link",
  },
  {
    to: "/quizzes",
    icon: Zap,
    labelHi: "Interactive Quizzes",
    labelEn: "Interactive Quizzes",
    color: "oklch(0.45 0.20 145)",
    badge: "All Subjects",
    ocid: "dashboard.quizzes.link",
  },
  {
    to: "/mock-tests",
    icon: Trophy,
    labelHi: "Mock Tests",
    labelEn: "Mock Tests",
    color: "oklch(0.55 0.22 55)",
    badge: "8 Exams",
    ocid: "dashboard.mock_tests.link",
  },
  {
    to: "/notes",
    icon: FileText,
    labelHi: "Notes & PDFs",
    labelEn: "Notes & PDFs",
    color: "oklch(0.45 0.22 290)",
    badge: "Download Free",
    ocid: "dashboard.notes.link",
  },
  {
    to: "/btech",
    icon: GraduationCap,
    labelHi: "BTech Dashboard",
    labelEn: "BTech Dashboard",
    color: "oklch(0.50 0.22 290)",
    badge: "All Branches",
    ocid: "dashboard.btech.link",
  },
  {
    to: "/study-tracker",
    icon: BarChart3,
    labelHi: "Study Tracker",
    labelEn: "Study Tracker",
    color: "oklch(0.45 0.20 145)",
    badge: "Track Progress",
    ocid: "dashboard.tracker.link",
  },
  {
    to: "/ndl",
    icon: Library,
    labelHi: "Digital Library",
    labelEn: "Digital Library",
    color: "oklch(0.55 0.22 55)",
    badge: "70 Lakh+ Books",
    ocid: "dashboard.ndl.link",
  },
  {
    to: "/wellness",
    icon: Heart,
    labelHi: "Wellness Hub",
    labelEn: "Wellness Hub",
    color: "oklch(0.45 0.22 290)",
    badge: "Health & Mind",
    ocid: "dashboard.wellness.link",
  },
  {
    to: "/government",
    icon: Building2,
    labelHi: "Govt Jobs & Schemes",
    labelEn: "Govt Jobs & Schemes",
    color: "oklch(0.50 0.22 290)",
    badge: "Official Links",
    ocid: "dashboard.govt.link",
  },
];

const badgeIcons: Record<string, string> = {
  "First Login": "👋",
  "Quiz Master": "🌟",
  "7-Day Streak": "🔥",
  "AI Explorer": "🤖",
  "Perfect Score": "🎊",
  "Study Champion": "🏆",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const {
    t,
    currentUser,
    isLoggedIn,
    setLanguage,
    language,
    xpPoints,
    badges,
  } = useAppContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate({ to: "/auth" });
    return null;
  }

  const isAdmin = currentUser?.role === "admin";
  const xpMax = 1000;
  const xpProgress = Math.min(((xpPoints % xpMax) / xpMax) * 100, 100);
  const xpLevel = Math.floor(xpPoints / xpMax) + 1;

  return (
    <div
      className="min-h-screen page-enter"
      style={{ background: "oklch(0.99 0 0)" }}
    >
      {/* Welcome Banner */}
      <div className="relative overflow-hidden py-8 px-4 bg-hero-pattern">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "oklch(0.50 0.22 290 / 0.60)" }}
              >
                🙏 Swagat hai!
              </p>
              <h1 className="font-display text-3xl font-black text-foreground">
                Namaste, {currentUser?.name}!
              </h1>
              <p className="mt-1" style={{ color: "oklch(0.35 0.03 260)" }}>
                {t("आज क्या पढ़ना है?", "What will you study today?")}
              </p>
            </motion.div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                style={{
                  background: "oklch(0.98 0.01 270)",
                  border: "1px solid oklch(0.88 0.02 270)",
                }}
              >
                <span style={{ color: "oklch(0.40 0.03 260)" }}>Language:</span>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as "hi" | "en")}
                >
                  <SelectTrigger
                    className="h-7 border-0 bg-transparent p-0 gap-1 w-auto text-foreground"
                    data-ocid="nav.language.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {currentUser?.classOrBranch && (
                <Badge
                  style={{
                    background: "oklch(0.50 0.22 290 / 0.15)",
                    color: "oklch(0.50 0.22 290)",
                    borderColor: "oklch(0.50 0.22 290 / 0.25)",
                  }}
                >
                  {currentUser.classOrBranch}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              {
                icon: TrendingUp,
                labelHi: "Progress",
                labelEn: "Progress",
                value: "65%",
                prog: 65,
                color: "oklch(0.50 0.22 290)",
              },
              {
                icon: Clock,
                labelHi: "Aaj ka Time",
                labelEn: "Today's Time",
                value: "2h 30m",
                prog: 40,
                color: "oklch(0.45 0.20 145)",
              },
              {
                icon: Star,
                labelHi: "Quiz Score",
                labelEn: "Quiz Score",
                value: "8/10",
                prog: 80,
                color: "oklch(0.55 0.22 55)",
              },
            ].map((stat) => (
              <div
                key={stat.labelEn}
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.96 0.02 260)",
                  border: "1px solid oklch(0.88 0.02 270 / 0.6)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon
                    className="h-4 w-4"
                    style={{ color: stat.color }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.03 260)" }}
                  >
                    {t(stat.labelHi, stat.labelEn)}
                  </span>
                </div>
                <div className="text-xl font-display font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <Progress value={stat.prog} className="h-1.5" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gamification Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card
            className="cosmic-card mb-8"
            style={{ borderColor: "oklch(0.50 0.22 290 / 0.25)" }}
          >
            <CardContent className="p-6">
              <Tabs defaultValue="xp">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-bold text-neon-gradient flex items-center gap-2">
                    <Trophy
                      className="h-5 w-5"
                      style={{ color: "oklch(0.55 0.22 55)" }}
                    />
                    Your Progress & Achievements
                  </h2>
                  <TabsList style={{ background: "oklch(0.97 0.01 260)" }}>
                    <TabsTrigger value="xp" data-ocid="dashboard.xp.tab">
                      XP & Level
                    </TabsTrigger>
                    <TabsTrigger
                      value="badges"
                      data-ocid="dashboard.badges.tab"
                    >
                      Badges
                    </TabsTrigger>
                    <TabsTrigger
                      value="leaderboard"
                      data-ocid="dashboard.leaderboard.tab"
                    >
                      Leaderboard
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="xp">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="h-14 w-14 rounded-full flex items-center justify-center font-black text-xl"
                      style={{
                        background: "oklch(0.50 0.22 290 / 0.15)",
                        border: "2px solid oklch(0.50 0.22 290 / 0.40)",
                      }}
                    >
                      <span style={{ color: "oklch(0.50 0.22 290)" }}>
                        L{xpLevel}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          Level {xpLevel} Explorer
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "oklch(0.50 0.22 290)" }}
                        >
                          {xpPoints} XP
                        </span>
                      </div>
                      <div
                        className="w-full h-3 rounded-full overflow-hidden"
                        style={{ background: "oklch(0.95 0.02 260)" }}
                      >
                        <motion.div
                          className="h-full rounded-full xp-bar-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: `${xpProgress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.40 0.03 260)" }}
                      >
                        {xpPoints % xpMax} / {xpMax} XP to next level
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      {
                        label: "Quiz XP",
                        value: Math.floor(xpPoints * 0.6),
                        color: "oklch(0.45 0.20 145)",
                      },
                      {
                        label: "AI Tools XP",
                        value: Math.floor(xpPoints * 0.25),
                        color: "oklch(0.50 0.22 290)",
                      },
                      {
                        label: "Study Plans",
                        value: Math.floor(xpPoints * 0.1),
                        color: "oklch(0.55 0.22 55)",
                      },
                      {
                        label: "Badges Earned",
                        value: badges.length,
                        color: "oklch(0.45 0.22 290)",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg p-3 text-center"
                        style={{ background: "oklch(0.97 0.01 260)" }}
                      >
                        <p
                          className="text-xl font-black"
                          style={{ color: s.color }}
                        >
                          {s.value}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.40 0.03 260)" }}
                        >
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="badges">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {BADGE_LIST.map((badge) => {
                      const earned = badges.includes(badge);
                      return (
                        <motion.div
                          key={badge}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                          style={{
                            background: earned
                              ? "oklch(0.55 0.22 55 / 0.10)"
                              : "oklch(0.97 0.01 260)",
                            border: `1px solid ${earned ? "oklch(0.55 0.22 55 / 0.35)" : "oklch(0.88 0.02 270)"}`,
                            opacity: earned ? 1 : 0.5,
                          }}
                          data-ocid={`dashboard.badge.${badge.toLowerCase().replace(/\s/g, "_")}.panel`}
                        >
                          <span className="text-3xl">
                            {earned ? badgeIcons[badge] : "🔒"}
                          </span>
                          <span
                            className="text-xs font-semibold"
                            style={{
                              color: earned
                                ? "oklch(0.55 0.22 55)"
                                : "oklch(0.45 0.03 260)",
                            }}
                          >
                            {badge}
                          </span>
                          {earned && (
                            <Badge
                              className="text-[9px] px-1"
                              style={{
                                background: "oklch(0.45 0.20 145 / 0.15)",
                                color: "oklch(0.45 0.20 145)",
                              }}
                            >
                              Earned!
                            </Badge>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                  {badges.length === 0 && (
                    <p
                      className="text-center text-sm mt-4"
                      style={{ color: "oklch(0.45 0.03 260)" }}
                    >
                      Complete quizzes and use AI tools to earn badges!
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="leaderboard">
                  <div className="space-y-2">
                    {MOCK_LEADERBOARD.map((student, i) => (
                      <motion.div
                        key={student.rank}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{
                          background:
                            i < 3
                              ? "oklch(0.82 0.18 55 / 0.08)"
                              : "oklch(0.97 0.01 260)",
                          border: `1px solid ${i < 3 ? "oklch(0.82 0.18 55 / 0.2)" : "oklch(0.88 0.02 270)"}`,
                        }}
                        data-ocid={`dashboard.leaderboard.item.${i + 1}`}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{
                            background:
                              i === 0
                                ? "oklch(0.55 0.22 55)"
                                : i === 1
                                  ? "oklch(0.50 0.03 260)"
                                  : i === 2
                                    ? "oklch(0.65 0.15 55)"
                                    : "oklch(0.95 0.02 260)",
                            color:
                              i < 3
                                ? "oklch(0.99 0 0)"
                                : "oklch(0.40 0.03 260)",
                          }}
                        >
                          {i < 3 ? <Crown className="h-4 w-4" /> : student.rank}
                        </div>
                        <span className="flex-1 text-sm font-medium text-foreground">
                          {student.name}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "oklch(0.50 0.22 290)" }}
                        >
                          {student.xp.toLocaleString()} XP
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Card */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/admin" data-ocid="dashboard.admin.link">
              <Card
                className="cursor-pointer neon-pulse"
                style={{
                  background: "oklch(0.85 0.20 195 / 0.08)",
                  borderColor: "oklch(0.50 0.22 290 / 0.40)",
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center neon-glow-cyan"
                      style={{ background: "oklch(0.50 0.22 290 / 0.15)" }}
                    >
                      <Shield
                        className="h-6 w-6"
                        style={{ color: "oklch(0.50 0.22 290)" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-neon-cyan">
                        Admin Panel
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "oklch(0.40 0.03 260)" }}
                      >
                        Content, Users, Mock Tests, Announcements management
                      </p>
                    </div>
                    <ChevronRight
                      className="h-5 w-5"
                      style={{ color: "oklch(0.50 0.22 290)" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Quick Nav Grid */}
        <div className="mb-6">
          <h2 className="font-display text-xl font-black mb-4 text-neon-gradient">
            All Resources
          </h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {navItems.map((navItem) => (
              <motion.div key={navItem.to} variants={item}>
                <Link to={navItem.to} data-ocid={navItem.ocid}>
                  <Card
                    className="card-vibrant h-full cursor-pointer"
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      border: "1px solid oklch(0.88 0.02 270)",
                      minHeight: "100px",
                    }}
                  >
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${navItem.color}22` }}
                      >
                        <navItem.icon
                          className="h-4 w-4"
                          style={{ color: navItem.color }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {t(navItem.labelHi, navItem.labelEn)}
                        </p>
                        <Badge
                          className="text-[10px] mt-1 px-1.5 py-0"
                          style={{
                            background: `${navItem.color}18`,
                            color: navItem.color,
                            borderColor: `${navItem.color}30`,
                          }}
                        >
                          {navItem.badge}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
