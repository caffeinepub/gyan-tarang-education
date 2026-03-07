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
  Shield,
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
    descHi: "Class 1 से 12 तक सभी NCERT किताबें और नोट्स",
    descEn: "All NCERT books and notes from Class 1 to 12",
    color: "saffron",
  },
  {
    icon: Video,
    titleHi: "Video Lectures",
    titleEn: "Video Lectures",
    descHi: "NCERT Official यूट्यूब चैनल से सरकारी वीडियो",
    descEn: "Official NCERT YouTube channel videos",
    color: "navy",
  },
  {
    icon: Brain,
    titleHi: "AI Tutor",
    titleEn: "AI Tutor",
    descHi: "AI Maths Tutor और English Coach",
    descEn: "AI Maths Tutor and English Coach",
    color: "india-green",
  },
  {
    icon: Trophy,
    titleHi: "Competitive Exams",
    titleEn: "Competitive Exams",
    descHi: "JEE, NEET, UPSC, SSC, Railway और 50+ Exams",
    descEn: "JEE, NEET, UPSC, SSC, Railway and 50+ Exams",
    color: "saffron",
  },
  {
    icon: Heart,
    titleHi: "Wellness Hub",
    titleEn: "Wellness Hub",
    descHi: "Health, Motivation और Time Management",
    descEn: "Health, Motivation and Time Management",
    color: "india-green",
  },
  {
    icon: Briefcase,
    titleHi: "Placement Prep",
    titleEn: "Placement Prep",
    descHi: "BTech सभी branches के लिए placement preparation",
    descEn: "Placement prep for all BTech branches",
    color: "navy",
  },
  {
    icon: FileText,
    titleHi: "Handwriting Notes PDF",
    titleEn: "Handwriting Notes PDF",
    descHi: "Class 1 से BTech तक सभी Notes PDF - सरकारी अनुमोदित",
    descEn: "All Notes PDF from Class 1 to BTech - government approved",
    color: "saffron",
  },
  {
    icon: ClipboardList,
    titleHi: "Previous Year Papers",
    titleEn: "Previous Year Papers",
    descHi:
      "CBSE, JEE, NEET, UPSC, SSC - सभी previous year papers with answers",
    descEn:
      "CBSE, JEE, NEET, UPSC, SSC - all previous year papers with answers",
    color: "india-green",
  },
];

const stats = [
  { value: "50+", labelHi: "Competitive Exams", labelEn: "Competitive Exams" },
  { value: "Class 1-12", labelHi: "& BTech", labelEn: "& BTech" },
  { value: "100%", labelHi: "Free Forever", labelEn: "Free Forever" },
  { value: "NEP 2020", labelHi: "Compliant", labelEn: "Compliant" },
];

const badges = [
  {
    icon: Shield,
    textHi: "Government Approved",
    textEn: "Government Approved",
  },
  { icon: CheckCircle, textHi: "Copyright Free", textEn: "Copyright Free" },
  { icon: Award, textHi: "Made in India", textEn: "Made in India" },
  { icon: Star, textHi: "NEP 2020", textEn: "NEP 2020" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-pattern py-20 md:py-32">
        {/* Decorative chakra circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-saffron/10 animate-wave-pulse" />
          <div
            className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full border border-saffron/6 animate-wave-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-india-green/5 rounded-full" />
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
              className="flex justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <img
                  src="/assets/generated/gyan-tarang-logo-transparent.dim_400x200.png"
                  alt="Gyan Tarang"
                  className="h-24 w-24 rounded-full shadow-2xl animate-float"
                  style={{
                    boxShadow:
                      "0 0 60px oklch(0.72 0.18 55 / 0.6), 0 0 120px oklch(0.72 0.18 55 / 0.2)",
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
                      "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.22 0.12 260))",
                    boxShadow: "0 0 60px oklch(0.72 0.18 55 / 0.6)",
                  }}
                  className="h-24 w-24 rounded-full items-center justify-center text-white font-black text-3xl font-display animate-float"
                >
                  GT
                </div>
              </div>
            </motion.div>

            {/* App Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1
                className="font-display text-4xl md:text-6xl font-black mb-2 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55) 0%, oklch(0.90 0.05 55) 40%, oklch(0.56 0.18 145) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gyan Tarang
              </h1>
              <div className="text-sm md:text-base font-ui text-white/50 tracking-widest uppercase mb-4">
                Education & Technology
              </div>
            </motion.div>

            {/* Hindi Slogan - Prominent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <div
                className="inline-block px-6 py-3 rounded-2xl text-3xl md:text-5xl font-display font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))",
                  color: "white",
                  boxShadow: "0 8px 32px oklch(0.72 0.18 55 / 0.4)",
                }}
              >
                नहीं आता है? सीखो!
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-white/70 text-lg md:text-xl mb-8 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              100% Free Quality Education Forever | Made in India 🇮🇳
            </motion.p>

            {/* Badges Row */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {badges.map((b) => (
                <span
                  key={b.textEn}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20"
                >
                  <b.icon className="h-3 w-3" />
                  {t(b.textHi, b.textEn)}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/auth">
                <Button
                  size="lg"
                  className="font-semibold px-8 py-6 text-base rounded-xl gap-2 text-white transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))",
                    boxShadow:
                      "0 0 30px oklch(0.72 0.18 55 / 0.5), 0 4px 20px oklch(0.72 0.18 55 / 0.3)",
                  }}
                  data-ocid="landing.primary_button"
                >
                  <Zap className="h-5 w-5" />
                  {t("अभी शुरू करें", "Start Learning Now")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/ncert">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 py-6 text-base rounded-xl gap-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 20px oklch(1 0 0 / 0.05)",
                  }}
                  data-ocid="landing.secondary_button"
                >
                  <BookOpen className="h-5 w-5" />
                  {t("NCERT Books देखें", "Browse NCERT Books")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                variants={item}
                className="text-center"
              >
                <div
                  className="font-display text-4xl md:text-5xl font-black mb-1"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))"
                        : "linear-gradient(135deg, oklch(0.22 0.12 260), oklch(0.56 0.18 145))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body font-semibold">
                  {t(stat.labelHi, stat.labelEn)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-cream/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-saffron/10 text-saffron border-saffron/20 font-semibold">
              {t("हमारी विशेषताएं", "Our Features")}
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
              {t("सब कुछ एक ही जगह", "Everything in One Place")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              {t(
                "सरकार द्वारा अनुमोदित सामग्री के साथ Class 1 से BTech तक की पूरी शिक्षा, बिल्कुल मुफ्त",
                "Complete education from Class 1 to BTech with government-approved content, absolutely free",
              )}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feat) => {
              const featColor =
                feat.color === "saffron"
                  ? "oklch(0.72 0.18 55)"
                  : feat.color === "navy"
                    ? "oklch(0.22 0.12 260)"
                    : "oklch(0.56 0.18 145)";
              return (
                <motion.div key={feat.titleEn} variants={item}>
                  <Card className="card-hover border border-border/50 overflow-hidden h-full">
                    {/* Gradient top border */}
                    <div
                      className="h-1"
                      style={{
                        background: `linear-gradient(90deg, ${featColor}, ${featColor}60)`,
                      }}
                    />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-xl flex-shrink-0 shadow-sm"
                          style={{
                            background: `${featColor}15`,
                            border: `1px solid ${featColor}30`,
                          }}
                        >
                          <feat.icon
                            className="h-6 w-6"
                            style={{ color: featColor }}
                          />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground mb-1">
                            {t(feat.titleHi, feat.titleEn)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(feat.descHi, feat.descEn)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="badge-govt">
                          ✅ {t("सरकारी अनुमोदित", "Govt Approved")}
                        </span>
                        <span className="text-xs text-muted-foreground font-semibold">
                          100% Free
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Gyan Tarang? */}
      <section className="py-16" style={{ background: "oklch(0.18 0.10 260)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3">
              {t("Gyan Tarang क्यों?", "Why Gyan Tarang?")}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {t(
                "तीन मजबूत स्तंभ जो हमें अलग बनाते हैं",
                "Three strong pillars that make us different",
              )}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                emoji: "🏛️",
                titleHi: "Government Approved",
                titleEn: "Government Approved",
                descHi:
                  "NCERT, NPTEL, UGC, AICTE — सभी सरकारी sources से content",
                descEn:
                  "Content from NCERT, NPTEL, UGC, AICTE official sources",
                color: "oklch(0.72 0.18 55)",
              },
              {
                emoji: "🆓",
                titleHi: "100% Free Forever",
                titleEn: "100% Free Forever",
                descHi:
                  "कोई subscription नहीं, कोई hidden charge नहीं — हमेशा के लिए मुफ्त",
                descEn: "No subscription, no hidden charges — free forever",
                color: "oklch(0.56 0.18 145)",
              },
              {
                emoji: "🇮🇳",
                titleHi: "Made in India",
                titleEn: "Made in India",
                descHi: "भारतीय छात्रों के लिए, भारत में बना — NEP 2020 compliant",
                descEn:
                  "Built in India for Indian students — NEP 2020 compliant",
                color: "oklch(0.45 0.18 220)",
              },
            ].map((pillar) => (
              <motion.div key={pillar.titleEn} variants={item}>
                <div
                  className="p-6 rounded-2xl text-center border transition-all hover:scale-105"
                  style={{
                    background: `${pillar.color}12`,
                    borderColor: `${pillar.color}30`,
                    boxShadow: `0 8px 32px ${pillar.color}10`,
                  }}
                >
                  <div className="text-5xl mb-4">{pillar.emoji}</div>
                  <h3
                    className="font-display text-xl font-black mb-2"
                    style={{ color: pillar.color }}
                  >
                    {t(pillar.titleHi, pillar.titleEn)}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {t(pillar.descHi, pillar.descEn)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEP 2020 Section */}
      <section className="py-16" style={{ background: "oklch(0.22 0.10 260)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-india-green/30 bg-india-green/10 text-white mb-6">
              <Award
                className="h-4 w-4 text-india-green"
                style={{ color: "oklch(0.56 0.18 145)" }}
              />
              <span className="text-sm font-semibold text-white">
                NEP 2020 Compliant
              </span>
            </div>
            <h2 className="font-display text-3xl font-black text-white mb-4">
              {t("राष्ट्रीय शिक्षा नीति 2020", "National Education Policy 2020")}
            </h2>
            <p className="text-white/70 text-base mb-8">
              {t(
                "Gyan Tarang NEP 2020 के सभी दिशानिर्देशों का पालन करता है। हमारी सामग्री बहुभाषी, समावेशी और skill-based learning पर केंद्रित है।",
                "Gyan Tarang follows all NEP 2020 guidelines. Our content is multilingual, inclusive, and focused on skill-based learning.",
              )}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Globe, textHi: "बहुभाषी", textEn: "Multilingual" },
                { icon: Users, textHi: "समावेशी", textEn: "Inclusive" },
                {
                  icon: BarChart3,
                  textHi: "Skill-Based",
                  textEn: "Skill-Based",
                },
                { icon: GraduationCap, textHi: "Holistic", textEn: "Holistic" },
              ].map((item) => (
                <div
                  key={item.textEn}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 text-center"
                >
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-white/60" />
                  <div className="text-sm font-semibold text-white">
                    {t(item.textHi, item.textEn)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-cream/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-black text-foreground">
                {t("Founder & CEO", "Founder & CEO")}
              </h2>
            </div>
            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="h-24 w-24 rounded-full flex items-center justify-center text-3xl font-black text-white font-display"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.22 0.12 260))",
                      }}
                    >
                      MP
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-2xl font-black text-foreground">
                      Mrityunjay Pandey
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      BTech CSE | Founder & CEO
                    </p>
                    <blockquote
                      className="text-foreground/80 italic border-l-4 pl-4"
                      style={{ borderColor: "oklch(0.72 0.18 55)" }}
                    >
                      "Har ghar tak quality education pahunchana humara sapna
                      hai. Gyan Tarang ke zariye hum is sapne ko sachai mein
                      badal rahe hain."
                    </blockquote>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="badge-made-in-india">
                        🇮🇳 Made in India
                      </span>
                      <span className="badge-govt">100% Free Forever</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.18 55) 0%, oklch(0.65 0.15 40) 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
              {t("आज ही शुरू करें - बिल्कुल मुफ्त!", "Start Today - Completely Free!")}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {t(
                "लाखों छात्रों के साथ जुड़ें और अपनी पढ़ाई को नई ऊंचाइयों पर ले जाएं",
                "Join millions of students and take your education to new heights",
              )}
            </p>
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-white font-bold px-10 py-6 text-base rounded-xl gap-2 transition-all duration-300"
                style={{
                  color: "oklch(0.72 0.18 55)",
                  boxShadow:
                    "0 0 40px oklch(1 0 0 / 0.4), 0 8px 32px oklch(0 0 0 / 0.2)",
                }}
                data-ocid="landing.cta.primary_button"
              >
                <GraduationCap className="h-5 w-5" />
                {t("अभी Register करें - Free!", "Register Now - Free!")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
