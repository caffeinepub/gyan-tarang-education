import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { useGetAllQuotes } from "@/hooks/useQueries";
import {
  Apple,
  BookOpen,
  Clock,
  Heart,
  Lightbulb,
  Moon,
  RefreshCw,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const healthTips = [
  {
    icon: Moon,
    title: "नींद - Sleep",
    content:
      "8 ghante ki neend zaroori hai. Neend mein brain consolidate karta hai jo aapne padha hai. Raat 10 baje se pehle so jaayein.",
    color: "navy",
  },
  {
    icon: Apple,
    title: "Aahaar - Diet",
    content:
      "Brain food: Badam, walnut, green vegetables, fruits. Junk food se door rahein. Paani khub piyein - 8 glass daily.",
    color: "india-green",
  },
  {
    icon: Heart,
    title: "Exercise - Vyayam",
    content:
      "Rozana 30 minute exercise ya walk. Yoga meditation concentration badhata hai. Study break mein 5 minute stretching karein.",
    color: "saffron",
  },
  {
    icon: Clock,
    title: "Screen Time",
    content:
      "Har 20 minute mein 20 second ke liye 20 feet door dekhein (20-20-20 rule). Phone ko study room se bahar rakhein.",
    color: "navy",
  },
];

const studyTips: Record<string, { subject: string; tips: string[] }[]> = {
  Science: [
    {
      subject: "Physics",
      tips: [
        "Formulae rote mat karo - derive karo, samjho",
        "Numericals daily practice karein",
        "NCERT examples pehle karo, phir exercises",
        "Diagrams banana seekho",
      ],
    },
    {
      subject: "Chemistry",
      tips: [
        "Reactions mechanisms samjho - rote nahi",
        "Periodic table patterns yaad karo",
        "Organic chemistry mein reactions chains banao",
        "Practicals carefully observe karo",
      ],
    },
    {
      subject: "Biology",
      tips: [
        "Diagrams bahut important hain - clearly banao",
        "NCERT ki har line important hai",
        "Taxonomy yaad karne ke liye mnemonics use karo",
        "Previous year questions zaroor karo",
      ],
    },
  ],
  Mathematics: [
    {
      subject: "General",
      tips: [
        "Concepts samjho, shortcuts baad mein seekho",
        "Har roz minimum 2-3 problems solve karo",
        "Mistakes se seekho - wrong answers note karo",
        "Time-bound practice karo exam ki tarah",
      ],
    },
  ],
};

const defaultQuotes = [
  "जो पढ़ते हैं, वो आगे बढ़ते हैं। — गुरुदेव रवींद्रनाथ टैगोर",
  "शिक्षा वो शस्त्र है जिससे आप दुनिया बदल सकते हैं। — नेल्सन मंडेला",
  "कल की सफलता आज की मेहनत पर निर्भर करती है।",
  "असंभव कुछ नहीं - यह तो बस वो है जो अभी तक नहीं हुआ।",
  "पढ़ाई वो निवेश है जो कभी घाटे में नहीं जाता।",
  "हर expert कभी beginner था। हिम्मत रखो!",
  "सफलता का कोई shortcut नहीं होता। मेहनत ही रास्ता है।",
  "आज का हर घंटा कल की सफलता है।",
  "नहीं आता है? सीखो! — Gyan Tarang",
  "Dream big, work hard, stay focused.",
];

const timetableSlots = [
  { time: "5:00 AM", label: "Wake up & Freshen up", type: "routine" },
  { time: "5:30 AM", label: "Morning Exercise / Yoga", type: "health" },
  { time: "6:00 AM", label: "Study Session 1 (Tough Subject)", type: "study" },
  { time: "8:00 AM", label: "Breakfast", type: "health" },
  { time: "8:30 AM", label: "Study Session 2", type: "study" },
  { time: "10:30 AM", label: "Short Break + Revision", type: "break" },
  { time: "11:00 AM", label: "Study Session 3 (Practice)", type: "study" },
  { time: "1:00 PM", label: "Lunch + Rest", type: "health" },
  { time: "2:00 PM", label: "Study Session 4 (Reading)", type: "study" },
  { time: "4:00 PM", label: "Break + Physical Activity", type: "break" },
  { time: "4:30 PM", label: "Study Session 5 (Quiz/Revision)", type: "study" },
  { time: "6:30 PM", label: "Dinner", type: "health" },
  { time: "7:00 PM", label: "Study Session 6 (Weak topics)", type: "study" },
  { time: "9:00 PM", label: "Review of Day's Learning", type: "routine" },
  { time: "10:00 PM", label: "Sleep (8 hours minimum)", type: "health" },
];

const typeColors: Record<string, string> = {
  study: "oklch(0.62 0.28 340)",
  health: "oklch(0.65 0.22 340)",
  break: "oklch(0.76 0.12 350)",
  routine: "oklch(0.50 0.08 260)",
};

export default function WellnessPage() {
  const { t } = useAppContext();
  const { data: backendQuotes } = useGetAllQuotes();
  const allQuotes =
    backendQuotes && backendQuotes.length > 0 ? backendQuotes : defaultQuotes;
  const [quoteIdx, setQuoteIdx] = useState(
    Math.floor(Math.random() * allQuotes.length),
  );

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Heart
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                {t("Student Wellness Hub", "Student Wellness Hub")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "Health, Motivation, Time Management aur Study Tips - sab ek jagah",
                "Health, Motivation, Time Management and Study Tips - all in one place",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="health">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="time">Time Mgmt</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="tips">Study Tips</TabsTrigger>
          </TabsList>

          {/* HEALTH TAB */}
          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthTips.map((tip, idx) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="card-hover border border-border/50 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{
                            background:
                              tip.color === "saffron"
                                ? "oklch(0.72 0.18 55 / 0.12)"
                                : tip.color === "navy"
                                  ? "oklch(0.78 0.18 348 / 0.2)"
                                  : "oklch(0.56 0.18 145 / 0.12)",
                          }}
                        >
                          <tip.icon
                            className="h-6 w-6"
                            style={{
                              color:
                                tip.color === "saffron"
                                  ? "oklch(0.76 0.12 350)"
                                  : tip.color === "navy"
                                    ? "oklch(0.62 0.28 340)"
                                    : "oklch(0.65 0.22 340)",
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-2xl border border-india-green/20 bg-india-green/5">
              <h3 className="font-display font-bold text-foreground mb-3">
                🧘 Stress Management Tips
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: "5-5-5 Breathing",
                    desc: "5 sec inhale, 5 sec hold, 5 sec exhale - anxiety dur karo",
                  },
                  {
                    title: "Pomodoro Technique",
                    desc: "25 min padho, 5 min break lo - focus badhta hai",
                  },
                  {
                    title: "Journaling",
                    desc: "Din ke aakhir mein 5 minute likhein - mind clear hoga",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-3 bg-card/50 rounded-xl">
                    <p className="font-semibold text-sm text-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TIME MANAGEMENT TAB */}
          <TabsContent value="time">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-foreground">
                  📅 {t("Ideal Study Timetable", "Ideal Study Timetable")}
                </h2>
                <Badge className="bg-saffron/10 text-saffron border-saffron/20">
                  Competitive Exam Ready
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {timetableSlots.map((slot, idx) => (
                  <motion.div
                    key={slot.time}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-card"
                  >
                    <div className="text-xs font-mono font-bold text-muted-foreground w-16 shrink-0">
                      {slot.time}
                    </div>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: typeColors[slot.type] }}
                    />
                    <span className="text-sm text-foreground">
                      {slot.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-auto text-[10px] shrink-0 capitalize"
                    >
                      {slot.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                {Object.entries(typeColors).map(([type, color]) => (
                  <div
                    key={type}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: color }}
                    />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* MOTIVATION TAB */}
          <TabsContent value="motivation">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Quote Card */}
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card
                  className="border-0 text-foreground overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.22 345), oklch(0.62 0.28 340))",
                  }}
                  data-ocid="wellness.quotes.card"
                >
                  <CardContent className="p-8 text-center">
                    <Star
                      className="h-8 w-8 mx-auto mb-4 opacity-60"
                      style={{ color: "oklch(0.76 0.12 350)" }}
                    />
                    <blockquote className="font-display text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-4">
                      "{allQuotes[quoteIdx]}"
                    </blockquote>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground/60 hover:text-foreground hover:bg-card/10 gap-2"
                      onClick={() =>
                        setQuoteIdx((p) => (p + 1) % allQuotes.length)
                      }
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("Naya Quote", "New Quote")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* All Quotes */}
              <div>
                <h3 className="font-display font-bold text-foreground mb-4">
                  All Motivational Quotes
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {allQuotes.map((q, i) => (
                    <button
                      type="button"
                      key={q.slice(0, 20)}
                      onClick={() => setQuoteIdx(i)}
                      className={`text-left p-4 rounded-xl border transition-all ${quoteIdx === i ? "" : "border-border/50 hover:bg-muted/50"}`}
                      style={
                        quoteIdx === i
                          ? {
                              background: "oklch(0.72 0.18 55 / 0.1)",
                              borderColor: "oklch(0.72 0.18 55 / 0.3)",
                            }
                          : {}
                      }
                    >
                      <p className="text-sm text-foreground/90 italic">"{q}"</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* STUDY TIPS TAB */}
          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(studyTips).map(([category, subjects]) =>
                subjects.map((sub) => (
                  <Card key={sub.subject} className="border border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-display flex items-center gap-2">
                        <BookOpen
                          className="h-4 w-4"
                          style={{ color: "oklch(0.76 0.12 350)" }}
                        />
                        {sub.subject} - {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      {sub.tips.map((tip) => (
                        <div
                          key={tip}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Lightbulb
                            className="h-3.5 w-3.5 mt-0.5 shrink-0"
                            style={{ color: "oklch(0.76 0.12 350)" }}
                          />
                          {tip}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )),
              )}

              {/* General Tips */}
              <Card className="border border-border/50 md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">
                    🎯 General Study Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Spaced Repetition",
                        desc: "Aaj padho, kal review karo, week mein phir dekhein",
                        emoji: "📅",
                      },
                      {
                        title: "Active Recall",
                        desc: "Book band karke yaad karo - sirf padhna enough nahi",
                        emoji: "🧠",
                      },
                      {
                        title: "Mind Maps",
                        desc: "Topics ko visually map karo - connections samajh aayenge",
                        emoji: "🗺️",
                      },
                      {
                        title: "Teach Others",
                        desc: "Jo padhaa, kisi ko samjhao - pakka yaad ho jaayega",
                        emoji: "👩‍🏫",
                      },
                    ].map((s) => (
                      <div key={s.title} className="p-4 rounded-xl bg-muted/50">
                        <div className="text-2xl mb-2">{s.emoji}</div>
                        <div className="font-semibold text-sm text-foreground mb-1">
                          {s.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {s.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
