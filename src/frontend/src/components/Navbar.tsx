import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronDown,
  Globe,
  GraduationCap,
  Heart,
  Library,
  LineChart,
  LogOut,
  Map as MapIcon,
  Menu,
  Shield,
  Sparkles,
  Trophy,
  User,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/ncert", labelHi: "NCERT", labelEn: "NCERT" },
  { to: "/videos", labelHi: "Videos", labelEn: "Videos" },
  { to: "/notes", labelHi: "Notes", labelEn: "Notes" },
  { to: "/competitive", labelHi: "Exams", labelEn: "Exams" },
  { to: "/quizzes", labelHi: "Quizzes", labelEn: "Quizzes" },
  { to: "/government", labelHi: "Govt Jobs", labelEn: "Govt Jobs" },
  { to: "/btech", labelHi: "BTech", labelEn: "BTech" },
];

const aiLinks = [
  {
    to: "/gyan-mitra",
    labelHi: "Gyan Mitra AI",
    labelEn: "Gyan Mitra AI",
    icon: Brain,
  },
  {
    to: "/ai-study-planner",
    labelHi: "Study Planner AI",
    labelEn: "Study Planner AI",
    icon: MapIcon,
  },
  {
    to: "/ai-quiz-generator",
    labelHi: "Quiz Generator AI",
    labelEn: "Quiz Generator AI",
    icon: Zap,
  },
  {
    to: "/ai-performance",
    labelHi: "Performance AI",
    labelEn: "Performance AI",
    icon: LineChart,
  },
  {
    to: "/ai-career",
    labelHi: "Career Counselor AI",
    labelEn: "Career Counselor AI",
    icon: GraduationCap,
  },
  {
    to: "/ai-summarizer",
    labelHi: "AI Summarizer",
    labelEn: "AI Summarizer",
    icon: Sparkles,
  },
  {
    to: "/maths-tutor",
    labelHi: "AI Maths Tutor",
    labelEn: "AI Maths Tutor",
    icon: Brain,
  },
  {
    to: "/english-coach",
    labelHi: "AI English Coach",
    labelEn: "AI English Coach",
    icon: Globe,
  },
];

const moreLinks = [
  {
    to: "/mock-tests",
    labelHi: "Mock Tests",
    labelEn: "Mock Tests",
    icon: Trophy,
  },
  {
    to: "/placement",
    labelHi: "Placement Prep",
    labelEn: "Placement Prep",
    icon: GraduationCap,
  },
  {
    to: "/wellness",
    labelHi: "Wellness Hub",
    labelEn: "Wellness Hub",
    icon: Heart,
  },
  {
    to: "/study-groups",
    labelHi: "Study Groups",
    labelEn: "Study Groups",
    icon: Users,
  },
  {
    to: "/study-tracker",
    labelHi: "Study Tracker",
    labelEn: "Study Tracker",
    icon: BarChart3,
  },
  {
    to: "/ndl",
    labelHi: "Digital Library",
    labelEn: "Digital Library",
    icon: Library,
  },
  { to: "/pyq", labelHi: "PYQ Papers", labelEn: "PYQ Papers", icon: BookOpen },
];

const LOGO = "/assets/generated/gyan-tarang-logo-transparent.dim_400x400.png";

export default function Navbar() {
  const { t, language, setLanguage, currentUser, setCurrentUser, isLoggedIn } =
    useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate({ to: "/" });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(255, 255, 255, 0.97)",
        borderBottom: "1px solid oklch(0.90 0.02 300)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 1px 12px oklch(0.55 0.22 310 / 0.08)",
      }}
    >
      <div className="tricolor-bar" />
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 min-w-0 shrink-0"
            data-ocid="nav.home.link"
          >
            <img
              src={LOGO}
              alt="Gyan Tarang Logo"
              className="h-10 w-20 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sibling = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (sibling) sibling.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 350 / 0.15), oklch(0.55 0.22 290 / 0.15))",
                border: "1px solid oklch(0.55 0.22 310 / 0.3)",
              }}
              className="h-10 w-10 rounded-full items-center justify-center font-black text-sm"
            >
              <span className="text-neon-gradient">GT</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold text-neon-gradient leading-tight">
                Gyan Tarang
              </div>
              <div
                className="text-[10px] leading-tight"
                style={{ color: "oklch(0.50 0.04 260)" }}
              >
                Education & Technology
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-purple-50"
                style={{ color: "oklch(0.25 0.04 260)" }}
                data-ocid={`nav.${link.to.slice(1)}.link`}
              >
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}

            {/* AI Tools dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-sm font-medium px-3 py-1.5"
                  style={{ color: "oklch(0.40 0.22 290)" }}
                  data-ocid="nav.ai_tools.dropdown_menu"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("AI Tools", "AI Tools")}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {aiLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2"
                      data-ocid={`nav.ai.${link.to.slice(1)}.link`}
                    >
                      <link.icon
                        className="h-4 w-4"
                        style={{ color: "oklch(0.40 0.22 290)" }}
                      />
                      {t(link.labelHi, link.labelEn)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-sm font-medium px-3 py-1.5"
                  style={{ color: "oklch(0.25 0.04 260)" }}
                >
                  {t("और", "More")}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2"
                      data-ocid={`nav.more.${link.to.slice(1)}.link`}
                    >
                      <link.icon className="h-4 w-4 text-muted-foreground" />
                      {t(link.labelHi, link.labelEn)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background: "oklch(0.55 0.22 290 / 0.10)",
                color: "oklch(0.40 0.22 290)",
                border: "1px solid oklch(0.55 0.22 290 / 0.25)",
              }}
              data-ocid="nav.language.toggle"
            >
              <Globe className="h-3 w-3" />
              {language === "hi" ? "EN" : "हि"}
            </button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    style={{ color: "oklch(0.25 0.04 260)" }}
                    data-ocid="nav.user.dropdown_menu"
                  >
                    <div
                      className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.55 0.22 290))",
                        color: "white",
                      }}
                    >
                      {currentUser?.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm">
                      {currentUser?.name?.split(" ")[0]}
                    </span>
                    {currentUser?.role === "admin" && (
                      <Badge
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          background: "oklch(0.55 0.22 290 / 0.12)",
                          color: "oklch(0.35 0.22 290)",
                          borderColor: "oklch(0.55 0.22 290 / 0.3)",
                        }}
                      >
                        Admin
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2"
                      data-ocid="nav.dashboard.link"
                    >
                      <User className="h-4 w-4" />
                      {t("डैशबोर्ड", "Dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2"
                        data-ocid="nav.admin.link"
                      >
                        <Shield
                          className="h-4 w-4"
                          style={{ color: "oklch(0.40 0.22 290)" }}
                        />
                        {t("एडमिन पैनल", "Admin Panel")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500"
                    data-ocid="nav.logout.button"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("लॉगआउट", "Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" data-ocid="nav.login.button">
                <Button
                  size="sm"
                  className="text-sm font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.50 0.22 290))",
                  }}
                >
                  {t("लॉगिन", "Login")}
                </Button>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-md transition-colors hover:bg-gray-100"
              style={{ color: "oklch(0.30 0.04 260)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile.toggle"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="xl:hidden border-t px-4 py-4 space-y-1"
          style={{
            background: "oklch(0.99 0 0)",
            borderColor: "oklch(0.90 0.02 300)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-50"
              style={{ color: "oklch(0.25 0.04 260)" }}
              onClick={() => setMenuOpen(false)}
              data-ocid={`nav.mobile.${link.to.slice(1)}.link`}
            >
              {t(link.labelHi, link.labelEn)}
            </Link>
          ))}
          <div
            className="pt-2 border-t"
            style={{ borderColor: "oklch(0.90 0.02 300)" }}
          >
            <p
              className="px-3 py-1 text-xs font-bold"
              style={{ color: "oklch(0.40 0.22 290)" }}
            >
              ✨ AI Tools
            </p>
            {aiLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-sm transition-colors hover:bg-purple-50"
                style={{ color: "oklch(0.25 0.04 260)" }}
                onClick={() => setMenuOpen(false)}
                data-ocid={`nav.mobile.ai.${link.to.slice(1).replace("/", "")}.link`}
              >
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}
          </div>
          {!isLoggedIn && (
            <Link
              to="/auth"
              className="block mt-2"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                className="w-full text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.50 0.22 290))",
                }}
              >
                {t("लॉगिन / Register", "Login / Register")}
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
