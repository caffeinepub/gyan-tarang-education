import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import {
  BookMarked,
  BookOpen,
  ExternalLink,
  Film,
  Globe,
  GraduationCap,
  Microscope,
  Music,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    icon: BookOpen,
    titleHi: "Text Books",
    titleEn: "Text Books",
    descHi: "School aur College textbooks",
    descEn: "School and College textbooks",
    url: "https://ndl.gov.in/browse?category=textbooks",
    color: "oklch(0.72 0.18 55)",
  },
  {
    icon: Microscope,
    titleHi: "Research Papers",
    titleEn: "Research Papers",
    descHi: "Scientific research journals",
    descEn: "Scientific research journals",
    url: "https://ndl.gov.in/browse?category=journals",
    color: "oklch(0.22 0.12 260)",
  },
  {
    icon: Film,
    titleHi: "Audio-Visual",
    titleEn: "Audio-Visual",
    descHi: "Educational videos aur audio",
    descEn: "Educational videos and audio",
    url: "https://ndl.gov.in/browse?category=audio-visual",
    color: "oklch(0.56 0.18 145)",
  },
  {
    icon: BookMarked,
    titleHi: "Reference Books",
    titleEn: "Reference Books",
    descHi: "Encyclopedia, dictionaries, atlases",
    descEn: "Encyclopedia, dictionaries, atlases",
    url: "https://ndl.gov.in/browse?category=reference",
    color: "oklch(0.60 0.14 40)",
  },
  {
    icon: GraduationCap,
    titleHi: "Competitive Exam",
    titleEn: "Competitive Exam",
    descHi: "JEE, NEET, UPSC ke liye materials",
    descEn: "Materials for JEE, NEET, UPSC",
    url: "https://ndl.gov.in/search?query=competitive+exam",
    color: "oklch(0.55 0.18 200)",
  },
  {
    icon: Globe,
    titleHi: "Languages",
    titleEn: "Languages",
    descHi: "Hindi, English aur regional languages",
    descEn: "Hindi, English and regional languages",
    url: "https://ndl.gov.in/browse?language=Hindi",
    color: "oklch(0.50 0.16 170)",
  },
  {
    icon: Music,
    titleHi: "Performing Arts",
    titleEn: "Performing Arts",
    descHi: "Music, dance, theatre resources",
    descEn: "Music, dance, theatre resources",
    url: "https://ndl.gov.in/browse?category=arts",
    color: "oklch(0.65 0.15 30)",
  },
  {
    icon: Users,
    titleHi: "Community",
    titleEn: "Community",
    descHi: "Social sciences, humanities",
    descEn: "Social sciences, humanities",
    url: "https://ndl.gov.in/browse?category=social-sciences",
    color: "oklch(0.55 0.12 260)",
  },
];

const registrationSteps = [
  {
    step: 1,
    titleHi: "Visit ndl.gov.in",
    titleEn: "Visit ndl.gov.in",
    descHi: "Official website par jaayein",
    descEn: "Go to the official website",
  },
  {
    step: 2,
    titleHi: "Register / Sign Up",
    titleEn: "Register / Sign Up",
    descHi: "Apna naam, email aur institution register karein",
    descEn: "Register your name, email and institution",
  },
  {
    step: 3,
    titleHi: "Email Verify Karein",
    titleEn: "Verify Email",
    descHi: "Email par aayi link se verify karein",
    descEn: "Verify using link sent to your email",
  },
  {
    step: 4,
    titleHi: "Millions of Resources!",
    titleEn: "Millions of Resources!",
    descHi: "70+ lakh books, journals aur videos access karein",
    descEn: "Access 7 million+ books, journals and videos",
  },
];

export default function NdlPage() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-6">
              <Shield
                className="h-4 w-4"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              Government of India - Ministry of Education
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              National Digital Library
            </h1>
            <p
              className="font-display text-2xl font-bold mb-6"
              style={{ color: "oklch(0.72 0.18 55)" }}
            >
              राष्ट्रीय डिजिटल पुस्तकालय
            </p>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
              {t(
                "India ka sabse bada digital library - 70 lakh+ books, journals, videos, aur study materials - bilkul MUFT!",
                "India's largest digital library - 7 million+ books, journals, videos, and study materials - completely FREE!",
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="badge-govt">✅ Govt of India</span>
              <span className="badge-govt">📚 70 Lakh+ Resources</span>
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20">
                🆓 Free Forever
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-bold px-8 py-6 text-base gap-2 rounded-xl text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))",
                  boxShadow: "0 0 30px oklch(0.72 0.18 55 / 0.5)",
                }}
                onClick={() =>
                  window.open(
                    "https://ndl.gov.in",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                data-ocid="ndl.visit.primary_button"
              >
                <ExternalLink className="h-5 w-5" />
                {t("NDL खोलें - ndl.gov.in", "Open NDL - ndl.gov.in")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold px-8 py-6 text-base gap-2 rounded-xl border-white/30 text-white hover:bg-white/10"
                onClick={() =>
                  window.open(
                    "https://ndl.gov.in/registration",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                data-ocid="ndl.register.secondary_button"
              >
                <Users className="h-5 w-5" />
                {t("Register करें - Free!", "Register - Free!")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            {
              value: "70 Lakh+",
              labelHi: "Resources",
              labelEn: "Resources",
              color: "oklch(0.72 0.18 55)",
            },
            {
              value: "200+",
              labelHi: "Languages",
              labelEn: "Languages",
              color: "oklch(0.22 0.12 260)",
            },
            {
              value: "1 Crore+",
              labelHi: "Students",
              labelEn: "Students",
              color: "oklch(0.56 0.18 145)",
            },
            {
              value: "100%",
              labelHi: "Free Forever",
              labelEn: "Free Forever",
              color: "oklch(0.60 0.14 40)",
            },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div
                className="font-display text-3xl md:text-4xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-semibold">
                {t(stat.labelHi, stat.labelEn)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* What is NDL */}
        <motion.div
          className="mb-12 p-8 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.10 260), oklch(0.22 0.12 260))",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-black text-white mb-4">
              {t("NDL kya hai?", "What is NDL?")}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {t(
                "National Digital Library of India (NDLI) - IIT Kharagpur aur Ministry of Education, Govt of India ka project hai. Isme Class 1 se PhD tak ke sab levels ke liye study material freely available hai.",
                "National Digital Library of India (NDLI) is a project by IIT Kharagpur and Ministry of Education, Govt of India. It has free study material for all levels from Class 1 to PhD.",
              )}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                {
                  emoji: "🏛️",
                  textHi: "IIT Kharagpur",
                  textEn: "IIT Kharagpur",
                },
                {
                  emoji: "🇮🇳",
                  textHi: "Ministry of Education",
                  textEn: "Ministry of Education",
                },
                {
                  emoji: "📚",
                  textHi: "Multi-level Resources",
                  textEn: "Multi-level Resources",
                },
                {
                  emoji: "🔍",
                  textHi: "Smart Search",
                  textEn: "Smart Search",
                },
              ].map((item) => (
                <div
                  key={item.textEn}
                  className="p-3 rounded-xl bg-white/10 text-center"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xs text-white/80 font-semibold">
                    {t(item.textHi, item.textEn)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-black text-foreground mb-2">
              {t("Resource Categories", "Resource Categories")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t(
                "NDL par available content categories",
                "Content categories available on NDL",
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.titleEn}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <Card
                  className="card-hover border border-border/50 h-full cursor-pointer"
                  onClick={() =>
                    window.open(cat.url, "_blank", "noopener,noreferrer")
                  }
                  data-ocid={`ndl.category.item.${idx + 1}`}
                >
                  <CardContent className="p-5 text-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${cat.color}15` }}
                    >
                      <cat.icon
                        className="h-6 w-6"
                        style={{ color: cat.color }}
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground mb-1">
                      {t(cat.titleHi, cat.titleEn)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t(cat.descHi, cat.descEn)}
                    </p>
                    <div
                      className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold"
                      style={{ color: cat.color }}
                    >
                      <Search className="h-3 w-3" />
                      {t("Explore", "Explore")}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Register */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-black text-foreground mb-2">
              {t("Register kaise karein?", "How to Register?")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t(
                "Simple steps mein register karein",
                "Register in simple steps",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {registrationSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="p-5 rounded-2xl border border-border/50 bg-card text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-3"
                    style={{
                      background: "oklch(0.72 0.18 55)",
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">
                    {t(step.titleHi, step.titleEn)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(step.descHi, step.descEn)}
                  </p>
                </div>
                {idx < registrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 text-muted-foreground">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center p-10 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 55 / 0.1), oklch(0.56 0.18 145 / 0.08))",
            border: "1px solid oklch(0.72 0.18 55 / 0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl font-black text-foreground mb-3">
            🚀{" "}
            {t(
              "Abhi Register Karein - Bilkul Muft!",
              "Register Now - Completely Free!",
            )}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t(
              "7 crore se zyada resources access karein - textbooks, journals, videos aur bahut kuch - koi charge nahi!",
              "Access 70 million+ resources - textbooks, journals, videos and much more - no charge!",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="font-bold px-8 gap-2 text-white"
              style={{
                background: "oklch(0.72 0.18 55)",
                boxShadow: "0 0 20px oklch(0.72 0.18 55 / 0.4)",
              }}
              onClick={() =>
                window.open(
                  "https://ndl.gov.in",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              data-ocid="ndl.cta.primary_button"
            >
              <ExternalLink className="h-5 w-5" />
              NDL.GOV.IN
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-bold px-8 gap-2"
              onClick={() =>
                window.open(
                  "https://ndl.gov.in/search",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              data-ocid="ndl.search.secondary_button"
            >
              <Search className="h-5 w-5" />
              {t("Search Books", "Search Books")}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
