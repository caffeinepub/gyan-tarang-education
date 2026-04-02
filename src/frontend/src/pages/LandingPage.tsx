import LightBubbleBackground from "@/components/LightBubbleBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle,
  ClipboardList,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  LineChart,
  Map as MapIcon,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: BookOpen,
    titleHi: "NCERT Books & Notes",
    titleEn: "NCERT Books & Notes",
    descHi: "Class 1 se 12 tak sabhi NCERT kitabein aur notes",
    descEn: "All NCERT books and notes from Class 1 to 12",
    color: "oklch(0.45 0.20 145)",
  },
  {
    icon: Video,
    titleHi: "Video Lectures",
    titleEn: "Video Lectures",
    descHi: "NCERT Official YouTube channel se sarkari videos",
    descEn: "Official NCERT YouTube channel videos",
    color: "oklch(0.45 0.22 230)",
  },
  {
    icon: Brain,
    titleHi: "Gyan Mitra AI",
    titleEn: "Gyan Mitra AI",
    descHi: "24x7 AI doubt solver - sab subjects ke liye",
    descEn: "24x7 AI doubt solver for all subjects",
    color: "oklch(0.45 0.22 290)",
  },
  {
    icon: Trophy,
    titleHi: "Competitive Exams",
    titleEn: "Competitive Exams",
    descHi: "JEE, NEET, UPSC, SSC, Railway aur 50+ Exams",
    descEn: "JEE, NEET, UPSC, SSC, Railway and 50+ Exams",
    color: "oklch(0.55 0.22 55)",
  },
  {
    icon: MapIcon,
    titleHi: "AI Study Planner",
    titleEn: "AI Study Planner",
    descHi: "Personalized 4-week study plan generate karein",
    descEn: "Generate a personalized 4-week study plan",
    color: "oklch(0.45 0.22 290)",
  },
  {
    icon: Zap,
    titleHi: "AI Quiz Generator",
    titleEn: "AI Quiz Generator",
    descHi: "Subject-wise instant MCQ quiz generate karein",
    descEn: "Generate instant MCQ quiz by subject and topic",
    color: "oklch(0.50 0.22 350)",
  },
  {
    icon: LineChart,
    titleHi: "Performance Analyzer",
    titleEn: "Performance Analyzer",
    descHi: "Apne quiz results ka deep AI analysis paaein",
    descEn: "Get deep AI analysis of your quiz performance",
    color: "oklch(0.45 0.22 290)",
  },
  {
    icon: GraduationCap,
    titleHi: "Career Counselor AI",
    titleEn: "Career Counselor AI",
    descHi: "Apne interest se best career paths discover karein",
    descEn: "Discover the best career paths for your interests",
    color: "oklch(0.50 0.22 265)",
  },
  {
    icon: Sparkles,
    titleHi: "AI Summarizer",
    titleEn: "AI Summarizer",
    descHi: "Chapter text ko instantly key points mein convert karein",
    descEn: "Convert chapter text to instant key points",
    color: "oklch(0.45 0.22 290)",
  },
  {
    icon: Heart,
    titleHi: "Wellness Hub",
    titleEn: "Wellness Hub",
    descHi: "Health, Motivation aur Time Management",
    descEn: "Health, Motivation and Time Management",
    color: "oklch(0.50 0.18 195)",
  },
  {
    icon: Briefcase,
    titleHi: "Placement Prep",
    titleEn: "Placement Prep",
    descHi: "BTech sabhi branches ke liye placement preparation",
    descEn: "Placement prep for all BTech branches",
    color: "oklch(0.50 0.22 265)",
  },
  {
    icon: ClipboardList,
    titleHi: "Previous Year Papers",
    titleEn: "Previous Year Papers",
    descHi: "CBSE, JEE, NEET, UPSC, SSC - sabhi PYQ with answers",
    descEn: "All previous year papers from CBSE to UPSC",
    color: "oklch(0.50 0.22 15)",
  },
];

const stats = [
  { value: "6+", labelHi: "AI Tools", labelEn: "AI Tools" },
  { value: "50+", labelHi: "Competitive Exams", labelEn: "Competitive Exams" },
  { value: "100%", labelHi: "Free Forever", labelEn: "Free Forever" },
  { value: "NEP 2020", labelHi: "Compliant", labelEn: "Compliant" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function LandingPage() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.99 0 0)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <LightBubbleBackground />
        {/* Colorful gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 right-0 w-96 h-96 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.22 290 / 0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 -left-16 w-80 h-80 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, oklch(0.45 0.20 145 / 0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full animate-wave-pulse"
            style={{ border: "1px solid oklch(0.55 0.22 350 / 0.15)" }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full animate-wave-pulse"
            style={{
              border: "1px solid oklch(0.45 0.20 145 / 0.15)",
              animationDelay: "0.8s",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <img
                  src="/assets/generated/gyan-tarang-logo-transparent.dim_400x400.png"
                  alt="Gyan Tarang"
                  className="h-28 w-28 rounded-full animate-float"
                  style={{
                    boxShadow:
                      "0 8px 40px oklch(0.55 0.22 310 / 0.25), 0 4px 16px oklch(0.55 0.22 310 / 0.12)",
                  }}
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
                      "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.50 0.22 290))",
                    boxShadow: "0 8px 40px oklch(0.55 0.22 310 / 0.3)",
                  }}
                  className="h-28 w-28 rounded-full items-center justify-center font-black text-4xl font-display animate-float text-white"
                >
                  GT
                </div>
              </div>
            </motion.div>

            {/* App Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-black mb-4 text-neon-gradient leading-tight">
                Gyan Tarang
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold mb-2"
                style={{ color: "oklch(0.40 0.22 145)" }}
              >
                {t(
                  "भारत का #1 Free AI Education Platform",
                  "India's #1 Free AI Education Platform",
                )}
              </p>
              <p
                className="text-base max-w-2xl mx-auto mb-8"
                style={{ color: "oklch(0.35 0.04 260)" }}
              >
                {t(
                  "Class 1 se Graduation tak — AI-powered learning, government-approved content, sabhi competitive exams preparation. Bilkul free.",
                  "From Class 1 to Graduation — AI-powered learning, government-approved content, all competitive exam prep. 100% free.",
                )}
              </p>
            </motion.div>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                {
                  icon: Shield,
                  text: "Government Approved",
                  color: "oklch(0.40 0.22 230)",
                },
                {
                  icon: CheckCircle,
                  text: "Copyright Free",
                  color: "oklch(0.40 0.20 145)",
                },
                {
                  icon: Award,
                  text: "Made in India",
                  color: "oklch(0.50 0.22 55)",
                },
                { icon: Star, text: "NEP 2020", color: "oklch(0.40 0.22 290)" },
              ].map((b) => (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${b.color}18`,
                    color: b.color,
                    border: `1px solid ${b.color}40`,
                  }}
                >
                  <b.icon className="h-3 w-3" />
                  {b.text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/auth" data-ocid="landing.get_started.primary_button">
                <Button
                  size="lg"
                  className="font-bold text-base px-8 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.50 0.22 290))",
                    boxShadow: "0 4px 20px oklch(0.55 0.22 310 / 0.3)",
                  }}
                >
                  {t("शुरू करें — Free", "Get Started — Free")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link
                to="/gyan-mitra"
                data-ocid="landing.gyan_mitra.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold text-base px-8"
                  style={{
                    borderColor: "oklch(0.45 0.20 145 / 0.5)",
                    color: "oklch(0.35 0.20 145)",
                    background: "oklch(0.45 0.20 145 / 0.08)",
                  }}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  {t("Gyan Mitra AI", "Gyan Mitra AI")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="py-8 px-4"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.97 0.02 350), oklch(0.97 0.02 290), oklch(0.97 0.02 230), oklch(0.97 0.02 145))",
          borderTop: "1px solid oklch(0.90 0.02 300)",
          borderBottom: "1px solid oklch(0.90 0.02 300)",
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const colors = [
                "oklch(0.45 0.22 350)",
                "oklch(0.40 0.22 290)",
                "oklch(0.40 0.22 145)",
                "oklch(0.50 0.22 55)",
              ];
              return (
                <div key={stat.labelEn} className="text-center">
                  <div
                    className="font-display text-3xl font-black"
                    style={{ color: colors[i % colors.length] }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.40 0.04 260)" }}
                  >
                    {t(stat.labelHi, stat.labelEn)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4" style={{ background: "oklch(0.99 0 0)" }}>
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: "oklch(0.55 0.22 290 / 0.10)",
                border: "1px solid oklch(0.55 0.22 290 / 0.25)",
              }}
            >
              <Sparkles
                className="h-4 w-4"
                style={{ color: "oklch(0.40 0.22 290)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.40 0.22 290)" }}
              >
                AI-Powered Features
              </span>
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-black mb-4"
              style={{ color: "oklch(0.15 0.02 250)" }}
            >
              {t("सब कुछ Ek Platform Per", "Everything in One Platform")}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.40 0.04 260)" }}
            >
              {t(
                "Government approved, copyright-free resources ke saath AI tools — world-class education bilkul free.",
                "Government-approved, copyright-free resources with AI tools — world-class education, absolutely free.",
              )}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div key={feature.titleEn} variants={item}>
                <Card className="cosmic-card h-full">
                  <CardContent className="p-5">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${feature.color}18` }}
                    >
                      <feature.icon
                        className="h-5 w-5"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3
                      className="font-display text-base font-bold mb-1"
                      style={{ color: "oklch(0.15 0.02 250)" }}
                    >
                      {t(feature.titleHi, feature.titleEn)}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.45 0.03 260)" }}
                    >
                      {t(feature.descHi, feature.descEn)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Tools Spotlight */}
      <section
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.02 300) 0%, oklch(0.97 0.02 260) 50%, oklch(0.97 0.02 230) 100%)",
        }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4 text-neon-gradient">
              {t("6 Powerful AI Tools", "6 Powerful AI Tools")}
            </h2>
            <p style={{ color: "oklch(0.40 0.04 260)" }}>
              Next-gen AI features for smarter studying
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Gyan Mitra AI",
                desc: "24x7 doubt solver for any subject",
                to: "/gyan-mitra",
                color: "oklch(0.40 0.22 290)",
              },
              {
                icon: MapIcon,
                title: "Study Planner AI",
                desc: "4-week personalized study schedule",
                to: "/ai-study-planner",
                color: "oklch(0.45 0.20 145)",
              },
              {
                icon: Zap,
                title: "Quiz Generator AI",
                desc: "Instant MCQ quiz from any topic",
                to: "/ai-quiz-generator",
                color: "oklch(0.50 0.22 55)",
              },
              {
                icon: LineChart,
                title: "Performance Analyzer",
                desc: "Deep insights into your progress",
                to: "/ai-performance",
                color: "oklch(0.45 0.22 290)",
              },
              {
                icon: GraduationCap,
                title: "Career Counselor AI",
                desc: "Find the perfect career path",
                to: "/ai-career",
                color: "oklch(0.45 0.22 265)",
              },
              {
                icon: Sparkles,
                title: "AI Summarizer",
                desc: "Instant chapter summaries & key points",
                to: "/ai-summarizer",
                color: "oklch(0.50 0.22 350)",
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={tool.to} data-ocid={`landing.ai_tool.${i + 1}.card`}>
                  <Card className="cosmic-card h-full cursor-pointer group bg-white">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${tool.color}15`,
                          border: `1px solid ${tool.color}30`,
                        }}
                      >
                        <tool.icon
                          className="h-6 w-6"
                          style={{ color: tool.color }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-display text-base font-bold mb-1"
                          style={{ color: "oklch(0.15 0.02 250)" }}
                        >
                          {tool.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "oklch(0.45 0.03 260)" }}
                        >
                          {tool.desc}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-5 w-5 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: tool.color }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-4 relative overflow-hidden"
        style={{ background: "oklch(0.99 0 0)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.55 0.22 350 / 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 50%, oklch(0.50 0.22 230 / 0.05) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              {t("अपना Sapna Pura Karein", "Achieve Your Dreams")}
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: "oklch(0.40 0.04 260)" }}
            >
              {t(
                "Lakhs of students pehle se hi Gyan Tarang par apne sapne poore kar rahe hain. Aap bhi join karein — bilkul free.",
                "Lakhs of students are already achieving their dreams on Gyan Tarang. Join them — completely free.",
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth" data-ocid="landing.cta.primary_button">
                <Button
                  size="lg"
                  className="font-bold px-10 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.50 0.22 290))",
                    boxShadow: "0 4px 20px oklch(0.55 0.22 310 / 0.3)",
                  }}
                >
                  {t("अभी Join Karein", "Join Now — Free")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ncert" data-ocid="landing.explore.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold px-10"
                  style={{
                    borderColor: "oklch(0.45 0.20 145 / 0.4)",
                    color: "oklch(0.35 0.20 145)",
                    background: "oklch(0.45 0.20 145 / 0.06)",
                  }}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t("NCERT Books Explore Karein", "Explore NCERT Books")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
