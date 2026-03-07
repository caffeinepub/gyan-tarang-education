import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import {
  AlertCircle,
  BookOpen,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Info,
  Shield,
  Video,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type ClassFilter = "1-5" | "6-8" | "9-10" | "11-12" | "btech";

const subjectColors: Record<string, string> = {
  Mathematics: "oklch(0.72 0.18 55)",
  Science: "oklch(0.45 0.18 220)",
  Physics: "oklch(0.45 0.18 220)",
  Chemistry: "oklch(0.56 0.18 145)",
  Biology: "oklch(0.56 0.18 145)",
  English: "oklch(0.55 0.15 30)",
  Hindi: "oklch(0.72 0.18 55)",
  History: "oklch(0.60 0.14 60)",
  "Social Science": "oklch(0.60 0.14 60)",
  "Programming & Algorithms": "oklch(0.45 0.18 270)",
  Electronics: "oklch(0.55 0.18 200)",
  Thermodynamics: "oklch(0.60 0.14 40)",
  Structures: "oklch(0.55 0.12 100)",
  "Power Systems": "oklch(0.65 0.16 90)",
  "Process Control": "oklch(0.50 0.16 170)",
};

const getSubjectColor = (subject: string) =>
  subjectColors[subject] ?? "oklch(0.55 0.12 260)";

const getSubjectIcon = (subject: string) => {
  if (
    subject.includes("Math") ||
    subject.includes("Calculus") ||
    subject.includes("Algebra")
  )
    return "📐";
  if (
    subject.includes("Science") ||
    subject.includes("Chem") ||
    subject.includes("Bio")
  )
    return "🔬";
  if (subject.includes("Physics") || subject.includes("Power")) return "⚡";
  if (subject.includes("English") || subject.includes("Lang")) return "📖";
  if (subject.includes("History") || subject.includes("Social")) return "🏛️";
  if (subject.includes("Program") || subject.includes("CS")) return "💻";
  if (subject.includes("Electronics")) return "🔌";
  if (subject.includes("Thermo") || subject.includes("Mech")) return "⚙️";
  if (subject.includes("Civil") || subject.includes("Struct")) return "🏗️";
  if (subject.includes("Process") || subject.includes("Chemical")) return "🧪";
  return "📚";
};

const schoolVideos = [
  // Class 1-5
  {
    id: "ncert-class5-maths",
    titleHi: "NCERT Class 5 Maths",
    titleEn: "NCERT Class 5 Maths",
    classGroup: "1-5" as ClassFilter,
    class: "Class 5",
    subject: "Mathematics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLjLt179aF3QfWMidkLYHH7eRfJePGJzTM",
    channel: "NCERT Official",
    descHi: "Class 5 गणित - आधारभूत गणित अवधारणाएं, NCERT पाठ्यक्रम",
    descEn: "Class 5 Mathematics - Basic math concepts, NCERT syllabus",
  },
  {
    id: "ncert-class4-evs",
    titleHi: "NCERT Class 4 EVS",
    titleEn: "NCERT Class 4 EVS",
    classGroup: "1-5" as ClassFilter,
    class: "Class 4",
    subject: "Science",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLjLt179aF3QfWMidkLYHH7eRfJePGJzTM",
    channel: "NCERT Official",
    descHi: "पर्यावरण अध्ययन - प्रकृति और हमारा परिवेश",
    descEn: "Environmental Studies - Nature and our surroundings",
  },
  // Class 6-8
  {
    id: "ncert-class8-science",
    titleHi: "NCERT Class 8 Science",
    titleEn: "NCERT Class 8 Science",
    classGroup: "6-8" as ClassFilter,
    class: "Class 8",
    subject: "Science",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLjLt179aF3QfWMidkLYHH7eRfJePGJzTM",
    channel: "NCERT Official",
    descHi: "Class 8 विज्ञान - पदार्थ, जीव विज्ञान, भौतिकी",
    descEn: "Class 8 Science - Matter, biology, physics",
  },
  {
    id: "ncert-class7-maths",
    titleHi: "NCERT Class 7 Mathematics",
    titleEn: "NCERT Class 7 Mathematics",
    classGroup: "6-8" as ClassFilter,
    class: "Class 7",
    subject: "Mathematics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLjLt179aF3QfWMidkLYHH7eRfJePGJzTM",
    channel: "NCERT Official",
    descHi: "Class 7 गणित - भिन्न, दशमलव, बीजगणित",
    descEn: "Class 7 Maths - Fractions, decimals, algebra",
  },
  // Class 9-10
  {
    id: "ncert-class10-science",
    titleHi: "NCERT Class 10 Science",
    titleEn: "NCERT Class 10 Science",
    classGroup: "9-10" as ClassFilter,
    class: "Class 10",
    subject: "Science",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOeHFnxCdFSBNUhZVWJO8PtU",
    channel: "NCERT Official",
    descHi: "रसायन विज्ञान, भौतिकी और जीव विज्ञान - बोर्ड परीक्षा की तैयारी",
    descEn: "Chemistry, Physics and Biology - Board exam preparation",
  },
  {
    id: "ncert-class10-maths",
    titleHi: "NCERT Class 10 Mathematics",
    titleEn: "NCERT Class 10 Mathematics",
    classGroup: "9-10" as ClassFilter,
    class: "Class 10",
    subject: "Mathematics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOdCKo5-ZQvt_UYBiGfS8V_K",
    channel: "NCERT Official",
    descHi: "वास्तविक संख्याएं, बहुपद, द्विघात समीकरण और अधिक",
    descEn: "Real numbers, polynomials, quadratic equations and more",
  },
  {
    id: "ncert-class9-science",
    titleHi: "NCERT Class 9 Science",
    titleEn: "NCERT Class 9 Science",
    classGroup: "9-10" as ClassFilter,
    class: "Class 9",
    subject: "Science",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOd7-RMk3SuK1nROkv6NWZQ7",
    channel: "NCERT Official",
    descHi: "पदार्थ की संरचना, बल, गति और जीवन की मूल इकाई",
    descEn: "Matter structure, force, motion and basic unit of life",
  },
  // Class 11-12
  {
    id: "ncert-class11-physics",
    titleHi: "NCERT Class 11 Physics",
    titleEn: "NCERT Class 11 Physics",
    classGroup: "11-12" as ClassFilter,
    class: "Class 11",
    subject: "Physics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOchZHfJcHMJlJnEJe0eRQxy",
    channel: "NCERT Official",
    descHi: "मापन, गति, बल, ऊर्जा - Class 11 Physics NCERT",
    descEn: "Measurement, motion, force, energy - Class 11 Physics NCERT",
  },
  {
    id: "ncert-class12-chemistry",
    titleHi: "NCERT Class 12 Chemistry",
    titleEn: "NCERT Class 12 Chemistry",
    classGroup: "11-12" as ClassFilter,
    class: "Class 12",
    subject: "Chemistry",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOd4B9JZlMXQMqj-KHidFSSS",
    channel: "NCERT Official",
    descHi: "ठोस अवस्था, विलयन, वैद्युतरसायन - Class 12 Chemistry",
    descEn: "Solid state, solutions, electrochemistry - Class 12 Chemistry",
  },
  {
    id: "ncert-class12-maths",
    titleHi: "NCERT Class 12 Mathematics",
    titleEn: "NCERT Class 12 Mathematics",
    classGroup: "11-12" as ClassFilter,
    class: "Class 12",
    subject: "Mathematics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLIASCOm4FkOeoMkHRbDTH3uT1CdWDJYa-",
    channel: "NCERT Official",
    descHi: "संबंध और फलन, आव्यूह, अवकलन - Class 12 Maths NCERT",
    descEn: "Relations & functions, matrices, calculus - Class 12 Maths NCERT",
  },
];

const nptelVideos = [
  {
    id: "nptel-cs-engineering",
    titleHi: "Computer Science Engineering",
    titleEn: "Computer Science Engineering",
    branch: "BTech CSE",
    subject: "Programming & Algorithms",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLbMVogVj5nJRyHFSfHiRi1FBMAvBHMX3h",
    channel: "NPTEL",
    descHi:
      "Introduction to Programming, Data Structures & Algorithms - BTech CSE",
    descEn: "Programming, Data Structures & Algorithms - BTech CSE",
  },
  {
    id: "nptel-mathematics",
    titleHi: "Engineering Mathematics",
    titleEn: "Engineering Mathematics",
    branch: "All Branches",
    subject: "Mathematics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLbMVogVj5nJTxb7AzTK2JGdS9S7PKQE7x",
    channel: "NPTEL",
    descHi: "Calculus, Linear Algebra, Differential Equations for BTech",
    descEn: "Calculus, Linear Algebra, Differential Equations for BTech",
  },
  {
    id: "nptel-physics",
    titleHi: "Engineering Physics",
    titleEn: "Engineering Physics",
    branch: "All Branches",
    subject: "Physics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLbMVogVj5nJSRJY5bBbGqFqiNk51-Aq3x",
    channel: "NPTEL",
    descHi: "Mechanics, Electromagnetism, Modern Physics for BTech 1st Year",
    descEn: "Mechanics, Electromagnetism, Modern Physics for BTech 1st Year",
  },
  {
    id: "nptel-electronics",
    titleHi: "Electronics Engineering (ECE)",
    titleEn: "Electronics Engineering (ECE)",
    branch: "BTech ECE",
    subject: "Electronics",
    youtubeUrl:
      "https://www.youtube.com/playlist?list=PLbMVogVj5nJS-MaDqpGI8OqQ39LjMRZ3A",
    channel: "NPTEL",
    descHi: "Digital Electronics, Analog Circuits, VLSI Design - BTech ECE",
    descEn: "Digital Electronics, Analog Circuits, VLSI Design - BTech ECE",
  },
  {
    id: "nptel-mechanical",
    titleHi: "Mechanical Engineering",
    titleEn: "Mechanical Engineering",
    branch: "BTech ME",
    subject: "Thermodynamics",
    youtubeUrl: "https://nptel.ac.in/courses/112104117",
    channel: "NPTEL",
    descHi:
      "Thermodynamics, Fluid Mechanics, Manufacturing Processes - BTech ME",
    descEn:
      "Thermodynamics, Fluid Mechanics, Manufacturing Processes - BTech ME",
  },
  {
    id: "nptel-civil",
    titleHi: "Civil Engineering",
    titleEn: "Civil Engineering",
    branch: "BTech CE",
    subject: "Structures",
    youtubeUrl: "https://nptel.ac.in/courses/105106116",
    channel: "NPTEL",
    descHi: "Structural Analysis, Concrete Design, Geotechnical Engineering",
    descEn: "Structural Analysis, Concrete Design, Geotechnical Engineering",
  },
  {
    id: "nptel-electrical",
    titleHi: "Electrical Engineering (EE)",
    titleEn: "Electrical Engineering (EE)",
    branch: "BTech EEE",
    subject: "Power Systems",
    youtubeUrl: "https://nptel.ac.in/courses/108105018",
    channel: "NPTEL",
    descHi: "Power Systems, Control Systems, Electric Machines - BTech EEE",
    descEn: "Power Systems, Control Systems, Electric Machines - BTech EEE",
  },
  {
    id: "nptel-chemical",
    titleHi: "Chemical Engineering",
    titleEn: "Chemical Engineering",
    branch: "BTech CHE",
    subject: "Process Control",
    youtubeUrl: "https://nptel.ac.in/courses/103102022",
    channel: "NPTEL",
    descHi: "Mass Transfer, Heat Transfer, Process Control & Dynamics",
    descEn: "Mass Transfer, Heat Transfer, Process Control & Dynamics",
  },
];

const classFilters: { id: ClassFilter; labelHi: string; labelEn: string }[] = [
  { id: "1-5", labelHi: "Class 1-5", labelEn: "Class 1-5" },
  { id: "6-8", labelHi: "Class 6-8", labelEn: "Class 6-8" },
  { id: "9-10", labelHi: "Class 9-10", labelEn: "Class 9-10" },
  { id: "11-12", labelHi: "Class 11-12", labelEn: "Class 11-12" },
  { id: "btech", labelHi: "BTech (NPTEL)", labelEn: "BTech (NPTEL)" },
];

export default function VideoLecturesPage() {
  const { t } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<ClassFilter>("9-10");

  const filteredSchoolVideos =
    activeFilter !== "btech"
      ? schoolVideos.filter((v) => v.classGroup === activeFilter)
      : [];

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Hero Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Video
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("Video Lectures", "Video Lectures")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "NCERT Official (School) + NPTEL (BTech) - सरकारी वीडियो लेक्चर, बिल्कुल मुफ्त",
                "NCERT Official (School) + NPTEL (BTech) - Government video lectures, completely free",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Government Approved</span>
              <span className="badge-govt">📹 Copyright Free</span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  color: "oklch(0.95 0 0)",
                  borderColor: "oklch(1 0 0 / 0.2)",
                }}
              >
                <Youtube className="h-3 w-3 text-red-400" /> NCERT + NPTEL
                Official
              </span>
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 rounded-2xl border flex items-start gap-3"
          style={{
            borderColor: "oklch(0.72 0.18 55 / 0.3)",
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 55 / 0.08), oklch(0.56 0.18 145 / 0.05))",
          }}
        >
          <Info
            className="h-5 w-5 mt-0.5 shrink-0"
            style={{ color: "oklch(0.72 0.18 55)" }}
          />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              {t(
                "📌 ये सभी videos सीधे YouTube पर official NCERT/NPTEL channel पर खुलेंगे।",
                "📌 All these videos open directly on the official NCERT/NPTEL YouTube channel.",
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {t(
                "ये 100% Government Approved, Copyright-Free content है। किसी भी card पर click करें और YouTube पर पढ़ें।",
                "This is 100% Government Approved, Copyright-Free content. Click any card to open on YouTube.",
              )}
            </p>
          </div>
        </motion.div>

        {/* Class Filter Tabs */}
        <div
          className="flex gap-2 mb-8 flex-wrap"
          data-ocid="videos.filter.tab"
        >
          {classFilters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                activeFilter === filter.id
                  ? {
                      background: "oklch(0.22 0.12 260)",
                      color: "white",
                      boxShadow: "0 4px 14px oklch(0.22 0.12 260 / 0.4)",
                    }
                  : {
                      background: "oklch(0.96 0.01 80)",
                      color: "oklch(0.40 0.05 260)",
                      border: "1px solid oklch(0.88 0.02 260)",
                    }
              }
              data-ocid="videos.filter.tab"
            >
              {filter.id === "btech" ? (
                <GraduationCap className="h-3.5 w-3.5" />
              ) : (
                <BookOpen className="h-3.5 w-3.5" />
              )}
              {t(filter.labelHi, filter.labelEn)}
            </button>
          ))}
        </div>

        {/* School Videos Grid */}
        {activeFilter !== "btech" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen
                className="h-6 w-6"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h2 className="font-display text-xl font-bold text-foreground">
                {t("NCERT Video Lectures", "NCERT Video Lectures")}
              </h2>
              <span className="badge-govt text-[10px]">✅ NCERT Official</span>
            </div>

            {filteredSchoolVideos.length === 0 ? (
              <div
                className="text-center py-16 rounded-2xl border border-dashed"
                data-ocid="videos.empty_state"
                style={{ borderColor: "oklch(0.88 0.02 260)" }}
              >
                <AlertCircle
                  className="h-10 w-10 mx-auto mb-3"
                  style={{ color: "oklch(0.72 0.18 55 / 0.5)" }}
                />
                <p className="text-muted-foreground">
                  {t(
                    "इस class के लिए videos जल्द आ रहे हैं",
                    "Videos for this class coming soon",
                  )}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredSchoolVideos.map((video, idx) => {
                  const color = getSubjectColor(video.subject);
                  const icon = getSubjectIcon(video.subject);
                  return (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      data-ocid={`videos.item.${idx + 1}`}
                    >
                      <Card className="card-hover border border-border/50 h-full overflow-hidden flex flex-col group">
                        {/* Colored left border */}
                        <div
                          className="h-1.5 w-full"
                          style={{
                            background: `linear-gradient(90deg, ${color}, ${color}80)`,
                          }}
                        />
                        <CardContent className="p-5 flex flex-col flex-1">
                          {/* Subject icon + header */}
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm"
                              style={{
                                background: `${color}15`,
                                border: `1px solid ${color}30`,
                              }}
                            >
                              {icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-display font-bold text-sm text-foreground leading-tight mb-1">
                                {t(video.titleHi, video.titleEn)}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <Badge
                                  className="text-[10px] px-1.5 py-0 font-semibold"
                                  style={{
                                    background: `${color}15`,
                                    color,
                                    borderColor: `${color}30`,
                                  }}
                                >
                                  {video.class}
                                </Badge>
                                <span className="badge-govt text-[10px]">
                                  ✅ NCERT
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Subject tag */}
                          <p
                            className="text-xs font-semibold mb-2"
                            style={{ color }}
                          >
                            {video.subject}
                          </p>

                          {/* Description */}
                          <p className="text-xs text-muted-foreground mb-4 flex-1 line-clamp-2">
                            {t(video.descHi, video.descEn)}
                          </p>

                          {/* CTA Button */}
                          <Button
                            className="w-full gap-2 font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow"
                            style={{
                              background: "#FF0000",
                              color: "white",
                            }}
                            onClick={() =>
                              window.open(video.youtubeUrl, "_blank")
                            }
                            data-ocid={`videos.ncert.button.${idx + 1}`}
                          >
                            <Youtube className="h-4 w-4" />
                            {t("▶ YouTube पर देखें", "▶ Watch on YouTube")}
                            <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* NCERT Channel Link */}
            <div className="mt-8 p-4 rounded-2xl border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <Youtube className="h-6 w-6 text-red-500" />
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
                    NCERT Official YouTube Channel
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "सभी NCERT videos - Class 1 से 12 तक, बिल्कुल मुफ्त",
                      "All NCERT videos - Class 1 to 12, completely free",
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shrink-0"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@ncert_official",
                    "_blank",
                  )
                }
                data-ocid="videos.ncert.link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                NCERT Channel
              </Button>
            </div>
          </div>
        )}

        {/* BTech / NPTEL Videos */}
        {activeFilter === "btech" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap
                className="h-6 w-6"
                style={{ color: "oklch(0.22 0.12 260)" }}
              />
              <h2 className="font-display text-xl font-bold text-foreground">
                {t("BTech Lectures - NPTEL", "BTech Lectures - NPTEL")}
              </h2>
              <span className="badge-govt text-[10px]">✅ UGC/AICTE</span>
            </div>

            <div
              className="mb-6 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.72 0.18 55 / 0.3)",
                background: "oklch(0.72 0.18 55 / 0.05)",
              }}
            >
              <AlertCircle
                className="h-4 w-4 mt-0.5 shrink-0"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <p className="text-sm text-foreground/80">
                {t(
                  "NPTEL playlists direct YouTube पर open होंगे। IIT professors के lectures - UGC/AICTE approved।",
                  "NPTEL playlists open directly on YouTube. IIT professor lectures - UGC/AICTE approved.",
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {nptelVideos.map((video, idx) => {
                const color = getSubjectColor(video.subject);
                const icon = getSubjectIcon(video.subject);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <Card className="card-hover border border-border/50 h-full overflow-hidden flex flex-col group">
                      <div
                        className="h-1.5 w-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        }}
                      />
                      <CardContent className="p-5 flex flex-col flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm"
                            style={{
                              background: `${color}15`,
                              border: `1px solid ${color}30`,
                            }}
                          >
                            {icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-display font-bold text-sm text-foreground leading-tight mb-1">
                              {t(video.titleHi, video.titleEn)}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <Badge
                                className="text-[10px] px-1.5 py-0 font-semibold"
                                style={{
                                  background: "oklch(0.22 0.12 260 / 0.1)",
                                  color: "oklch(0.22 0.12 260)",
                                  borderColor: "oklch(0.22 0.12 260 / 0.3)",
                                }}
                              >
                                {video.branch}
                              </Badge>
                              <span className="badge-govt text-[10px]">
                                ✅ NPTEL
                              </span>
                            </div>
                          </div>
                        </div>

                        <p
                          className="text-xs font-semibold mb-2"
                          style={{ color }}
                        >
                          {video.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4 flex-1 line-clamp-2">
                          {t(video.descHi, video.descEn)}
                        </p>

                        <Button
                          className="w-full gap-2 font-bold text-sm group-hover:shadow-md transition-shadow"
                          style={{
                            background: "oklch(0.72 0.18 55)",
                            color: "white",
                          }}
                          onClick={() =>
                            window.open(video.youtubeUrl, "_blank")
                          }
                          data-ocid={`videos.nptel.button.${idx + 1}`}
                        >
                          <Youtube className="h-4 w-4" />
                          {t("▶ YouTube पर खोलें", "▶ Open on YouTube")}
                          <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* NPTEL main site link */}
            <div className="mt-8 p-4 rounded-2xl border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <FlaskConical
                  className="h-6 w-6"
                  style={{ color: "oklch(0.22 0.12 260)" }}
                />
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
                    NPTEL - National Programme on Technology Enhanced Learning
                  </p>
                  <p className="text-xs text-muted-foreground">
                    IIT + IISc professors ke lectures - UGC/AICTE approved, 100%
                    Free
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 shrink-0"
                onClick={() => window.open("https://nptel.ac.in", "_blank")}
                data-ocid="videos.nptel.link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                nptel.ac.in
              </Button>
            </div>
          </div>
        )}

        {/* Government Approved Info */}
        <div
          className="mt-8 p-5 rounded-2xl border"
          style={{
            borderColor: "oklch(0.56 0.18 145 / 0.25)",
            background: "oklch(0.56 0.18 145 / 0.04)",
          }}
        >
          <div className="flex items-start gap-3">
            <Shield
              className="h-5 w-5 mt-0.5 flex-shrink-0"
              style={{ color: "oklch(0.56 0.18 145)" }}
            />
            <div>
              <p className="font-semibold text-sm text-foreground mb-1">
                🇮🇳 Government Approved Content
              </p>
              <p className="text-sm text-foreground/75">
                {t(
                  "ये सभी videos NCERT के official YouTube channel से हैं। ये सरकारी और copyright-free content है। NPTEL के lectures IIT professors द्वारा पढ़ाए जाते हैं। UGC और AICTE द्वारा अनुमोदित।",
                  "All these videos are from NCERT's official YouTube channel. This is government-approved and copyright-free content. NPTEL lectures are taught by IIT professors, approved by UGC and AICTE.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
