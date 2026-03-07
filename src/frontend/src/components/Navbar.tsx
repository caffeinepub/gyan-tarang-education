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
  LogOut,
  Menu,
  Shield,
  Trophy,
  User,
  Users,
  Video,
  X,
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

const moreLinks = [
  {
    to: "/gyan-mitra",
    labelHi: "Gyan Mitra AI",
    labelEn: "Gyan Mitra AI",
    icon: Brain,
  },
  {
    to: "/mock-tests",
    labelHi: "Mock Tests",
    labelEn: "Mock Tests",
    icon: Trophy,
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
      className="sticky top-0 z-50 w-full border-b border-border/50 shadow-sm"
      style={{ background: "oklch(0.18 0.10 260)" }}
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
              style={{ display: "none", background: "oklch(0.72 0.18 55)" }}
              className="h-10 w-10 rounded-full items-center justify-center text-white font-black text-sm"
            >
              GT
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold text-white leading-tight">
                Gyan Tarang
              </div>
              <div className="text-[10px] text-white/60 leading-tight">
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
                className="px-3 py-1.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                data-ocid={`nav.${link.to.slice(1)}.link`}
              >
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}
            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 gap-1 text-sm font-medium px-3 py-1.5"
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
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5 text-xs"
              onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
              data-ocid="nav.language.select"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === "hi" ? "EN" : "हि"}
            </Button>

            {/* Auth */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/90 hover:text-white hover:bg-white/10 gap-1.5"
                  >
                    <div
                      className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "oklch(0.72 0.18 55)" }}
                    >
                      {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:block text-xs max-w-[80px] truncate">
                      {currentUser?.name}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2"
                      data-ocid="nav.dashboard.link"
                    >
                      <User className="h-4 w-4" />
                      {t("Dashboard", "Dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/study-tracker"
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      {t("Study Tracker", "Study Tracker")}
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2"
                          data-ocid="nav.admin.link"
                        >
                          <Shield
                            className="h-4 w-4"
                            style={{ color: "oklch(0.72 0.18 55)" }}
                          />
                          <span className="flex-1">
                            {t("Admin Panel", "Admin Panel")}
                          </span>
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.72 0.18 55)",
                              color: "white",
                            }}
                          >
                            Admin
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                    data-ocid="nav.logout.button"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("Logout", "Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="text-white font-semibold shadow-saffron text-xs px-3"
                style={{ background: "oklch(0.72 0.18 55)" }}
                onClick={() => navigate({ to: "/auth" })}
                data-ocid="nav.login.button"
              >
                {t("Login करें", "Login")}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="nav.menu.toggle"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="xl:hidden border-t border-white/10"
          style={{ background: "oklch(0.16 0.09 260)" }}
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid={`nav.mobile.${link.to.slice(1)}.link`}
              >
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}
            <div className="border-t border-white/10 my-1" />
            {moreLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-white/10">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                    onClick={() => setMenuOpen(false)}
                    data-ocid="nav.mobile.dashboard.link"
                  >
                    {t("Dashboard", "Dashboard")}
                  </Link>
                  {currentUser?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md font-semibold"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        background: "oklch(0.72 0.18 55 / 0.15)",
                        color: "oklch(0.90 0.10 55)",
                        border: "1px solid oklch(0.72 0.18 55 / 0.3)",
                      }}
                      data-ocid="nav.mobile.admin.link"
                    >
                      <Shield
                        className="h-4 w-4"
                        style={{ color: "oklch(0.72 0.18 55)" }}
                      />
                      {t("Admin Panel", "Admin Panel")}
                      <span
                        className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.72 0.18 55)",
                          color: "white",
                        }}
                      >
                        Admin
                      </span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-md"
                    data-ocid="nav.mobile.logout.button"
                  >
                    {t("Logout", "Logout")}
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full text-white"
                    style={{ background: "oklch(0.72 0.18 55)" }}
                    data-ocid="nav.mobile.login.button"
                  >
                    {t("Login करें", "Login")}
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
