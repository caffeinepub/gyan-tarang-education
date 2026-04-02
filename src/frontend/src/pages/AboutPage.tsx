import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import {
  Award,
  BookOpen,
  CheckCircle,
  Flag,
  GraduationCap,
  Heart,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const nepPoints = [
  {
    title: "Multilingual Education",
    desc: "Hindi, English aur regional languages mein content",
  },
  {
    title: "Holistic Development",
    desc: "Academics ke saath wellness aur skill development",
  },
  {
    title: "Inclusive Education",
    desc: "Har background ke students ke liye free education",
  },
  {
    title: "Technology Integration",
    desc: "AI aur digital tools se modern learning",
  },
  {
    title: "Vocational Skills",
    desc: "BTech branches mein practical placement preparation",
  },
  {
    title: "Assessment Reform",
    desc: "Interactive quizzes aur self-assessment tools",
  },
];

const features = [
  "Class 1 se BTech tak - Complete Education Coverage",
  "NCERT Official Books - Direct Government Links",
  "50+ Competitive Exams - Free Study Material",
  "AI Maths Tutor - Step-by-step Solutions",
  "AI English Coach - Grammar, Reading & Speaking",
  "Motivational Wellness Hub - Health & Time Management",
  "Government Jobs & Scholarship Portal",
  "Student Study Groups - Peer Learning",
  "100% Copyright-Free, Government Approved Content",
  "Mobile-friendly - Kahaan bhi padho",
];

export default function AboutPage() {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Hero */}
      <div className="bg-hero-pattern py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/generated/gyan-tarang-logo-transparent.dim_200x200.png"
              alt="Gyan Tarang"
              className="h-20 w-20 mx-auto rounded-full mb-6 shadow-2xl"
              style={{ boxShadow: "0 0 40px oklch(0.72 0.18 55 / 0.4)" }}
            />
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
              Gyan Tarang
            </h1>
            <p
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "oklch(0.76 0.12 350)" }}
            >
              नहीं आता है? सीखो!
            </p>
            <p className="text-foreground/70 text-lg mb-6">
              Education & Technology
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
              <span className="badge-govt">100% Free Forever</span>
              <span className="badge-govt">NEP 2020 Compliant</span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-card/10 text-foreground/80 border border-white/20">
                <Shield className="h-3 w-3" /> Fully Secure
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Founder Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <Badge className="bg-saffron/10 text-saffron border-saffron/20 mb-4">
              Founder & CEO
            </Badge>
            <h2 className="font-display text-3xl font-black text-foreground">
              Mrityunjay Pandey
            </h2>
          </div>

          <Card className="overflow-hidden border border-border/50 max-w-2xl mx-auto">
            <div
              className="h-2"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.76 0.12 350), oklch(0.99 0 0), oklch(0.65 0.22 340))",
              }}
            />
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  className="h-24 w-24 rounded-full flex items-center justify-center text-3xl font-black text-foreground font-display flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.76 0.12 350), oklch(0.62 0.28 340))",
                  }}
                >
                  MP
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl font-black text-foreground mb-1">
                    Mrityunjay Pandey
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    BTech CSE | Founder & CEO, Gyan Tarang
                  </p>
                  <blockquote
                    className="text-foreground/80 italic border-l-4 pl-4 text-sm leading-relaxed"
                    style={{ borderColor: "oklch(0.76 0.12 350)" }}
                  >
                    "Har ghar tak quality education pahunchana humara sapna aur
                    mission dono hai. Gyan Tarang ke zariye hum chahte hain ki
                    Bharat ka koi bhi bachcha quality education se vanchit na
                    rahe. Padhai ke liye paisa nahi chahiye - sirf jazbaa
                    chahiye!"
                  </blockquote>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      BTech CSE
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      EdTech Entrepreneur
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Made in India
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge
            className="bg-india-green/10 text-india-green border-india-green/20 mb-4"
            style={{ color: "oklch(0.99 0 0)" }}
          >
            Our Mission
          </Badge>
          <h2 className="font-display text-3xl font-black text-foreground mb-4">
            {t("हमारा लक्ष्य", "Our Mission")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {t(
              'Gyan Tarang का mission है: "Har ghar tak quality education pahunchana" - बिना किसी भेदभाव के, बिना किसी शुल्क के।',
              'Gyan Tarang\'s mission: "Bringing quality education to every home" - without discrimination, without any fee.',
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "100% Free",
                desc: "Forever. No hidden charges.",
                color: "saffron",
              },
              {
                icon: Flag,
                title: "Made in India",
                desc: "Designed for Indian students",
                color: "india-green",
              },
              {
                icon: Shield,
                title: "Fully Secure",
                desc: "Your data is safe with us",
                color: "navy",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-border/50 bg-card text-center"
              >
                <div
                  className="p-3 rounded-xl mx-auto w-fit mb-3"
                  style={{
                    background:
                      item.color === "saffron"
                        ? "oklch(0.72 0.18 55 / 0.12)"
                        : item.color === "navy"
                          ? "oklch(0.78 0.18 348 / 0.2)"
                          : "oklch(0.56 0.18 145 / 0.12)",
                  }}
                >
                  <item.icon
                    className="h-6 w-6"
                    style={{
                      color:
                        item.color === "saffron"
                          ? "oklch(0.76 0.12 350)"
                          : item.color === "navy"
                            ? "oklch(0.62 0.28 340)"
                            : "oklch(0.65 0.22 340)",
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* NEP 2020 Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <Badge className="mb-4">NEP 2020 Compliance</Badge>
            <h2 className="font-display text-2xl font-black text-foreground">
              {t("राष्ट्रीय शिक्षा नीति 2020", "National Education Policy 2020")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nepPoints.map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card"
              >
                <CheckCircle
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.65 0.22 340)" }}
                />
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {point.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-black text-foreground">
              {t("Platform Features", "Platform Features")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-card/50"
              >
                <Star
                  className="h-4 w-4 shrink-0"
                  style={{ color: "oklch(0.76 0.12 350)" }}
                />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Placeholder */}
        <motion.div
          className="text-center py-8 px-4 rounded-2xl border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 55 / 0.08), oklch(0.56 0.18 145 / 0.06))",
          }}
        >
          <Heart
            className="h-8 w-8 mx-auto mb-3"
            style={{ color: "oklch(0.76 0.12 350)" }}
          />
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {t("Hamse Milen", "Contact Us")}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Koi question? Feedback? Hum sunne ke liye hain!
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📧 info@gyantatang.edu.in</p>
            <p>📱 Helpline: 1800-XXX-XXXX (Toll Free)</p>
            <p>🌐 gyantatang.edu.in</p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            🇮🇳 Made in India | 100% Free | Forever
          </div>
        </motion.div>
      </div>
    </div>
  );
}
