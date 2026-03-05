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
  ChevronDown,
  Globe,
  GraduationCap,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/ncert", labelHi: "NCERT Books", labelEn: "NCERT Books" },
  { to: "/videos", labelHi: "Video Lectures", labelEn: "Video Lectures" },
  {
    to: "/competitive",
    labelHi: "Competitive Exams",
    labelEn: "Competitive Exams",
  },
  { to: "/quizzes", labelHi: "Quizzes", labelEn: "Quizzes" },
  { to: "/government", labelHi: "Govt Jobs", labelEn: "Govt Jobs" },
];

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
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-navy shadow-navy/20 shadow-sm"
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
              src="/assets/generated/gyan-tarang-logo-transparent.dim_200x200.png"
              alt="Gyan Tarang Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
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
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                data-ocid="nav.home.link"
              >
                {t(link.labelHi, link.labelEn)}
              </Link>
            ))}
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
                    <div className="h-7 w-7 rounded-full bg-saffron flex items-center justify-center text-xs font-bold text-white">
                      {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:block text-xs max-w-[80px] truncate">
                      {currentUser?.name}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t("Dashboard", "Dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        {t("Admin Panel", "Admin Panel")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("Logout", "Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="bg-saffron hover:bg-saffron/90 text-white font-semibold shadow-saffron text-xs px-3"
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
              className="lg:hidden text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMenuOpen(!menuOpen)}
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
          className="lg:hidden border-t border-white/10 bg-navy"
          style={{ background: "oklch(0.16 0.09 260)" }}
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
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
                  >
                    {t("Dashboard", "Dashboard")}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-md"
                  >
                    {t("Logout", "Logout")}
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-saffron hover:bg-saffron/90 text-white"
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
