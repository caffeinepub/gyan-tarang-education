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
import { useAppContext } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Heart,
  MessageSquare,
  Settings,
  Shield,
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
    color: "saffron",
    badge: "Class 1-12",
    ocid: "dashboard.ncert.link",
  },
  {
    to: "/videos",
    icon: Video,
    labelHi: "Video Lectures",
    labelEn: "Video Lectures",
    color: "navy",
    badge: "Official NCERT",
    ocid: "dashboard.videos.link",
  },
  {
    to: "/competitive",
    icon: Trophy,
    labelHi: "Competitive Exams",
    labelEn: "Competitive Exams",
    color: "saffron",
    badge: "50+ Exams",
    ocid: "dashboard.exams.link",
  },
  {
    to: "/placement",
    icon: Briefcase,
    labelHi: "Placement Prep",
    labelEn: "Placement Prep",
    color: "india-green",
    badge: "BTech All Branches",
    ocid: "dashboard.placement.link",
  },
  {
    to: "/maths-tutor",
    icon: Brain,
    labelHi: "AI Maths Tutor",
    labelEn: "AI Maths Tutor",
    color: "navy",
    badge: "AI Powered",
    ocid: "dashboard.maths.link",
  },
  {
    to: "/english-coach",
    icon: MessageSquare,
    labelHi: "AI English Coach",
    labelEn: "AI English Coach",
    color: "saffron",
    badge: "AI Powered",
    ocid: "dashboard.english.link",
  },
  {
    to: "/quizzes",
    icon: Zap,
    labelHi: "Interactive Quizzes",
    labelEn: "Interactive Quizzes",
    color: "india-green",
    badge: "All Subjects",
    ocid: "dashboard.quizzes.link",
  },
  {
    to: "/study-groups",
    icon: MessageSquare,
    labelHi: "Study Groups",
    labelEn: "Study Groups",
    color: "navy",
    badge: "Chat",
    ocid: "dashboard.study-groups.link",
  },
  {
    to: "/wellness",
    icon: Heart,
    labelHi: "Wellness Hub",
    labelEn: "Wellness Hub",
    color: "saffron",
    badge: "Health & Mind",
    ocid: "dashboard.wellness.link",
  },
  {
    to: "/government",
    icon: Building2,
    labelHi: "Govt Jobs & Schemes",
    labelEn: "Govt Jobs & Schemes",
    color: "india-green",
    badge: "Official Links",
    ocid: "dashboard.govt.link",
  },
  {
    to: "/ncert",
    icon: FileText,
    labelHi: "Notes & PDFs",
    labelEn: "Notes & PDFs",
    color: "navy",
    badge: "Download Free",
    ocid: "dashboard.notes.link",
  },
  {
    to: "/about",
    icon: GraduationCap,
    labelHi: "About Us",
    labelEn: "About Us",
    color: "saffron",
    badge: "Founder",
    ocid: "dashboard.about.link",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const { t, currentUser, isLoggedIn, setLanguage, language } = useAppContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate({ to: "/auth" });
    return null;
  }

  const allItems =
    currentUser?.role === "admin"
      ? [
          ...navItems,
          {
            to: "/admin",
            icon: Settings,
            labelHi: "Admin Panel",
            labelEn: "Admin Panel",
            color: "navy",
            badge: "Admin Only",
            ocid: "dashboard.admin.link",
          },
        ]
      : navItems;

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Welcome Banner */}
      <div className="bg-hero-pattern py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/60 text-sm mb-1">🙏 Swagat hai!</p>
                <h1 className="font-display text-3xl font-black text-white">
                  Namaste, {currentUser?.name}!
                </h1>
                <p className="text-white/70 mt-1">
                  {t("आज क्या पढ़ना है?", "What will you study today?")}
                </p>
              </motion.div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-sm">
                <span>Language:</span>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as "hi" | "en")}
                >
                  <SelectTrigger
                    className="h-7 border-0 bg-transparent text-white p-0 gap-1 w-auto"
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
                <Badge className="bg-saffron/20 text-saffron border-saffron/30">
                  {currentUser.classOrBranch}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress summary */}
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
              },
              {
                icon: Clock,
                labelHi: "Aaj ka Time",
                labelEn: "Today's Time",
                value: "2h 30m",
                prog: 40,
              },
              {
                icon: Star,
                labelHi: "Quiz Score",
                labelEn: "Quiz Score",
                value: "8/10",
                prog: 80,
              },
            ].map((stat) => (
              <div key={stat.labelEn} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-white/60" />
                  <span className="text-xs text-white/60">
                    {t(stat.labelHi, stat.labelEn)}
                  </span>
                </div>
                <div className="text-xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <Progress value={stat.prog} className="h-1.5 bg-white/20" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Quick Nav Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">
            {t("सभी Sections", "All Sections")}
          </h2>
          <span className="badge-govt">✅ Government Approved</span>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {allItems.map((navItem) => (
            <motion.div key={navItem.to + navItem.labelEn} variants={item}>
              <Link to={navItem.to} data-ocid={navItem.ocid}>
                <Card className="card-hover cursor-pointer border border-border/50 h-full group">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background:
                          navItem.color === "saffron"
                            ? "oklch(0.72 0.18 55 / 0.15)"
                            : navItem.color === "navy"
                              ? "oklch(0.22 0.12 260 / 0.12)"
                              : "oklch(0.56 0.18 145 / 0.12)",
                      }}
                    >
                      <navItem.icon
                        className="h-6 w-6"
                        style={{
                          color:
                            navItem.color === "saffron"
                              ? "oklch(0.72 0.18 55)"
                              : navItem.color === "navy"
                                ? "oklch(0.22 0.12 260)"
                                : "oklch(0.56 0.18 145)",
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-foreground leading-tight">
                        {t(navItem.labelHi, navItem.labelEn)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {navItem.badge}
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Free
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Access */}
        <div
          className="mt-8 p-6 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 55 / 0.1), oklch(0.56 0.18 145 / 0.08))",
            border: "1px solid oklch(0.72 0.18 55 / 0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                🎯 {t("आज का लक्ष्य", "Today's Goal")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Quiz दें और अपनी progress track करें",
                  "Take a quiz and track your progress",
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/quizzes">
                <Button
                  className="bg-saffron hover:bg-saffron/90 text-white gap-2"
                  data-ocid="dashboard.quizzes.link"
                >
                  <Zap className="h-4 w-4" />
                  {t("Quiz Shuru Karein", "Start Quiz")}
                </Button>
              </Link>
              <Link to="/maths-tutor">
                <Button variant="outline" className="gap-2">
                  <Brain className="h-4 w-4" />
                  AI Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
