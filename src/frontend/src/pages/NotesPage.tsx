import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

interface NoteCard {
  title: string;
  subtitle: string;
  desc: string;
  url: string;
  badge: string;
  badgeColor?: string;
}

const schoolNotes: NoteCard[] = [
  {
    title: "NCERT Textbooks - Class 1 to 12",
    subtitle: "All Subjects",
    desc: "Download NCERT textbooks for all classes and all subjects - Hindi & English medium",
    url: "https://ncert.nic.in/textbook.php",
    badge: "Class 1-12",
  },
  {
    title: "NCERT Exemplar Problems - Class 6-12",
    subtitle: "Maths & Science",
    desc: "Higher order thinking questions, exemplar problems with solutions for competitive exam prep",
    url: "https://ncert.nic.in/exemplar-problems.php",
    badge: "Class 6-12",
  },
  {
    title: "NCERT Lab Manuals",
    subtitle: "Science Labs",
    desc: "Official NCERT lab manuals for Physics, Chemistry, Biology - Class 9 to 12",
    url: "https://ncert.nic.in/laboratory-manuals.php",
    badge: "Class 9-12",
  },
  {
    title: "NCERT Notes - Class 6 to 12",
    subtitle: "Revision Notes",
    desc: "Chapter-wise revision notes for all subjects from NCERT official resources",
    url: "https://ncert.nic.in/ncerts/l/",
    badge: "Class 6-12",
  },
  {
    title: "CBSE Sample Question Papers Class 12",
    subtitle: "Board Exam Prep",
    desc: "Official CBSE sample question papers with marking scheme and model answers",
    url: "https://cbseacademic.nic.in/SQP_CLASSXII.html",
    badge: "Class 12",
  },
  {
    title: "CBSE Sample Papers Class 10",
    subtitle: "Board Exam Prep",
    desc: "CBSE Class 10 sample question papers and marking scheme for all subjects",
    url: "https://cbseacademic.nic.in/SQP_CLASSX.html",
    badge: "Class 10",
  },
  {
    title: "NCERT Books - Hindi Medium",
    subtitle: "Hindi Medium",
    desc: "सभी कक्षाओं की NCERT पुस्तकें हिंदी माध्यम में - Free PDF Download",
    url: "https://ncert.nic.in/textbook.php",
    badge: "Hindi Medium",
  },
  {
    title: "CBSE Curriculum & Syllabus",
    subtitle: "Official Curriculum",
    desc: "CBSE official curriculum, syllabus, and academic calendar for all classes",
    url: "https://cbseacademic.nic.in/curriculum.html",
    badge: "All Classes",
  },
];

const btechNotes: NoteCard[] = [
  {
    title: "NPTEL - Computer Science & Engineering",
    subtitle: "BTech CSE",
    desc: "IIT lecture notes on Programming, DSA, OS, DBMS, Computer Networks - Full PDF",
    url: "https://nptel.ac.in/courses/106106172",
    badge: "CSE",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Engineering Mathematics",
    subtitle: "All BTech Branches",
    desc: "Calculus, Linear Algebra, Differential Equations - IIT lecture notes & assignments",
    url: "https://nptel.ac.in/courses/111107108",
    badge: "All Branches",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Electronics & Communication",
    subtitle: "BTech ECE",
    desc: "Digital Systems, Signals & Systems, VLSI, Communication Systems notes",
    url: "https://nptel.ac.in/courses/117105080",
    badge: "ECE",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Mechanical Engineering",
    subtitle: "BTech ME",
    desc: "Thermodynamics, Fluid Mechanics, Manufacturing Technology notes from IITs",
    url: "https://nptel.ac.in/courses/112105129",
    badge: "ME",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Civil Engineering",
    subtitle: "BTech CE",
    desc: "Structural Analysis, Concrete Design, Geotechnical Engineering - IIT lecture notes",
    url: "https://nptel.ac.in/courses/105106116",
    badge: "CE",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Electrical Engineering",
    subtitle: "BTech EEE",
    desc: "Power Systems, Control Systems, Electrical Machines lecture notes from IIT",
    url: "https://nptel.ac.in/courses/108105018",
    badge: "EEE",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - Chemical Engineering",
    subtitle: "BTech ChE",
    desc: "Mass Transfer, Heat Transfer, Process Control & Reaction Engineering notes",
    url: "https://nptel.ac.in/courses/103102022",
    badge: "ChE",
    badgeColor: "navy",
  },
  {
    title: "NPTEL - All Courses (Browse)",
    subtitle: "All BTech Branches",
    desc: "Browse 2000+ NPTEL courses with video lectures, notes, and assignments - Free",
    url: "https://nptel.ac.in/courses",
    badge: "All Branches",
    badgeColor: "navy",
  },
];

const competitiveNotes: NoteCard[] = [
  {
    title: "JEE Main Study Material - NTA",
    subtitle: "JEE Preparation",
    desc: "Official NTA study material, syllabus, and practice papers for JEE Main 2024-25",
    url: "https://nta.ac.in",
    badge: "JEE Main",
  },
  {
    title: "NEET UG Study Material - NTA",
    subtitle: "NEET Preparation",
    desc: "Official NTA NEET syllabus, subject-wise notes and practice papers for MBBS/BDS",
    url: "https://nta.ac.in",
    badge: "NEET",
  },
  {
    title: "JEE Advanced Syllabus & Papers",
    subtitle: "IIT JEE Prep",
    desc: "Official JEE Advanced syllabus, past year papers and preparation material",
    url: "https://jeeadv.ac.in",
    badge: "JEE Advanced",
  },
  {
    title: "CUET UG Study Material",
    subtitle: "University Admission",
    desc: "NTA CUET syllabus, domain subjects, general test preparation material",
    url: "https://cuet.samarth.ac.in",
    badge: "CUET",
  },
  {
    title: "NCERT - Foundation for Competitive Exams",
    subtitle: "Class 11-12 Notes",
    desc: "NCERT Class 11-12 Science & Maths - essential foundation for JEE/NEET",
    url: "https://ncert.nic.in/textbook.php",
    badge: "JEE/NEET Base",
  },
  {
    title: "UPSC Civil Services Preparation",
    subtitle: "IAS/IPS/IFS Prep",
    desc: "Official UPSC syllabus, previous year papers, and free study resources",
    url: "https://upsc.gov.in",
    badge: "UPSC",
  },
  {
    title: "SSC CGL/CHSL Study Material",
    subtitle: "SSC Preparation",
    desc: "SSC official syllabus, sample papers, and study material for all SSC exams",
    url: "https://ssc.nic.in",
    badge: "SSC",
  },
  {
    title: "NDA & CDS Study Material",
    subtitle: "Defence Exams",
    desc: "UPSC NDA/CDS exam syllabus, previous year papers and preparation resources",
    url: "https://upsc.gov.in/examinations/exam-notification",
    badge: "NDA/CDS",
  },
];

const govtExamNotes: NoteCard[] = [
  {
    title: "UPSC Civil Services Syllabus PDF",
    subtitle: "IAS/IPS/IFS/IRS",
    desc: "Official UPSC Civil Services (IAS) Prelims & Mains full syllabus PDF - Free",
    url: "https://upsc.gov.in/examinations/exam-notification",
    badge: "UPSC IAS",
  },
  {
    title: "SSC CGL Syllabus & Study Guide",
    subtitle: "SSC Combined Graduate",
    desc: "SSC CGL Tier 1 & Tier 2 complete syllabus, exam pattern and preparation guide",
    url: "https://ssc.nic.in/Portal/Syllabus",
    badge: "SSC CGL",
  },
  {
    title: "SSC CHSL Syllabus & Notes",
    subtitle: "10+2 Level Posts",
    desc: "SSC CHSL complete syllabus for LDC/DEO/JSA posts, tier-wise breakdown",
    url: "https://ssc.nic.in/Portal/Syllabus",
    badge: "SSC CHSL",
  },
  {
    title: "RRB NTPC Study Material",
    subtitle: "Railway Recruitment",
    desc: "Railway NTPC CBT Stage 1 & 2 syllabus, previous papers, and preparation notes",
    url: "https://indianrailways.gov.in",
    badge: "RRB NTPC",
  },
  {
    title: "RRB Group D Preparation Material",
    subtitle: "Railway Group D",
    desc: "RRB Group D complete syllabus, mock tests, and subject-wise preparation notes",
    url: "https://indianrailways.gov.in",
    badge: "RRB Group D",
  },
  {
    title: "Bihar Police Constable Notes",
    subtitle: "CSBC Recruitment",
    desc: "Bihar Police constable syllabus, exam pattern and preparation material - CSBC official",
    url: "https://csbc.bih.nic.in",
    badge: "Bihar Police",
  },
  {
    title: "BPSC Exam Preparation Notes",
    subtitle: "Bihar PSC",
    desc: "BPSC Prelims & Mains syllabus, previous year papers and preparation guide",
    url: "https://bpsc.bih.nic.in",
    badge: "BPSC",
  },
  {
    title: "IBPS PO/Clerk Study Material",
    subtitle: "Banking Sector",
    desc: "IBPS PO and Clerk exam syllabus, practice papers and banking awareness notes",
    url: "https://ibps.in",
    badge: "IBPS Banking",
  },
  {
    title: "SBI PO Study Material",
    subtitle: "State Bank of India",
    desc: "SBI PO Prelims & Mains syllabus, previous year papers and preparation guide",
    url: "https://sbi.co.in/careers",
    badge: "SBI PO",
  },
  {
    title: "CUET PG Study Material",
    subtitle: "Post Graduate",
    desc: "NTA CUET PG domain-specific syllabus and preparation material for MA/MSc/MCom",
    url: "https://cuet.nta.nic.in",
    badge: "CUET PG",
  },
];

function NotesCard({ card, idx }: { card: NoteCard; idx: number }) {
  const { t } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      <Card className="card-hover border border-border/50 h-full flex flex-col overflow-hidden">
        <div
          className="h-1.5"
          style={{
            background:
              card.badgeColor === "navy"
                ? "oklch(0.22 0.12 260)"
                : "oklch(0.72 0.18 55)",
          }}
        />
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div
              className="flex-shrink-0 p-2 rounded-lg mt-0.5"
              style={{ background: "oklch(0.72 0.18 55 / 0.1)" }}
            >
              <FileText
                className="h-4 w-4"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm text-foreground leading-tight mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
          </div>

          <p className="text-xs text-foreground/75 mb-3 flex-1 line-clamp-2">
            {card.desc}
          </p>

          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <Badge
              className="text-[10px] px-1.5 py-0"
              style={{
                background:
                  card.badgeColor === "navy"
                    ? "oklch(0.22 0.12 260 / 0.12)"
                    : "oklch(0.72 0.18 55 / 0.12)",
                color:
                  card.badgeColor === "navy"
                    ? "oklch(0.22 0.12 260)"
                    : "oklch(0.65 0.18 55)",
                borderColor:
                  card.badgeColor === "navy"
                    ? "oklch(0.22 0.12 260 / 0.3)"
                    : "oklch(0.72 0.18 55 / 0.3)",
              }}
            >
              {card.badge}
            </Badge>
            <span className="badge-govt text-[10px]">✅ Govt Approved</span>
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border"
              style={{
                background: "oklch(0.56 0.18 145 / 0.08)",
                color: "oklch(0.35 0.15 145)",
                borderColor: "oklch(0.56 0.18 145 / 0.25)",
              }}
            >
              <CheckCircle className="h-2.5 w-2.5" /> Copyright Free
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 gap-1.5 text-xs font-semibold"
              style={{ background: "oklch(0.22 0.12 260)", color: "white" }}
              size="sm"
              onClick={() => window.open(card.url, "_blank")}
              data-ocid={`notes.item.${idx + 1}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t("PDF खोलें", "Open PDF")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => window.open(card.url, "_blank")}
              data-ocid={`notes.download.button.${idx + 1}`}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function NotesPage() {
  const { t } = useAppContext();

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
              <FileText
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("Notes & Study Materials", "Notes & Study Materials")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "सरकारी अनुमोदित Handwriting Notes PDF - Class 1 से BTech तक",
                "Government Approved Study Notes PDF - Class 1 to BTech",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Government Approved</span>
              <span className="badge-govt">📄 Copyright Free PDF</span>
              <span className="badge-made-in-india">
                🇮🇳 NCERT + NPTEL Official
              </span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  background: "oklch(0.72 0.18 55 / 0.15)",
                  color: "oklch(0.95 0 0)",
                  borderColor: "oklch(0.72 0.18 55 / 0.3)",
                }}
              >
                <Sparkles className="h-3 w-3" /> UGC & AICTE Approved
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="school">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
            <TabsTrigger
              value="school"
              className="gap-1.5 text-xs"
              data-ocid="notes.school.tab"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {t("School (1-12)", "School (1-12)")}
            </TabsTrigger>
            <TabsTrigger
              value="btech"
              className="gap-1.5 text-xs"
              data-ocid="notes.btech.tab"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {t("BTech Notes", "BTech Notes")}
            </TabsTrigger>
            <TabsTrigger
              value="competitive"
              className="gap-1.5 text-xs"
              data-ocid="notes.competitive.tab"
            >
              <Shield className="h-3.5 w-3.5" />
              {t("Competitive", "Competitive")}
            </TabsTrigger>
            <TabsTrigger
              value="govtexam"
              className="gap-1.5 text-xs"
              data-ocid="notes.govtexam.tab"
            >
              <FileText className="h-3.5 w-3.5" />
              {t("Govt Exam", "Govt Exam")}
            </TabsTrigger>
          </TabsList>

          {/* School Notes Tab */}
          <TabsContent value="school">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.56 0.18 145 / 0.25)",
                background: "oklch(0.56 0.18 145 / 0.05)",
              }}
            >
              <Shield
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.56 0.18 145)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  NCERT Official - Class 1 to 12 Study Materials
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi materials ncert.nic.in aur cbseacademic.nic.in se hain -
                  100% government approved, free, copyright-free.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {schoolNotes.map((card, idx) => (
                <NotesCard key={card.title} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* BTech Notes Tab */}
          <TabsContent value="btech">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.22 0.12 260 / 0.25)",
                background: "oklch(0.22 0.12 260 / 0.05)",
              }}
            >
              <GraduationCap
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.22 0.12 260)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  NPTEL - IIT Professors' Lecture Notes (UGC/AICTE Approved)
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi materials nptel.ac.in se hain - IIT aur IISc professors
                  ke notes, assignments, aur resources.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {btechNotes.map((card, idx) => (
                <NotesCard key={card.title} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* Competitive Notes Tab */}
          <TabsContent value="competitive">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.72 0.18 55 / 0.25)",
                background: "oklch(0.72 0.18 55 / 0.05)",
              }}
            >
              <Shield
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  JEE, NEET, UPSC, SSC - Official Study Materials
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi materials NTA, UPSC, SSC official websites se hain.
                  Free, official aur verified.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {competitiveNotes.map((card, idx) => (
                <NotesCard key={card.title} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>

          {/* Govt Exam Notes Tab */}
          <TabsContent value="govtexam">
            <div
              className="mb-5 p-4 rounded-xl border flex items-start gap-3"
              style={{
                borderColor: "oklch(0.56 0.18 145 / 0.25)",
                background: "oklch(0.56 0.18 145 / 0.05)",
              }}
            >
              <FileText
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.56 0.18 145)" }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  UPSC, SSC, Railway, Banking, Bihar Police - Official Notes
                </p>
                <p className="text-xs text-muted-foreground">
                  Sabhi government exam ke liye official syllabus, notes aur
                  preparation material - Direct official websites se.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {govtExamNotes.map((card, idx) => (
                <NotesCard key={card.title} card={card} idx={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Info */}
        <div className="mt-10 p-5 rounded-2xl border border-border/50 bg-muted/30">
          <div className="flex items-start gap-3">
            <Shield
              className="h-5 w-5 mt-0.5 shrink-0"
              style={{ color: "oklch(0.56 0.18 145)" }}
            />
            <div>
              <p className="font-semibold text-sm text-foreground mb-1">
                {t("सुरक्षित एवं सरकारी स्रोत", "Safe & Official Sources")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t(
                  "Gyan Tarang पर सभी notes और study materials NCERT (ncert.nic.in), NPTEL (nptel.ac.in), CBSE (cbse.gov.in), NTA (nta.ac.in), UPSC (upsc.gov.in), SSC (ssc.nic.in) जैसी official government websites के direct links हैं। सभी materials copyright-free और 100% free हैं।",
                  "All notes and study materials on Gyan Tarang are direct links from official government websites like NCERT, NPTEL, CBSE, NTA, UPSC, SSC. All materials are copyright-free and 100% free.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
