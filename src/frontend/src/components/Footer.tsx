import { Link } from "@tanstack/react-router";
import { BookOpen, Flag, Heart, Mail, Phone, Shield } from "lucide-react";

const LOGO = "/assets/generated/gyan-tarang-logo-transparent.dim_400x200.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="bg-foreground text-background mt-auto"
      style={{ background: "oklch(0.15 0.05 260)" }}
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
                style={{ display: "none", background: "oklch(0.72 0.18 55)" }}
                className="h-12 w-12 rounded-full items-center justify-center text-white font-black"
              >
                GT
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white">
                  Gyan Tarang
                </div>
                <div className="text-sm text-white/60">
                  Education & Technology
                </div>
              </div>
            </div>
            <p
              className="text-3xl font-display font-bold mb-2"
              style={{ color: "oklch(0.72 0.18 55)" }}
            >
              नहीं आता है? सीखो!
            </p>
            <p className="text-sm text-white/60 mb-4">
              100% Free Quality Education Forever | Made in India 🇮🇳
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
              <span className="badge-govt">✅ NEP 2020 Compliant</span>
              <span className="badge-govt">🔒 Fully Secure</span>
              <span className="badge-govt">🎓 UGC/AICTE Approved</span>
            </div>
            <div className="text-xs text-white/40 space-y-1">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                <span>Government Approved Content Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" />
                <span>Copyright-Free Educational Material</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  to="/ncert"
                  className="hover:text-white transition-colors"
                >
                  NCERT Books (Class 1-12)
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="hover:text-white transition-colors"
                >
                  Video Lectures
                </Link>
              </li>
              <li>
                <Link
                  to="/btech"
                  className="hover:text-white transition-colors"
                >
                  BTech All Branches
                </Link>
              </li>
              <li>
                <Link
                  to="/competitive"
                  className="hover:text-white transition-colors"
                >
                  Competitive Exams (50+)
                </Link>
              </li>
              <li>
                <Link
                  to="/placement"
                  className="hover:text-white transition-colors"
                >
                  Placement Preparation
                </Link>
              </li>
              <li>
                <Link
                  to="/quizzes"
                  className="hover:text-white transition-colors"
                >
                  Interactive Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/wellness"
                  className="hover:text-white transition-colors"
                >
                  Wellness Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/study-groups"
                  className="hover:text-white transition-colors"
                >
                  Study Groups
                </Link>
              </li>
              <li>
                <Link
                  to="/study-tracker"
                  className="hover:text-white transition-colors"
                >
                  Study Tracker
                </Link>
              </li>
              <li>
                <Link to="/ndl" className="hover:text-white transition-colors">
                  National Digital Library
                </Link>
              </li>
              <li>
                <Link
                  to="/government"
                  className="hover:text-white transition-colors"
                >
                  Govt Jobs & Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/maths-tutor"
                  className="hover:text-white transition-colors"
                >
                  AI Maths Tutor
                </Link>
              </li>
              <li>
                <Link
                  to="/english-coach"
                  className="hover:text-white transition-colors"
                >
                  AI English Coach
                </Link>
              </li>
            </ul>
          </div>

          {/* Founder & Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              Founder
            </h3>
            <div
              className="p-4 rounded-xl border border-white/10 mb-4"
              style={{ background: "oklch(0.20 0.06 260)" }}
            >
              <div className="text-white font-semibold">Mrityunjay Pandey</div>
              <div className="text-xs text-white/60 mb-2">
                BTech CSE | Founder & CEO
              </div>
              <p className="text-xs text-white/50 italic">
                "Har ghar tak quality education pahunchana humara lakshya hai."
              </p>
            </div>
            <div className="text-xs text-white/40 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>info@gyantarang.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>Helpline: 1800-XXX-XXXX (Toll Free)</span>
              </div>
            </div>

            {/* NEP 2020 */}
            <div
              className="mt-4 p-3 rounded-xl border border-white/10"
              style={{
                background: "oklch(0.56 0.18 145 / 0.1)",
                borderColor: "oklch(0.56 0.18 145 / 0.25)",
              }}
            >
              <p className="text-xs text-white/80 font-semibold mb-1">
                🏛️ NEP 2020 Compliant
              </p>
              <p className="text-[10px] text-white/50">
                National Education Policy 2020 guidelines followed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 flex items-center gap-1">
            <span>© {year}. Built with</span>
            <Heart className="h-3 w-3 text-red-400 fill-red-400" />
            <span>using</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline"
            >
              caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Flag
              className="h-3 w-3"
              style={{ color: "oklch(0.72 0.18 55)" }}
            />
            <span>Bharat Ka #1 Free Education Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
