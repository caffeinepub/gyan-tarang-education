import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Shield, Sparkles } from "lucide-react";

const LOGO = "/assets/generated/gyan-tarang-logo-transparent.dim_400x400.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{
        background: "oklch(0.97 0.01 270)",
        borderTop: "1px solid oklch(0.90 0.02 300)",
      }}
      className="mt-auto"
    >
      <div className="tricolor-bar" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO}
                alt="Gyan Tarang"
                className="h-12 w-24 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const sibling = e.currentTarget
                    .nextElementSibling as HTMLElement | null;
                  if (sibling) sibling.style.display = "flex";
                }}
              />
              <div
                className="h-12 w-12 rounded-full items-center justify-center font-black text-lg"
                style={{
                  display: "none",
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 350 / 0.15), oklch(0.55 0.22 290 / 0.15))",
                  border: "1px solid oklch(0.55 0.22 310 / 0.3)",
                }}
              >
                <span className="text-neon-gradient">GT</span>
              </div>
              <div>
                <div className="font-display text-xl font-black text-neon-gradient">
                  Gyan Tarang
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  Education & Technology
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "oklch(0.35 0.03 260)" }}
            >
              भारत का #1 Free Education Platform. Class 1 se Graduation tak,
              competitive exams aur placements tak — sab kuch free.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge-govt">
                <Shield className="h-3 w-3" /> Govt Approved
              </span>
              <span className="badge-made-in-india">
                <BookOpen className="h-3 w-3" /> Made in India
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-display font-bold mb-4 text-sm"
              style={{ color: "oklch(0.40 0.22 230)" }}
            >
              Quick Links
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.40 0.04 260)" }}
            >
              {[
                { to: "/ncert", label: "NCERT Books" },
                { to: "/videos", label: "Video Lectures" },
                { to: "/competitive", label: "Competitive Exams" },
                { to: "/btech", label: "BTech Resources" },
                { to: "/mock-tests", label: "Mock Tests" },
                { to: "/government", label: "Govt Jobs" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3
              className="font-display font-bold mb-4 text-sm flex items-center gap-1"
              style={{ color: "oklch(0.40 0.22 290)" }}
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Tools
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.40 0.04 260)" }}
            >
              {[
                { to: "/gyan-mitra", label: "Gyan Mitra AI" },
                { to: "/ai-study-planner", label: "Study Planner" },
                { to: "/ai-quiz-generator", label: "Quiz Generator" },
                { to: "/ai-performance", label: "Performance Analyzer" },
                { to: "/ai-career", label: "Career Counselor" },
                { to: "/ai-summarizer", label: "AI Summarizer" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderColor: "oklch(0.88 0.02 280)",
            color: "oklch(0.45 0.04 260)",
          }}
        >
          <div>
            © {year} Gyan Tarang Education. Founder: Mrityunjay Pandey (BTech
            CSE)
          </div>
          <div className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500 mx-0.5" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
